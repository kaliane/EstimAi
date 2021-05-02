const conexao = require('../database/connection');

module.exports = {

    async index(request, response) {
        const sprint = await conexao('sprint')
            .join('equipe', 'sprint.idequipe', '=', 'equipe.idequipe')
            .select('sprint.idsprint', 'sprint.nomesprint', 'sprint.idequipe', 'equipe.nomeequipe')
            .orderBy('idsprint', 'desc');
    
        return response.json(sprint);
    },

    async create(request, response){
        const {nomesprint, idequipe} = request.body;
        var idsprint;

        idsprint = await conexao('sprint').insert({
            nomesprint: nomesprint,
            idequipe: idequipe
        }, ['idsprint'])

        return response.json({idsprint});
    },

    async buscaSprint(request, response) {
        const idsprint = request.headers.authorization;

        const sprint = await conexao('sprint')
        .where('idsprint', idsprint)
        .select('*');
    
        return response.json(sprint);
    },

    async update(request, response){
        const { idsprint, nomesprint, idequipe } = request.body;

        const sprint = await conexao('sprint')
        .where({idsprint: idsprint})
        .update({
            nomesprint: nomesprint,
            idequipe: idequipe
        }, ['idsprint'])

        return response.json(sprint);
    },

}