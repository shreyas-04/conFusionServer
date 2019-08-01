const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    next();
})

.get((req, res, next) => {
    res.end('Will send the details of promo ');
})

.post((req, res, next) => {
    res.end('Will add the promo:' + req.body.name + ' with info: ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})

.delete((req, res, next) => {
    res.end('Will delete all promoes!');
});

promoRouter.route('/:promoId')


.get((req, res, next) => {
    res.end('Will send the details of promo ' + req.params.promoId + ' you!');
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST  operation not supported on promo:' + req.params.promoId);
})

.put((req, res, next) => {
    res.write('Updating the promo: ' + req.params.promoId);
    res.end(' Will update the promo: ' + req.body.name + ' with info: ' + req.body.description);
})

.delete((req, res, next) => {
    res.end('Will delete promo: ' + req.params.promoId);
});



module.exports = promoRouter;

// app.get('/dishes/:dishId', (req, res, next) => {
//     
// });


// app.post('/dishes/:dishId', (req, res, next) => {
//     
// });


// app.put('/dishes/:dishId', (req, res, next) => {
//     
// });


// app.delete('/dishes/:dishId', (req, res, next) => {
//     
// });