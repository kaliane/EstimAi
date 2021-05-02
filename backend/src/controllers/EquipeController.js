const conexao = require('../database/connection');

module.exports = {

    async index(request, response) {
        const equipe = await conexao('equipe').select('*').orderBy('idequipe');
    
        return response.json(equipe);
    },

    async create(request, response){
        const {nomeequipe} = request.body;
        var idequipe;

        idequipe = await conexao('equipe').insert({
            nomeequipe: nomeequipe
        }, ['idequipe'])

        return response.json({idequipe});
    },

    async updateInativo(request, response){
        const { idequipe, inativo } = request.body;
        var NewInat;

        if(inativo == 'F') {
            NewInat = 'T'
        }else{
            NewInat = 'F'
        }
    
         NewInat = await conexao('equipe')
        .where({idequipe: idequipe})
        .update({
            inativo: NewInat
        }, ['inativo'])

        return response.json(NewInat);
    },

    async update(request, response){
        const { idequipe, nomeequipe } = request.body;

        const equipe = await conexao('equipe')
        .where({idequipe: idequipe})
        .update({
            nomeequipe: nomeequipe
        }, ['idequipe'])

        return response.json(equipe);
    },

    async buscaEquipe(request, response) {
        const idequipe = request.headers.authorization;

        const equipe = await conexao('equipe')
        .where('idequipe', idequipe)
        .select('*');
    
        return response.json(equipe);
    },

    async equipesAtivas(request, response) {
        const equipe = await conexao('equipe')
        .where('inativo', 'F')
        .select('*').orderBy('idequipe');
    
        return response.json(equipe);
    },
}