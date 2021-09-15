import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Principal(){
    const [estacionamentos, setEstacionamentos] = useState([]);
    const [quantidadeSensores, setQuantidadeSensores] = useState();
    const [sensoresDisponiveis, setSensoresDisponiveis] = useState(0);
    const [capacidadeMaxima, setCapacidadeMaxima] = useState({});
    const [ocupacao, setOcupacao] = useState({});
    const [fluxo, setFluxo] = useState([]); 

    useEffect(() => {
        //Pegando os nomes dos setores e guardando no estado estacionamentos.
        var nomeSetores = [];
        api.get('api/estacionamentos').then(response => {
            for(var i = 0; i < response.data.length; i++){
                nomeSetores.push(response.data[i].setor)
            }
        })
        
        var capacidade = {};
        var ocupacao = {};
        var disponivel = 0;
        var fluxo_temp = {};

        //Armazenando no dicionário setores a quantidade de veículos
        api.get('api/sensorVaga').then(response => {
            for(var i = 0; i < nomeSetores.length; i++){
                capacidade[nomeSetores[i]] = 0;
                ocupacao[nomeSetores[i]] = 0;
                for(var j = 0; j < response.data.length; j++){
                    if(nomeSetores[i] === response.data[j].dispositivo.estacionamento.setor){
                        capacidade[nomeSetores[i]] += 1; 
                        if(response.data[j].ocupado === true)
                            ocupacao[nomeSetores[i]] += 1;
                    }
                }
            }

            for(var i = 0; i < response.data.length; i++){
                if(response.data[i].status === "Disponivel")
                    disponivel += 1;
            }

            for(var key in capacidade){
                if(capacidade[key] - ocupacao[key] === capacidade[key]){
                    fluxo_temp[key] = "Livre";
                }else if(capacidade[key] - ocupacao[key] === 0){
                    fluxo_temp[key] = "Lotado";
                }else{
                    fluxo_temp[key] = "Moderado";
                }
            }

            //console.log(capacidade);
            //console.log(ocupacao);
            //console.log(disponivel);
            setCapacidadeMaxima(capacidade);
            setOcupacao(ocupacao);
            setSensoresDisponiveis(disponivel);
            setQuantidadeSensores(response.data.length);
            setFluxo(fluxo_temp);
        })
    }, []);
    
    return (
        <div>
            <h1>Bem vindo ao GeVU</h1>
            <div>
                <Link>Editar universidade</Link>
            </div>
            <div>
                <Link>Editar sensores</Link>
            </div>
            <div>
                <Link>Gerar relatório</Link>
            </div>

            <h2>Situação de vagas por setor</h2>
            <div>
                <ul>
                    {Object.keys(fluxo).map(valor => (
                        <li>
                            <p><b>{valor}</b>: {fluxo[valor]}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <h2>Quantidade de movimentações</h2>
            <div>
                <p>X automóveis no dia</p>
                <p>X automóveis no mês</p>
            </div>

            <h2>Sensores funcionais</h2>
            <div>
                <p>{quantidadeSensores} sensores</p>
                <p>{sensoresDisponiveis} disponíveis</p>
            </div>
            
        </div>
    );
};