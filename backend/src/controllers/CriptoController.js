const conexao = require('../database/connection');
const crypto = require("crypto");

module.exports = {

    gerarSalt(length){
        return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex')
                .slice(0,16); 
    },

    sha512(senha, salt){
        var hash = crypto.createHmac('sha512', salt); // Algoritmo de cripto sha512
        hash.update(senha);
        var hash = hash.digest('hex');
        return hash
    },

    gerarSenha(senha) {
        var salt = this.gerarSalt(16);
        var senhaCripto = this.sha512(senha, salt);

        console.log("salt: "+salt);
        console.log("senha: "+senhaCripto);

        return{
            senhaCripto,
            salt,
        }    
    },

    validarSenha(senhaDoLogin, saltNoBanco, hashNoBanco) {
        var hash = this.sha512(senhaDoLogin, saltNoBanco);
        console.log("hash: "+hash);
        console.log("hashNoBanco: "+hashNoBanco);
        return hashNoBanco === hash;
    }

}