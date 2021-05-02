import React, { useState, useEffect} from 'react';
import {FiArrowLeft, FiEdit, FiArrowRightCircle, FiCheckSquare} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom';

export default function CentralSprint(){

    const [sprints, setSprints] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const IdUsuario = localStorage.getItem('idusuario');
        if (!IdUsuario) {
            alert('Favor realizar o login.');
            localStorage.clear();
            history.push('/');
        }

        carregarDados();
    }, [history]);

    function carregarDados(){
        api.get('sprint').then(response => {
            setSprints(response.data);
        })
    }

    function alterarSprint(idsprint){

        history.push({
                        pathname: '/novasprint', 
                        state: {idsprint: idsprint}
                    });
    }

    function detalharSprint(idsprint){

        history.push({
                        pathname: '/centralatividade', 
                        state: {idsprint: idsprint}
                    });
    }

    function encerrarSprint(idsprint){

        history.push({
                        pathname: '/encerrarsprint', 
                        state: {idsprint: idsprint}
                    });
    }

    return(
        <div className = "sprint-container">
            <header>
                <span>Sprints</span>
            </header>

            <div className = 'cabecalho'>
                <Link className="back-link" to="/home">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar
                </Link>
                <Link className="button" to="/novasprint" >
                    Adicionar nova sprint
                </Link>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Equipe</th>
                        <th>Alterar</th>
                        <th>Detalhar</th>
                        <th>Encerrar</th>
                    </tr>
                </thead>
                <tbody>
                    {sprints.map(sprint => (
                        <tr key={sprint.idsprint}>
                            <td>{sprint.nomesprint}</td>
                            <td>{sprint.nomeequipe}</td>
                            <td>
                                <button type="button" onClick={() => alterarSprint(sprint.idsprint)}>
                                    <FiEdit size={18} color="#E02041" />  
                                </button> 
                            </td>
                            <td>
                                <button type="button" onClick={() => detalharSprint(sprint.idsprint)}>
                                    <FiArrowRightCircle size={18} color="#E02041" />  
                                </button> 
                            </td>
                            <td>
                                <button type="button" onClick={() => encerrarSprint(sprint.idsprint)}>
                                    <FiCheckSquare size={18} color="#E02041" />  
                                </button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}