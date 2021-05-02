const conexao = require('../database/connection');
const criptografia = require('./CriptoController');

module.exports = {

    async index(request, response) {
        try {
            const usuario = await conexao('usuario').select('*').orderBy('idusuario');
            return response.json(usuario);
        } catch (err) {
            console.error(err);
            response.send("Error " + err);
          }
    },

    async create(request, response){
        const {email, senha} = request.body;
        var idusuario;

        console.log(senha);

        var senhaEsalt = criptografia.gerarSenha(senha);

        console.log(senhaEsalt.senhaCripto);
        console.log(senhaEsalt.salt);

        idusuario = await conexao('usuario').insert({
            email: email,
            senha: senhaEsalt.senhaCripto,
            salt: senhaEsalt.salt
        }, ['idusuario'])

        return response.json({idusuario});
    },

    async updateInativo(request, response){
        const { idusuario, inativo } = request.body;
        var NewInat;

        if(inativo == 'F') {
            NewInat = 'T'
        }else{
            NewInat = 'F'
        }
    
         NewInat = await conexao('usuario')
        .where({idusuario: idusuario})
        .update({
            inativo: NewInat
        }, ['inativo'])

        return response.json(NewInat);
    },

    async updateAdmin(request, response){
        const { idusuario, admin } = request.body;
        var NewAdmin;

        if(admin == 'F') {
            NewAdmin = 'T'
        }else{
            NewAdmin = 'F'
        }
    
        NewAdmin = await conexao('usuario')
        .where({idusuario: idusuario})
        .update({
            administrador: NewAdmin
        }, ['administrador'])

        return response.json(NewAdmin);
    },

    async update(request, response){
        const {idusuario, nome, email, telefone, senha } = request.body;

        console.log(senha);

        var senhaEsalt = criptografia.gerarSenha(senha);
    
        usuario = await conexao('usuario')
            .where({idusuario: idusuario})
            .update({
                nome: nome,
                email: email,
                telefone: telefone,
                senha: senhaEsalt.senhaCripto,
                salt: senhaEsalt.salt
            }, ['idusuario'])
        
        return response.json(usuario);
    },
}