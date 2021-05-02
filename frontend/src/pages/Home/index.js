import React, {useEffect, useState} from 'react';
import {FiPower} from 'react-icons/fi';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo_size.png';

export default function Home(){

    
    const [MostrarAdmin, setMostrarAdmin] = useState(false);
    const history = useHistory();
    const IdUsuario = localStorage.getItem('idusuario');
    const UsuarioAdmin = localStorage.getItem('administrador');

    useEffect(() => {

        if (!IdUsuario) {
            alert('Favor realizar o login.');
            localStorage.clear();
            history.push('/');
        }
        if(UsuarioAdmin === 'T'){
            setMostrarAdmin(true);
        }

    }, [IdUsuario, UsuarioAdmin, history]);

    function logout() {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className = "profile-container">
            <header>
                <span>
                    <img src={logoImg} alt="EstimAi" />
                </span>
                <button onClick={logout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>
            
            <ul>
                <li>
                    <Link className="button" to="/centralequipe">Equipes</Link>
                </li>
                <li>
                    <Link className="button" to="/centralsprint">Sprints</Link>
                </li>
                {/*<li>
                    <Link className="button" to="/new">Estimar atividade isolada</Link>
                </li>*/}
                <li>
                    <Link className="button" to="/perfil">Perfil</Link>
                </li>
                {MostrarAdmin ? 
                    <li>
                        <Link className="button" to="/centralusuario">Usuários</Link>
                    </li>
                :
                    null
                }
            </ul>
        </div>
    );
}