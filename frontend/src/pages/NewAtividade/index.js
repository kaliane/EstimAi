import React, {useState, useEffect} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import {useHistory, useLocation} from 'react-router-dom';
import apiEstimativa from '../../services/apiEstimativa';
import api from '../../services/api';
import './styles.css';

export default function NewAtividade() {

   // const [wi, setWi] = useState('');
    const [numero, setNumero] = useState('');
    const [numeroimport, setNumeroImport] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [devgerada, setDevGerada] = useState();
    const [testegerada, setTesteGerada] = useState();
    const [dev, setDev] = useState();
    const [teste, setTeste] = useState();
    const [devutilizado, setDevUtilizado] = useState();
    const [testeutilizado, setTesteUtilizado] = useState();
    const [sprint, setSprint] = useState();
    const [voltar, setVoltar] = useState('/home');
    const [texto, setTexto] = useState('Nova');

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
                    setSprint(Sprint)
                    setVoltar('/centralatividade')
                }
            }

            if(location.state.idatividade !== undefined && location.state.idatividade !== null){

                setTexto('Editar');

                const Atividade = parseInt(location.state.idatividade);
                if(Atividade > 0 ){
                    api.get('atividade/edit', {
                        headers:{
                            Authorization: Atividade,
                        }
                    }).then(response => {
                        console.log(response.data[0]);
                        setNumero(response.data[0].idatividade);
                        setNumeroImport(response.data[0].numatvimport);
                        setTitulo(response.data[0].resumo);
                        setDescricao(response.data[0].descricao);
                        setDevGerada(parseFloat(response.data[0].estimativaapidev));
                        setTesteGerada(parseFloat(response.data[0].estimativaapiteste));
                        setDev(parseFloat(response.data[0].estimativadev));
                        setTeste(parseFloat(response.data[0].estimativateste));
                        setDevUtilizado(parseFloat(response.data[0].temporealdev));
                        setTesteUtilizado(parseFloat(response.data[0].temporealteste));
                    })
                }
            }
        }

    }, [history, location]);

   /* async function buscarWi(e){
        e.preventDefault();


        try{

            const response = await apiEstimativa.get('findwi', {
                params: {
                  WI: wi
                }
              });
            
            console.log(response.data)
            console.log(response.data.WI_ID)
            console.log(response.data.RESUMO)

            setNumero(response.data.WI_ID)
            setTitulo(response.data.RESUMO)
            setDescricao(response.data.DESCRICAO)
 
         }catch (err) {
             alert('Falha em buscar a atividade, tente novamente.');
         }
    }*/

    async function estimarWi(e){
        e.preventDefault();

        if(!numero){
            alert('Favor gravar as informações.');
            return
        }

        alert('Favor aguardar a geração da estimativa.')


        try{

            await apiEstimativa.get('estimar', {
                params: {
                  descricao: descricao
                }
            }).then(response => {
                console.log("passo2");
                console.log(response.data);

                setDevGerada(Math.round(parseFloat(response.data.devfinal)));
                setTesteGerada(Math.round(parseFloat(response.data.testefinal)));

                
                api.put('atividade/est', {
                    idatividade: numero,
                    estimativaapiteste: Math.round(parseFloat(response.data.testefinal)),
                    estimativaapidev: Math.round(parseFloat(response.data.devfinal))
                }).then(response => {
                
                    if(response.data[0].estimativaapiteste !== undefined && response.data[0].estimativaapiteste !== null && response.data[0].estimativaapiteste !== ''){
                        alert('Estimativa gravada com sucesso!');
                    }else{
                        alert('Falha ao gravar estimativa');
                    }
                });
            });
         }catch (err) {
             alert('Falha em estimar a atividade, tente novamente.');
         }
    }

    function VoltarCentral(){

        history.push({
                        pathname: voltar, 
                        state: {idsprint: sprint}
                    });
    }


    function CadastrarNovaAtividade(e){
        e.preventDefault();

        gravarDados()
    }

    function gravarDados(){
        if(!titulo || !descricao){
            alert('Favor informar um título e descrição.');
            return
        }

        try{
            //Alteração
            console.log(numero);
            if(numero !== undefined && numero !== null && numero !== ''){
                console.log('alterar');
                
                api.put('atividade', {
                    idatividade: numero,
                    idsprint: sprint,
                    resumo: titulo,
                    descricao: descricao,
                    numatvimport: numeroimport,
                    estimativateste: teste,
                    estimativadev: dev,
                    estimativaapiteste: testegerada,
                    estimativaapidev: devgerada,
                    temporealteste: testeutilizado,
                    temporealdev: devutilizado
                }).then(response => {
                
                    if(response.data[0].idatividade !== undefined && response.data[0].idatividade !== null && response.data[0].idatividade !== ''){
                        setNumero(response.data[0].idatividade);
                        alert('Atividade gravada com sucesso!');
                    }else{
                        alert('Falha ao gravar atividade');
                    }
                });

            }else{
                //Novo
                console.log('novo')

                api.post('atividade', {
                    idsprint: sprint,
                    resumo: titulo,
                    descricao: descricao,
                    numatvimport: numeroimport,
                    estimativateste: teste,
                    estimativadev: dev,
                    estimativaapiteste: testegerada,
                    estimativaapidev: devgerada,
                    temporealteste: testeutilizado,
                    temporealdev: devutilizado
                }).then(response => {
                    
                    if(response.data[0].idatividade !== undefined && response.data[0].idatividade !== null && response.data[0].idatividade !== ''){
                        setNumero(response.data[0].idatividade);  
                        alert('Atividade gravada com sucesso!');
                    }else{
                        alert('Falha ao gravar atividade');
                    }
                });
            }
  
         }catch (err) {
             alert('Falha ao gravar atividade, tente novamente.');
         }
    }

    return(
        <div className = "newatividade-container">
            <div className="content">

                <header>
                    <span>{texto} atividade</span>
                </header>

                <div className = 'cabecalho'>

                    <button className="back-link" onClick={VoltarCentral}>
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </button>

                    {/* <div id="divBusca">
                        <input 
                            type="text" 
                            id="txtBusca" 
                            placeholder="Buscar"
                            value={wi}
                            onChange={e => setWi(e.target.value)}
                        />
                        <button id="btnBusca" alt="Buscar" onClick={buscarWi}>
                            <FiSearch size={32} color="#E02041" />
                        </button>
                    </div> */}

                </div>

            
                <form onSubmit={CadastrarNovaAtividade}>

                    <div className="input-numeros">
                        <label>ID:
                            <input 
                                placeholder="ID"
                                disabled
                                value={numero || ""}
                                onChange={e => setNumero(e.target.value)}
                            />
                        </label>

                        <label>ID importado:
                            <input 
                                placeholder="ID importado"    
                                value={numeroimport || ""} 
                                onChange={e => setNumeroImport(e.target.value)}
                            />
                        </label>
                    </div>

                    <label>Título:
                        <input
                            placeholder="Título"
                            value={titulo || ""} 
                            onChange={e => setTitulo(e.target.value)}
                        />
                    </label>

                    <label>Descrição:
                        <textarea
                            placeholder="Descrição"
                            value={descricao || ""}
                            onChange={e => setDescricao(e.target.value)}
                        />
                    </label>


                    <p id="titest">Estimativa gerada:</p>
                    <div className="input-estimativa">
                        <label>Desenvolvimento:
                            <input
                                placeholder="Desenvolvimento"
                                disabled
                                value={devgerada || ""}
                                onChange={e => setDevGerada(e.target.value)}
                            />
                        </label>
                        <label>Teste:
                            <input
                                placeholder="Teste"
                                disabled
                                value={testegerada || ""}
                                onChange={e => setTesteGerada(e.target.value)}
                            />
                        </label>
                    </div>
                    
                    <p id="titest">Estimativa esperada:</p>
                    <div className="input-estimativa">
                        <label>Desenvolvimento:
                            <input
                                placeholder="Desenvolvimento"
                                value={dev || ""}
                                onChange={e => setDev(e.target.value)}
                            />
                        </label>
                        <label>Teste:
                            <input
                                placeholder="Teste"
                                value={teste || ""}
                                onChange={e => setTeste(e.target.value)}
                            />
                        </label>
                    </div>


                    <p id="titest">Tempo real utilizado:</p>
                    <div className="input-estimativa">
                        <label>Desenvolvimento:
                            <input
                                placeholder="Desenvolvimento"
                                value={devutilizado || ""}
                                onChange={e => setDevUtilizado(e.target.value)}
                            />
                        </label>
                        <label>Teste:
                            <input
                                placeholder="Teste"
                                value={testeutilizado || ""}
                                onChange={e => setTesteUtilizado(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="button-estimativa">
                        <button className="button" onClick={estimarWi}>Gerar estimativa</button>
                        <button className="button" type="submit">Gravar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}