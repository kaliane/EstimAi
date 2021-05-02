const conexao = require('../database/connection');
const  ibmdb  = require ( 'ibm_db' ) ; 

module.exports = {

    buscarAtividades() {

        var conn = ibmdb.openSync(conexao);
        

        const query = " SELECT "+ 
                    "      ITEM.WI_ID, "+
                    "      ITEM.RESUMO, "+ 
                    "      ITEMDESCR.DESCRICAO, "+ 
                    "      ITEM.TIPO, "+
                    "      ITEM.DTRESOLUCAO, "+
                    "        (SELECT "+ 
                    "                SUM(HORASTESTE.TEMPOGASTO) AS TEMPOGASTO "+
                    "            FROM "+
                    "                DBA.WORK_ITEM ITEMFILHO "+
                    "                JOIN DBA.WORK_ITEM_LANCAMENTO_HORAS HORASTESTE ON "+
                    "                    HORASTESTE.WI_ID = ITEMFILHO.WI_ID "+
                    "            WHERE "+ 
                    "                UPPER(TIPOLANCAMENTO) IN('TESTE', 'TESTANDO') AND "+
                    "                ITEM.WI_ID = ITEMFILHO.ITEMPAI "+
                    "        ) AS TEMPOTESTE, "+
                    "        (SELECT  "+
                    "                SUM(HORASDEV.TEMPOGASTO) AS TEMPOGASTO "+
                    "            FROM "+
                    "                DBA.WORK_ITEM ITEMFILHO "+
                    "                JOIN DBA.WORK_ITEM_LANCAMENTO_HORAS HORASDEV ON "+
                    "                    HORASDEV.WI_ID = ITEMFILHO.WI_ID "+
                    "            WHERE  "+
                    "                UPPER(TIPOLANCAMENTO) IN('DESENVOLVIMENTO', 'DESENVOLVENDO') AND "+
                    "                ITEM.WI_ID = ITEMFILHO.ITEMPAI "+
                    "        ) AS TEMPODEV "+
                    "    FROM  "+
                    "        DBA.WORK_ITEM ITEM  "+
                    "        JOIN DBA.WORK_ITEM_DESCRICAO ITEMDESCR ON "+ 
                    "            ITEM.WI_ID = ITEMDESCR.WI_ID "+
                    "    WHERE  "+ 
                    "        (UPPER(ITEM.TIPO) = 'DEFEITO') AND  "+
                    "        ITEM.DTRESOLUCAO > current date - 365 DAYS AND "+
                    "        ITEM.STATUS IN('Concluído', 'Encerrado', 'Pronto', 'Resolvido', 'Aceito') "

        
        var result = conn.queryResultSync(query);
        var data = result.fetchAllSync()
        //console.log("data = ", data.length);
    

        conn.closeSync();

        return data;
    },

    findAtividade(WI){
        //console.log(WI);

        var conn = ibmdb.openSync(conexao);
        
        var query = " SELECT "+
                    "    ITEM.WI_ID, "+
                    "    ITEM.RESUMO,"+
                    "    DESCRICAO.DESCRICAO" +
                    "  FROM "+
                    "    DBA.WORK_ITEM ITEM"+
                    "    JOIN DBA.WORK_ITEM_DESCRICAO DESCRICAO ON"+
                    "      ITEM.WI_ID = DESCRICAO.WI_ID"+
                    "  WHERE "+
                    "    ITEM.WI_ID = ?"
        
       var result = conn.queryResultSync(query, [WI]);
       var data = result.fetchAllSync();
   
       conn.closeSync();
       //console.log(data[0])

       return data[0] ;
    },

}