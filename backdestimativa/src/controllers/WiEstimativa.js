const conexao = require('../database/connection');
const  ibmdb  = require ( 'ibm_db' ) ;
const WiAtividade = require('./WiAtividade');
const StringSimilarity = require('string-similarity');
const Statistic = require('simple-statistics');

module.exports = {
    estimar(descricao){
       // var atividade = WiAtividade.findAtividade(wi);
        var MultAtividades = WiAtividade.buscarAtividades();
        var arraySimi = [0], arrayDev = [0], arrayTeste = [0];
        var auxdev = 0, auxteste = 0, dev, teste;

        console.log('passo1');

        for(var i = 0; i < MultAtividades.length; i++){
            if ((descricao != null) && (MultAtividades[i].DESCRICAO != null)){

                var similarity = StringSimilarity.compareTwoStrings(descricao, MultAtividades[i].DESCRICAO); 
                // console.log(similarity);
                if (similarity > 0.4){
                    dev = parseFloat(MultAtividades[i].TEMPODEV);
                    teste = parseFloat(MultAtividades[i].TEMPOTESTE);
                    if (isNaN(dev)){
                        dev = 0;
                    }else{
                        arrayDev[auxdev] = [similarity, dev];
                        auxdev = auxdev + 1;
                    }
                    
                    if (isNaN(teste)){
                        teste = 0;
                    }else{
                        arrayTeste[auxteste] = [similarity, teste];
                        auxteste = auxteste + 1;
                    }

                    /*if (similarity == 1) {
                        console.log('dev:'+dev)
                        console.log('teste:'+teste)
                    }*/
                }
            }
        }

        //console.log('dev:');
        //console.log(arrayDev);
        //console.log('teste:');
        //console.log(arrayTeste);

        var devfinal = Statistic.linearRegressionLine(Statistic.linearRegression(arrayDev))(1);
        var testefinal = Statistic.linearRegressionLine(Statistic.linearRegression(arrayTeste))(1);
        
        console.log(devfinal);
        console.log(testefinal);

        if(devfinal < 0){
            devfinal = 0
        };
        if(testefinal < 0){
            testefinal = 0
        };

        return {
            devfinal, 
            testefinal,
        };

    }

}