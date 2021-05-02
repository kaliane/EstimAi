import React, {useState, useEffect} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

export default function NovoUsuario() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');
    const [idusuario, setIdUsuario] = useState('');
    const history = useHistory();

    useEffect(() => {
        const IdUsuario = localStorage.getItem('idusuario');
        if (!IdUsuario) {
            alert('Favor realizar o login.');
            localStorage.clear();
            history.push('/');
        }

    }, [history]);

    function CadastrarNewUsuario(e){
        e.preventDefault();

        if(!email || !senha){
            alert('Favor informar todos os dados.');
            return
        }

        if(senha !== senha2){
            alert('Senhas não conferem. Favor verificar.');
            return
        }

        try{

            api.post('users', {
                email: email,
                senha: senha
            }).then(response => {
                setIdUsuario(response.data.idusuario);
               if(idusuario !== undefined && idusuario !== null){
                    alert('Usuário gravado com sucesso!');
                    history.push('/centralusuario');
               }else{
                   alert('Falha ao gravar usuário');
               }
            });
  
         }catch (err) {
             alert('Falha ao gravar usuário, tente novamente.');
         }
    }

    return(
        <div className = "newusuario-container">
            <div className="content">
                <section>
                    <h1>Novo usuário</h1>

                    <Link className="back-link" to="/centralusuario">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>
            
                <form onSubmit={CadastrarNewUsuario}>
                    <label>E-mail:
                        <input
                            type="email"
                            placeholder="E-mail"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>
                    <label>Senha:
                        <input
                            type="password"
                            placeholder="Senha"
                            onChange={e => setSenha(e.target.value)}
                        />
                    </label>
                    <label>Confirmar senha:
                        <input
                            type="password"
                            placeholder="Confirmar senha"
                            onChange={e => setSenha2(e.target.value)}
                        />
                    </label>
                    <button className="button" type="submit">
                        Gravar
                    </button>
                </form>
            </div>
        </div>
    );
}