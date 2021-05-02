const conexao = require('../database/connection');
const WiAtividade = require('./WiAtividade'); 
const WiEstimativa = require('./WiEstimativa');
const utf8 = require('utf8');
const { StringDecoder } = require('string_decoder');

module.exports = {

    index(request, response) {
      const {WI} = request.query;
      var retorno = WiAtividade.findAtividade(WI);

      return response.json(retorno);
    },

    atividades(request, response) {
      const retorno = WiAtividade.buscarAtividades();

      return response.json(retorno);
    },

    estimativa(request, response){
      const {descricao} = request.query;
      var retorno = WiEstimativa.estimar(descricao);
      return response.json(retorno);
    }
}