import React, {useEffect, useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

export default function Perfil() {

    const history = useHistory();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');
    const IdUsuario = localStorage.getItem('idusuario');

    useEffect(() => {

        if (!IdUsuario) {
            alert('Favor realizar o login.');
            localStorage.clear();
            history.push('/');
        }

        console.log(IdUsuario);

        api.get('sessions',{
            headers:{
                Authorization: IdUsuario,
            }
        }).then(response => {
            setNome(response.data[0].nome);
            setEmail(response.data[0].email);
            setTelefone(response.data[0].telefone);
            setSenha(response.data[0].senha);
            setSenha2(response.data[0].senha);
        })

    }, [history, IdUsuario]);

    function AlterarUsuario(e){
        e.preventDefault();

        if(!email || !senha){
            alert('Favor informar E-mail e Senha.');
            return
        }

        if(senha !== senha2){
            alert('Senhas não conferem. Favor verificar.');
            return
        }

        try{

             api.put('users', {
                idusuario: IdUsuario,
                nome: nome,
                email: email,
                telefone: telefone,
                senha: senha
            }).then(response => {

                console.log(response.data[0].idusuario);
               if(response.data[0].idusuario !== undefined && response.data[0].idusuario !== null){
                    alert('Usuário alterado com sucesso!');
                    localStorage.setItem('nomeUsuario', nome);
               }else{
                   alert('Falha ao gravar usuário');
               }
            });
  
         }catch (err) {
             alert('Falha ao gravar usuário, tente novamente.');
         }
    }

    return(
        <div className = "perfil-container">
            <div className="content">
                <section>
                    <h1>Perfil</h1>

                    <Link className="back-link" to="/home">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>
            
                <form onSubmit={AlterarUsuario}>
                    <label>Nome:
                        <input 
                            placeholder="Nome completo"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </label>
                    <label>E-mail:
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>
                    <label>Celular:
                        <input
                            placeholder="Celular"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                        />
                    </label>
                    <label>Senha:
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />
                    </label>
                    <label>Confirmar senha:
                        <input
                            type="password"
                            placeholder="Confirmar senha"
                            value={senha2}
                            onChange={e => setSenha2(e.target.value)}
                        />
                    </label>
                    <button className="button" type="submit">Gravar</button>
                </form>
            </div>
        </div>
    );
}