const express = require('express');

const routes = express.Router();
const WiController = require('./controllers/WiController')

/*var meuMiddleware = function (req, res, next) {
    console.log('LOGGED');
     res.send(FormatterJson(res));
    next();
  };

var utf8 = require('utf8');

function FormatterJson(value) {
 	return utf8.decode(value);
}

routes.use(meuMiddleware);*/

routes.get('/findwi', WiController.index);
routes.get('/atividades', WiController.atividades);
routes.get('/estimar', WiController.estimativa);


module.exports = routes;