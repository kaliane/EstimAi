const knex = require('knex');
const configuracao = require('../../knexfile');

var conexao;

const environment = process.env.NODE_ENV || 'development';

console.log(environment);

if (environment == 'development'){
    conexao = knex(configuracao.development);
}else{
    conexao = knex(configuracao.production);
}


module.exports = conexao;