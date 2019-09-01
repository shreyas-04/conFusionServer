var express = require('express');
const bodyParser = require("body-parser");
const passport = require('passport');
const cors = require('./cors');

var User = require('../models/user');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */

router.route("/")
    .options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        User.find({})
            .then(users => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(users);
                },
                (err) => next(err))
            .catch((err) => next(err));
    });


router.post('/signup', cors.corsWithOptions, (req, res, next) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
        } else {
            if (req.body.firstname) {
                user.firstname = req.body.firstname;
            }
            if (req.body.lastname) {
                user.lastname = req.body.lastname;
            }
            user.save((err, user) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ err: err });
                    return;
                }
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, status: 'Registration Succesful!' });
                });
            })
        }
    });
});

router.post('/login', cors.corsWithOptions, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); // if err occurs
        }
        if (!user) { // if user does not exists // if wrong login info
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Login Unsuccessful!', err: info });
        }

        req.logIn(user, (err) => { // any other error while loging in
            if (err) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, status: 'Login Unsuccessful!', err: 'Could not log in User!' });
            }

            const token = authenticate.getToken({ _id: req.user._id });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, token: token, status: 'You are logged in succesfully' });
        });

    })(req, res, next);
});

router.get("/logout", (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        var err = new Error('You are not logged in.');
        err.status = 403;
        return next(err);
    }
});

router.get("/facebook/token", passport.authenticate('facebook-token'), (req, res) => {
    if (req.user) {
        const token = authenticate.getToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, token: token, status: 'You are logged in succesfully' });
    }
});

router.get('/checkJWTToken', cors.corsWithOptions, (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return next(err); // if err occurs
        }
        if (!user) { // if user does not exists // if wrong login info
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: 'JWT invalid!', success: false, err: info });
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: 'JWT valid!', success: true, user: user });
        }
    })(req, res);
});

module.exports = router;