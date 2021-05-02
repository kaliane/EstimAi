const conexao = require('../database/connection');
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;

module.exports = {

    async index(request, response) {

        const idsprint = request.headers.authorization;

        const atividade = await conexao('atividade')
            .rightJoin('sprint', 'atividade.idsprint', '=', 'sprint.idsprint')
            .where('sprint.idsprint', idsprint)
            .select('*')
            .orderBy('atividade.idatividade');
    
        return response.json(atividade);
    },

    async create(request, response){
        const {idsprint, resumo, descricao, numatvimport, estimativateste, estimativadev, estimativaapiteste, estimativaapidev, temporealteste, temporealdev} = request.body;
        var idatividade;

        idatividade = await conexao('atividade').insert({
            idsprint: idsprint,
            resumo: resumo,
            descricao: descricao,
            numatvimport: numatvimport,
            estimativateste: estimativateste,
            estimativadev: estimativadev,
            estimativaapiteste: estimativaapiteste,
            estimativaapidev: estimativaapidev,
            temporealteste: temporealteste,
            temporealdev: temporealdev
        }, ['idatividade'])

        return response.json(idatividade);
    },

    async buscaAtv(request, response) {
        const idatividade = request.headers.authorization;

        const ativ = await conexao('atividade')
        .where('idatividade', idatividade)
        .select('*');
    
        return response.json(ativ);
    },

    async update(request, response){
        const {idatividade, idsprint, resumo, descricao, numatvimport, estimativateste, estimativadev, estimativaapiteste, estimativaapidev, temporealteste, temporealdev} = request.body;

        const atividade = await conexao('atividade')
        .where({idatividade: idatividade})
        .update({
            idsprint: idsprint,
            resumo: resumo,
            descricao: descricao,
            numatvimport: numatvimport,
            estimativateste: estimativateste,
            estimativadev: estimativadev,
            estimativaapiteste: estimativaapiteste,
            estimativaapidev: estimativaapidev,
            temporealteste: temporealteste,
            temporealdev: temporealdev
        }, ['idatividade'])

        return response.json(atividade);
    },

    async updateEstimaApi(request, response){
        const {idatividade, estimativaapiteste, estimativaapidev} = request.body;

        const atividade = await conexao('atividade')
        .where({idatividade: idatividade})
        .update({
            estimativaapiteste: estimativaapiteste,
            estimativaapidev: estimativaapidev
        }, ['estimativaapiteste'])

        return response.json(atividade);
    },

    async arq(request, response) {

        const atividade = await conexao('atividade')
            .rightJoin('sprint', 'atividade.idsprint', '=', 'sprint.idsprint')
            .where('sprint.idsprint', 4)
            .select('idatividade', 'atividade.idsprint', 'sprint.nomesprint', 'resumo', 'numatvimport', 'estimativateste', 'estimativadev', 'estimativaapiteste', 'estimativaapidev', 'temporealteste', 'temporealdev')
            .orderBy('idatividade');

            const csvData = csvjson.toCSV(atividade, {
                    headers: 'key'
                });
                writeFile('./test-data.csv', csvData, (err) => {
                    if(err) {
                        console.log(err); // Do something to handle the error or just throw it
                    }
                    console.log('Success!');
                });
    
        return response.json(atividade);
    },

}