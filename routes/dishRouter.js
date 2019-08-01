const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    next();
})

.get((req, res, next) => {
    res.end('Will send the details of dish ');
})

.post((req, res, next) => {
    res.end('Will add the Dish:' + req.body.name + ' with info: ' + req.body.description);
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})

.delete((req, res, next) => {
    res.end('Will delete all dishes!');
});

dishRouter.route('/:dishId')


.get((req, res, next) => {
    res.end('Will send the details of dish ' + req.params.dishId + ' you!');
})

.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST  operation not supported on Dish:' + req.params.dishId);
})

.put((req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId);
    res.end(' Will update the Dish: ' + req.body.name + ' with info: ' + req.body.description);
})

.delete((req, res, next) => {
    res.end('Will delete dish: ' + req.params.dishId);
});



module.exports = dishRouter;

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