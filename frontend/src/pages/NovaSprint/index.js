import React, {useState, useEffect} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory, useLocation} from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

export default function NovaSprint() {

    const [nome, setNome] = useState('');
    const [idequipe, setIdEquipe] = useState('');
    const [equipes, setEquipes] = useState([]); //Dropdown
    const [idsprint, setIdSprint] = useState('');
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

        carregarEquipes()

        if(location.state !== undefined){
            if(location.state.idsprint !== undefined && location.state.idsprint !== null){

                setTexto('Editar');

                const Sprint = parseInt(location.state.idsprint);
                if(Sprint > 0 ){
                    api.get('sprint/edit', {
                        headers:{
                            Authorization: Sprint,
                        }
                    }).then(response => {
                        setIdSprint(response.data[0].idsprint);
                        setNome(response.data[0].nomesprint);
                        setIdEquipe(response.data[0].idequipe);
                    })
                }
            }
        }

    }, [history, location]);

    function carregarEquipes(){
        api.get('equipe/ativo').then(response => {
            setEquipes(response.data);
        })
    }

    function CadastrarNovaSprint(e){
        e.preventDefault();

        if(!nome || !idequipe){
            alert('Favor informar todos os dados.');
            return
        }

        try{

            //Alteração
            if(location.state !== undefined){
                if(location.state.idsprint !== undefined && location.state.idsprint !== null){
    
                    api.put('sprint', {
                        idsprint: idsprint,
                        nomesprint: nome,
                        idequipe: idequipe
                    }).then(response => {
                        setIdSprint(response.data.idsprint);
                        if(idsprint !== undefined && idsprint !== null){
                            alert('Sprint gravada com sucesso!');
                            history.push('/centralsprint');
                        }else{
                            alert('Falha ao gravar sprint');
                        }
                    });
                }
            }else{

                //Novo
                api.post('sprint', {
                    nomesprint: nome,
                    idequipe: idequipe
                }).then(response => {
                    setIdSprint(response.data.idsprint);
                    if(idsprint !== undefined && idsprint !== null){
                            alert('Sprint gravada com sucesso!');
                            history.push('/centralsprint');
                    }else{
                        alert('Falha ao gravar sprint');
                    }
                });
            }
  
         }catch (err) {
             alert('Falha ao gravar sprint, tente novamente.');
         }
    }

    return(
        <div className = "novasprint-container">
            <div className="content">
                <section>
                    <h1>{texto} sprint</h1>

                    <Link className="back-link" to="/centralsprint">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>
            
                <form onSubmit={CadastrarNovaSprint}>
                    <label>Nome:
                        <input
                            placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </label>
                    <label>Equipe:
                        <select
                            placeholder="Equipe"
                            value={idequipe}
                            onChange={e => setIdEquipe(e.target.value)}
                        >
                            {equipes.map(equipe => (
                                <option key={equipe.idequipe} value={equipe.idequipe}>{equipe.nomeequipe}</option>
                            ))}
                        </select>
                    </label>
                    <button className="button" type="submit">
                        Gravar
                    </button>
                </form>
            </div>
        </div>
    );
}