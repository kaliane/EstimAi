import React, { useState, useEffect} from 'react';
import {FiCircle, FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import {Link, useHistory} from 'react-router-dom';

export default function CentralUsuario(){

    const [usuarios, setUsuarios] = useState([]);
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
        api.get('users').then(response => {
            setUsuarios(response.data);
        })
    }

    function alterarAtivo(idusuario, inativo){

        console.log(idusuario);
        console.log(inativo);

        try{

            api.put('users/ativo', {
                idusuario: idusuario,
                inativo: inativo
            }).then(response => {
                carregarDados();
            });
  
         }catch (err) {
             alert('Falha ao atualizar o usuário, tente novamente.');
         }
    }

    function alterarAdmin(idusuario, administrador){

        console.log(idusuario);
        console.log(administrador);

        try{

            api.put('users/admin', {
                idusuario: idusuario,
                admin: administrador
            }).then(response => {
                
                carregarDados();
            });
  
         }catch (err) {
             alert('Falha ao atualizar o usuário, tente novamente.');
         }
    }

    return(
        <div className = "usuario-container">
            <header>
                <span>Usuários</span>
            </header>

            <div className = 'cabecalho'>
                <Link className="back-link" to="/home">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar
                </Link>
                <Link className="button" to="/novousuario" >
                    Adicionar novo usuário
                </Link>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ativo</th>
                        <th>Administrador</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.idusuario}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button type="button" onClick={() => alterarAtivo(usuario.idusuario, usuario.inativo)}>
                                    <FiCircle size={18} className={`color-inativo-${usuario.inativo}`}/>  
                                </button>
                            </td>
                            <td>
                                <button type="button" onClick={() => alterarAdmin(usuario.idusuario, usuario.administrador)}>
                                    <FiCircle size={18} className={`color-admin-${usuario.administrador}`}/>  
                                </button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}