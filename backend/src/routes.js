const express = require('express');

const routes = express.Router();
const UsuarioController = require('./controllers/UsuarioController');
const SessionController = require('./controllers/SessionController');
const EquipeController = require('./controllers/EquipeController');
const SprintController = require('./controllers/SprintController');
const AtividadeController = require('./controllers/AtividadeController');

routes.post('/sessions', SessionController.create);
routes.get('/sessions', SessionController.index);

routes.get('/users', UsuarioController.index);
routes.post('/users', UsuarioController.create);
routes.put('/users/ativo', UsuarioController.updateInativo);
routes.put('/users/admin', UsuarioController.updateAdmin);
routes.put('/users', UsuarioController.update);

routes.get('/equipe', EquipeController.index);
routes.post('/equipe', EquipeController.create);
routes.put('/equipe/ativo', EquipeController.updateInativo);
routes.put('/equipe', EquipeController.update);
routes.get('/equipe/edit', EquipeController.buscaEquipe);
routes.get('/equipe/ativo', EquipeController.equipesAtivas);

routes.get('/sprint', SprintController.index);
routes.post('/sprint', SprintController.create);
routes.get('/sprint/edit', SprintController.buscaSprint);
routes.put('/sprint', SprintController.update);

routes.get('/atividade', AtividadeController.index);
routes.post('/atividade', AtividadeController.create);
routes.get('/atividade/edit', AtividadeController.buscaAtv);
routes.put('/atividade', AtividadeController.update);
routes.put('/atividade/est', AtividadeController.updateEstimaApi);

routes.get('/atividade/arq', AtividadeController.arq);

module.exports = routes;