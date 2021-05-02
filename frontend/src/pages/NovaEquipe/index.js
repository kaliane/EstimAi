import React, {useState, useEffect} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory, useLocation} from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

export default function NovoUsuario() {

    const [nome, setNome] = useState('');
    const [idequipe, setIdEquipe] = useState('');
    const history = useHistory();
    const location = useLocation();
    const [texto, setTexto] = useState('Nova');

    useEffect(() => {
        const IdUsuario = localStorage.getItem('idusuario');
        if (!IdUsuario) {
            alert('Favor realizar o login.');
            localStorage.clear();
            history.push('/');
        }

        
        if(location.state !== undefined){
            if(location.state.idequipe !== undefined && location.state.idequipe !== null){

                setTexto('Editar');

                const Equipe = parseInt(location.state.idequipe);
                if(Equipe > 0 ){
                    api.get('equipe/edit', {
                        headers:{
                            Authorization: Equipe,
                        }
                    }).then(response => {
                        setNome(response.data[0].nomeequipe);
                        setIdEquipe(response.data[0].idequipe);
                    })
                }
            }
        }

    }, [history, location]);

    function CadastrarNovaEquipe(e){
        e.preventDefault();

        if(!nome){
            alert('Favor informar todos os dados.');
            return
        }

        try{

            //Alteração
            if(location.state !== undefined){
                if(location.state.idequipe !== undefined && location.state.idequipe !== null){
    
                    api.put('equipe', {
                        idequipe: idequipe,
                        nomeequipe: nome
                    }).then(response => {
                        setIdEquipe(response.data.idequipe);
                        if(idequipe !== undefined && idequipe !== null){
                            alert('Equipe gravada com sucesso!');
                            history.push('/centralequipe');
                        }else{
                            alert('Falha ao gravar equipe');
                        }
                    });
                }
            }else{

                //Novo
                api.post('equipe', {
                    nomeequipe: nome
                }).then(response => {
                    setIdEquipe(response.data.idequipe);
                    if(idequipe !== undefined && idequipe !== null){
                            alert('Equipe gravada com sucesso!');
                            history.push('/centralequipe');
                    }else{
                        alert('Falha ao gravar equipe');
                    }
                });
            }
  
         }catch (err) {
             alert('Falha ao gravar equipe, tente novamente.');
         }
    }

    return(
        <div className = "novaequipe-container">
            <div className="content">
                <section>
                    <h1>{texto} equipe</h1>

                    <Link className="back-link" to="/centralequipe">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>
            
                <form onSubmit={CadastrarNovaEquipe}>
                    <label>Nome:
                        <input
                            placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
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