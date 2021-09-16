import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';


export default function EditarEstacionamentos(){
    const [estacionamento, setEstacionamento] = useState();
    
    async function carregarInformacoes(){
        var idEstacionamento = localStorage.getItem("idEstacionamentoAtual");
        
        await api.get(`api/estacionamento/${idEstacionamento}`).then(response => {
            setEstacionamento(response.data);
        });
    }

    useEffect(() => {
        carregarInformacoes();
    }, []);

    function verificaSeAtivo(estacionamento){
        if(estacionamento?.ativo === true)
            return "Em atividade";
        else
            return "Desativado"
    }

    async function ativarEstacionamento(estacionamento){
        //console.log(estacionamento.idEstacionamento);
        if(estacionamento.ativo === false)
            estacionamento.ativo = true;
        try{
            console.log(estacionamento);
            const reponse = await api.post(`api/estacionamento/cadastrar/${estacionamento.universidade.idUniversidade}`, estacionamento);
        }catch(err){
            console.log(err);
        }

        alert("Estacionamento ativado!");
    }

    async function desativarEstacionamento(estacionamento){
        if(estacionamento.ativo === true)
            estacionamento.ativo = false;
        try{
            const response = await api.post(`api/estacionamento/cadastrar/${estacionamento.universidade.idUniversidade}`, estacionamento);
        }catch(err){
            console.log(err);
        }

        alert("Estacionamento desativado!");
    }
    
    return (
        <div className="principal" style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>
            <h1 className="title" style={{ textAlign: 'center', backgroundColor: '#9cb582', textTransform: 'uppercase', paddingTop: 100, paddingBottom: 100 }}>GeVU</h1>
            <Link to="/EscolherEstacionamentos" style={{textDecoration: 'none', backgroundColor: '#444', color: 'white', position: 'absolute', top: 20, padding: 20}}> 
                Voltar
            </Link>
            <h2>Editar estacionamento</h2>
            <div>
                {estacionamento ?
                    <div>
                        <p><b>{estacionamento.setor}</b>: {verificaSeAtivo(estacionamento)}</p>
                        <button onClick={() => {ativarEstacionamento(estacionamento)}}>Ativar</button>
                        <button onClick={() => {desativarEstacionamento(estacionamento)}}>Desativar</button>
                    </div>
                :
                    <p>Carregando...</p>}
            </div>
        </div>
    );
}