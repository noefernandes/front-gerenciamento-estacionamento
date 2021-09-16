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
                if(response.data[i].universidade.idUniversidade === 1){
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
        <div className="principal" style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>
            <h1 className="title" style={{ textAlign: 'center', backgroundColor: '#9cb582', textTransform: 'uppercase', paddingTop: 100, paddingBottom: 100 }}>GeVU</h1>
            <Link to="/" style={{textDecoration: 'none', backgroundColor: '#444', color: 'white', position: 'absolute', top: 20, padding: 20}}> 
                Voltar
            </Link>
            <h2>Escolha um estacionamento para editar</h2>
            <div>
                {estacionamentos ?
                    <ul>
                        {estacionamentos.map(estacionamento => (
                            <li>
                                <Link to="/EditarSensores" 
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