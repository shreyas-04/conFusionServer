const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    next();
})

.get((req, res, next) => {
    res.end('Will send the details of leader ');
})

.post((req, res, next) => {
    res.end('Will add the leader:' + req.body.name + ' with info: ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})

.delete((req, res, next) => {
    res.end('Will delete all leaderes!');
});

leaderRouter.route('/:leaderId')


.get((req, res, next) => {
    res.end('Will send the details of leader ' + req.params.leaderId + ' you!');
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST  operation not supported on leader:' + req.params.leaderId);
})

.put((req, res, next) => {
    res.write('Updating the leader: ' + req.params.leaderId);
    res.end(' Will update the leader: ' + req.body.name + ' with info: ' + req.body.description);
})

.delete((req, res, next) => {
    res.end('Will delete leader: ' + req.params.leaderId);
});



module.exports = leaderRouter;