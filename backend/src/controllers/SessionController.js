const conexao = require('../database/connection');
const criptografia = require('../controllers/CriptoController');

module.exports = {

    async create(request, response){
        const {email, senha} = request.body;

        console.log(email);
        console.log(senha);
        
        const usuario = await conexao('usuario')
            .where({email: email, inativo: 'F'})
            .select('nome', 'idusuario', 'administrador', 'senha', 'salt')
            .first();

        console.log(usuario);

        if (!usuario) {
            return response.status(400).json({error: 'Email ou senha incorretos'});
        }else{
            if (!usuario.salt) {
                if (senha !== usuario.senha){
                    return response.status(400).json({error: 'Email ou senha incorretos'});
                }
            }else{
                console.log("entro lugar certo...");
                if (criptografia.validarSenha(senha, usuario.salt, usuario.senha) == false ){
                    return response.status(400).json({error: 'Email ou senha incorretos'});
                }
            }
        }

        return response.json(usuario);
    },

    async index(request, response) {
        const idusuario = request.headers.authorization;

        const usuario = await conexao('usuario')
            .where('idusuario', idusuario)
            .select('*');
    
        return response.json(usuario);
    },
}