import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Principal() {
    const [estacionamentos, setEstacionamentos] = useState();
    const [quantidadeSensores, setQuantidadeSensores] = useState();
    const [sensoresDisponiveis, setSensoresDisponiveis] = useState(0);
    const [capacidadeMaxima, setCapacidadeMaxima] = useState({});
    const [ocupacao, setOcupacao] = useState({});
    const [fluxo, setFluxo] = useState([]);

    async function carregarInformacoes() {
        var nomeSetores = [];
        await api.get('api/estacionamentos').then(response => {
            var estacionamentosUFRN = [];
            for (var i = 0; i < response.data.length; i++) {
                //===========================================================MUDAR AQUI INDICE DA UF
                if (response.data[i].universidade.idUniversidade === 1) {
                    nomeSetores.push(response.data[i].setor)
                    estacionamentosUFRN.push(response.data[i]);
                }
            }

            //localStorage.setItem("estacionamentos", JSON.stringify(estacionamentosUFRN));
            setEstacionamentos(estacionamentosUFRN);
        })

        var capacidade = {};
        var ocupacao = {};
        var disponivel = 0;
        var fluxo_temp = {};

        //Armazenando no dicionário setores a quantidade de veículos
        await api.get('api/sensorVaga').then(response => {
            var sensoresUFRN = [];
            for (var i = 0; i < response.data.length; i++) {
                //============================================================= MUDAR ID DA UF AQUI
                if (response.data[i].dispositivo?.estacionamento.universidade.idUniversidade === 1) {
                    sensoresUFRN.push(response.data[i]);
                }
            }

            //Guardando capacidade e ocupacao de cada setor em dicionario
            for (var i = 0; i < nomeSetores.length; i++) {
                capacidade[nomeSetores[i]] = 0;
                ocupacao[nomeSetores[i]] = 0;
                for (var j = 0; j < sensoresUFRN.length; j++) {
                    if (nomeSetores[i] === sensoresUFRN[j].dispositivo.estacionamento.setor) {
                        capacidade[nomeSetores[i]] += 1;
                        if (sensoresUFRN[j].ocupado === true)
                            ocupacao[nomeSetores[i]] += 1;
                    }
                }
            }

            //Contando quantos sensores estão disponíveis
            for (var i = 0; i < sensoresUFRN.length; i++) {
                if (sensoresUFRN[i].status === "Disponivel")
                    disponivel += 1;
            }

            //Defindo taxa rótulo de ocupação em um dicionário
            for (var key in capacidade) {
                if (capacidade[key] - ocupacao[key] === capacidade[key]) {
                    fluxo_temp[key] = "Livre";
                } else if (capacidade[key] - ocupacao[key] === 0) {
                    fluxo_temp[key] = "Lotado";
                } else {
                    fluxo_temp[key] = "Moderado";
                }
            }

            //console.log(capacidade);
            //console.log(ocupacao);
            //console.log(disponivel);
            setCapacidadeMaxima(capacidade);
            setOcupacao(ocupacao);
            setSensoresDisponiveis(disponivel);
            setQuantidadeSensores(sensoresUFRN.length);
            setFluxo(fluxo_temp);
        })
    }

    useEffect(() => {
        carregarInformacoes();
    }, []);



    return (
        <div className="principal" style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>
            <h1 className="title" style={{ textAlign: 'center', backgroundColor: '#9cb582', textTransform: 'uppercase', paddingTop: 100, paddingBottom: 100 }}>Bem vindo ao GeVU</h1>
            <div>
                <div className="menu" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 20}}>
                    <div style={{borderWidth: 2, padding: 20, borderColor: '#000'}}>
                        <Link to="/EscolherEstacionamentos" style={{textDecoration: 'none'}} >
                            Editar universidade
                        </Link>
                    </div>
                    <div style={{borderWidth: 2, padding: 20, borderColor: '#000'}}>
                        <Link to="/EscolherEstacionamentosSensores"  style={{textDecoration: 'none'}}>Editar sensores</Link>
                    </div>
                    <div style={{borderWidth: 2, padding: 20, borderColor: '#000'}}>
                        <Link style={{textDecoration: 'none'}}>Gerar relatório</Link>
                    </div>
                </div>
                <div style={{ display:'flex', flexDirection: 'row', justifyContent: 'space-between', clear: 'both' }}>
                    <div className="info" style={{flexDirection: 'row'}}>
                        <h2 style={{textTransform: 'uppercase'}}>Situação de vagas por setor</h2>
                        {fluxo ?
                            <div>
                                <ul style={{listStyle: 'none'}}>
                                    {Object.keys(fluxo).map(valor => (
                                        <li style={{textDecoration: 'none'}}>
                                            <p style={fluxo[valor] == "Lotado" ? ({color: "red"}) : ({color: "green"})}><b>{valor}</b>: {fluxo[valor]}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            :
                            <p>Carregando...</p>}
                    </div>
                    <div>

                        <h2>Quantidade de movimentações</h2>
                        <div>
                            <p>X automóveis no dia</p>
                            <p>X automóveis no mês</p>
                        </div>

                        <h2>Sensores funcionais</h2>
                        {quantidadeSensores && sensoresDisponiveis ?
                            <div>
                                <p>{quantidadeSensores} sensores</p>
                                <p>{sensoresDisponiveis} disponíveis</p>
                            </div>
                            :
                            <p>Carregando...</p>}

                    </div>
                </div>
            </div>
        </div>
    );
};