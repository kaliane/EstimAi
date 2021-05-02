import React, { useState, useEffect} from 'react';
import {FiCircle, FiArrowLeft, FiEdit} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom';

export default function CentralEquipe(){

    const [equipes, setEquipes] = useState([]);
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
        api.get('equipe').then(response => {
            setEquipes(response.data);
        })
    }

    function alterarAtivo(idequipe, inativo){

        console.log(idequipe);
        console.log(inativo);

        try{

            api.put('equipe/ativo', {
                idequipe: idequipe,
                inativo: inativo
            }).then(response => {
                carregarDados();
            });
  
         }catch (err) {
             alert('Falha ao atualizar a equipe, tente novamente.');
         }
    }

    function alterarEquipe(idequipe){

        history.push({
                        pathname: '/novaequipe', 
                        state: {idequipe: idequipe}
                    });
    }

    return(
        <div className = "equipe-container">
            <header>
                <span>Equipes</span>
            </header>

            <div className = 'cabecalho'>
                <Link className="back-link" to="/home">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar
                </Link>
                <Link className="button" to="/novaequipe" >
                    Adicionar nova equipe
                </Link>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Ativo</th>
                        <th>Alterar</th>
                    </tr>
                </thead>
                <tbody>
                    {equipes.map(equipe => (
                        <tr key={equipe.idequipe}>
                            <td>{equipe.nomeequipe}</td>
                            <td>
                                <button type="button" onClick={() => alterarAtivo(equipe.idequipe, equipe.inativo)}>
                                    <FiCircle size={18} className={`color-inativo-${equipe.inativo}`}/>  
                                </button>
                            </td>
                            <td>
                                <button type="button" onClick={() => alterarEquipe(equipe.idequipe)}>
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