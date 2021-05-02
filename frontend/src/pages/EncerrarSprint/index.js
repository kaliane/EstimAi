import React, { useState, useEffect} from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { Chart } from "react-google-charts";
var estApiDev = 0.0, estApiTeste = 0.0, estDev = 0.0, estTeste = 0.0, TempoDev = 0.0, TempoTeste = 0.0, atividade ='';

export default function EncerrarSprint() {

    const [atividades, setAtividades] = useState([]);
    const [nomesprint, setNomeSprint] = useState('');
    const [idsprint, setIdSprint] = useState('');
    const history = useHistory();
    const location = useLocation();

    const [dataBar, setDataBar] = useState([
        ['Tipo', 'Gerada', 'Esperada', 'Real esforço']
    ]);

    const [dataBarDev, setDataBarDev] = useState([
        ['Atividade', 'Gerada', 'Esperada', 'Real esforço']
    ]);

    const [dataBarTeste, setDataBarTeste] = useState([
        ['Atividade', 'Gerada', 'Esperada', 'Real esforço']
    ]);

    const [optionsBar, setOptionsBar] = useState({
        title: 'Gráfico estimativas da sprint',
        vAxis: {
            title: 'Horas',
        },
    });
    
    const [optionsBarDev, setOptionsBarDev] = useState({
        title: 'Gráfico estimativas de desenvolvimento',
        vAxis: {
            title: 'Horas',
        },
    });

    const [optionsBarTeste, setOptionsBarTeste] = useState({
        title: 'Gráfico estimativas de teste',
        vAxis: {
            title: 'Horas',
        },
    });

    const [position, setPosition] = useState({
        position: 'top',
        maxLines: 3
    });

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

                        alimentarDados(response.data)                     
                    
                    })
                }
            }
        }

    }, [history, location, alimentarDados]);

    function validarValor(valor){
        var valorResul = 0;
        if (valor === undefined || valor === null){
            valorResul = 0
        }else{
            valorResul = parseFloat(valor)
        }
        return valorResul
    }

    function alimentarDados(dados){

        if(dados === null){
            console.log('null')
            return
        }

        /*dados.map(ativ => (
            estApiDev += parseFloat(ativ.estimativaapidev),
            estApiTeste += parseFloat(ativ.estimativaapidev),
            estDev += parseFloat(ativ.estimativadev),
            estTeste += parseFloat(ativ.estimativateste), 
            TempoDev += parseFloat(ativ.temporealdev),
            TempoTeste += parseFloat(ativ.temporealteste)
        ));

        dataBar.push(
            ['Desenvolvimento', estApiDev, estDev, TempoDev]
        );

        dataBar.push(
            ['Teste', estApiTeste, estTeste, TempoTeste]
        );*/
        

        dados.map(ativ => (
            estApiDev = validarValor(ativ.estimativaapidev),
            estDev = validarValor(ativ.estimativadev),
            TempoDev = validarValor(ativ.temporealdev),
            atividade = parseInt(ativ.idatividade),
            console.log(ativ.idatividade),
            console.log(estApiDev),
            console.log(estDev),
            console.log(TempoDev),
            dataBarDev.push(
                [atividade, estApiDev, estDev, TempoDev]
            )
        ));

        dados.map(ativ => (
            estApiTeste = validarValor(ativ.estimativaapiteste),
            estTeste = validarValor(ativ.estimativateste),
            TempoTeste = validarValor(ativ.temporealteste),
            atividade = parseInt(ativ.idatividade),
            console.log(ativ.idatividade),
            console.log(estApiTeste),
            console.log(estTeste),
            console.log(TempoTeste),
            dataBarTeste.push(
                [atividade, estApiTeste, estTeste, TempoTeste]
            )
        ));

    }

    return(
        <div className = "atividade-container">
            <header>
                <span>Encerrar {nomesprint}</span>
            </header>

            <div className = 'cabecalho'>
                <Link className="back-link" to="/centralsprint">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar
                </Link>
            </div>

            {/*<Chart
                chartType="ColumnChart"
                data={dataBar}
                options={optionsBar}
                legendToggle
            />*/}
            
            <Chart
                chartType="ColumnChart"
                data={dataBarDev}
                options={optionsBarDev}
            />

            <Chart
                chartType="ColumnChart"
                data={dataBarTeste}
                options={optionsBarTeste}
            />
        </div>
    );
}