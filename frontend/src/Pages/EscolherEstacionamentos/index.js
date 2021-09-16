import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function EscolherEstacionamentos(){
    const [estacionamentos, setEstacionamentos] = useState([]);

    async function carregarInformacoes(){
        await api.get('api/estacionamentos').then(response => {    
            var estacionamentosUFRN = [];
            for(var i = 0; i < response.data.length; i++){
                //===========================================================MUDAR AQUI INDICE DA UF
                if(response.data[i].universidade.idUniversidade === 2){
                    estacionamentosUFRN.push(response.data[i]);
                }
            }

            setEstacionamentos(estacionamentosUFRN);
        })
    }

    useEffect(() => {
        carregarInformacoes();
    }, []);

    function salvarIdEstacionamentoAtual(idEstacionamentoAtual){
        localStorage.setItem("idEstacionamentoAtual", idEstacionamentoAtual);
    }
    
    return (
        <div>
            <h1>GeVU</h1>
            <Link to="/"> 
                Voltar
            </Link>
            <h2>Escolha um estacionamento para editar</h2>
            <div>
                {estacionamentos ?
                    <ul>
                        {estacionamentos.map(estacionamento => (
                            <li>
                                <Link to="/EditarEstacionamentos" 
                                onClick={() => salvarIdEstacionamentoAtual(estacionamento.idEstacionamento)}>
                                    {estacionamento.setor}
                                </Link>
                            </li>
                        ))}
                    </ul>
                :
                    <p>Carregando</p>}
            </div>
            
        </div>
    );
};