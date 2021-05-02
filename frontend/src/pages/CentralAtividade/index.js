import React, { useState, useEffect} from 'react';
import {FiArrowLeft, FiEdit} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import {Link, useHistory, useLocation} from 'react-router-dom';

export default function CentralAtividade(){

    const [atividades, setAtividades] = useState([]);
    const [nomesprint, setNomeSprint] = useState('');
    const [idsprint, setIdSprint] = useState('');
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const IdUsuario = localStorage.getItem('idusuario');
        if (!IdUsuario) {
            alert('Favor realizar o login.');
            localStorage.clear();
            history.push('/');
        }

        if(location.state !== undefined){
            if(location.state.idsprint !== undefined && location.state.idsprint !== null){

                const Sprint = parseInt(location.state.idsprint);
                if(Sprint > 0 ){

                    setIdSprint(Sprint);

                    api.get('atividade', {
                        headers:{
                            Authorization: Sprint,
                        }
                    }).then(response => {
                        setAtividades(response.data);
                        setNomeSprint(response.data[0].nomesprint);
                    })
                }
            }
        }

    }, [history, location]);


    function alterarAtividade(idatividade){

        history.push({
                        pathname: '/new', 
                        state: {idsprint: idsprint, idatividade: idatividade}
                    });
    }

    function adicionarAtividade(){

        history.push({
                        pathname: '/new', 
                        state: {idsprint: idsprint}
                    });
    }

    return(
        <div className = "atividade-container">
            <header>
                <span>{nomesprint}</span>
            </header>

            <div className = 'cabecalho'>
                <Link className="back-link" to="/centralsprint">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar
                </Link>
                <button className="button" onClick={() => adicionarAtividade()}>
                    Adicionar nova atividade
                </button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Resumo</th>
                        <th>Est. Desenv.</th>
                        <th>Est. Teste</th>
                        <th>Est. Gerada Desenv.</th>
                        <th>Est. Gerada Teste</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {atividades.map(ativ => (
                        <tr key={ativ.idatividade}>
                            <td>{ativ.idatividade}</td>
                            <td>{ativ.resumo}</td>
                            <td>{ativ.estimativadev}</td>
                            <td>{ativ.estimativateste}</td>
                            <td>{ativ.estimativaapidev}</td>
                            <td>{ativ.estimativaapiteste}</td>
                            <td>
                                <button type="button" onClick={() => alterarAtividade(ativ.idatividade)}>
                                    <FiEdit size={18} color="#E02041" />  
                                </button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}