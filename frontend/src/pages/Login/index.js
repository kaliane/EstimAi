import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    useEffect(() => {

        const IdUsuario = localStorage.getItem('idusuario');

        if (IdUsuario > 0) {
            history.push('/home');
        }

    }, [history]);

    async function handleLogin(e){
        //Evitar redirect, fazer em todo formulario
        e.preventDefault();

        try{

           const response = await api.post('sessions', {email, senha});

            localStorage.setItem('idusuario', response.data.idusuario);
            localStorage.setItem('nomeUsuario', response.data.nome);
            localStorage.setItem('administrador', response.data.administrador);

            history.push('/home');

        }catch (err) {
            alert('Falha no login, tente novamente.');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                {/* <img src={logoImg} alt="Be The Hero" /> */}

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input type='password'
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                </form>
            </section>
        </div>
    );
}