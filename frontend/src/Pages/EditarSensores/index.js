import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';


export default function EditarSensores(){
    const [estacionamento, setEstacionamento] = useState();
    const [sensores, setSensores] = useState([]);
    const [estado, setEstado] = useState("");
    const [idSensor, setIdSensor] = useState();

    async function carregarInformacoes(){
        var idEstacionamento = localStorage.getItem("idEstacionamentoAtual");
        
        await api.get(`api/estacionamento/${idEstacionamento}`).then(response => {
            setEstacionamento(response.data);
        });

        var sensoresEstacionamentoAtual = [];
        await api.get(`api/sensorVaga`).then(response => {
            for(var i = 0; i < response.data.length; i++){
                //console.log(response.data[i].dispositivo.estacionamento.idEstacionamento);
                if(response.data[i].dispositivo?.estacionamento?.idEstacionamento == idEstacionamento){
                    sensoresEstacionamentoAtual.push(response.data[i])
                }
            }
            setSensores(sensoresEstacionamentoAtual);
        });
        //console.log(sensores);
    }

    useEffect(() => {
        carregarInformacoes();
    }, []);

    function verificaSeAtivo(sensor){
        return sensor.status;
    }

    async function mudarEstadoSensor(e){
        e.preventDefault();

        try{
            const response1 = await api.get(`api/sensorVaga/${idSensor}`);
            const sensorAtual = response1.data;
            try{
                const idDispositivo = sensorAtual.dispositivo.id_dispositivo;
                //console.log(sensorAtual);
                //console.log(idDispositivo);
                console.log(estado);
                sensorAtual.status = estado; 
                const response2 = await api.post(`api/sensorVaga/cadastrar/${idDispositivo}`
                , sensorAtual);
                console.log(response2.data);
            }catch(err){
                console.log(err);
            }
        }catch(err){
            console.log(err);
        }

        alert("O Estado do sensor foi modificado!");
    }
    
    return (
        <div className="principal" style={{fontFamily: 'Helvetica, Arial, sans-serif'}}>
            <h1 className="title" style={{ textAlign: 'center', backgroundColor: '#9cb582', textTransform: 'uppercase', paddingTop: 100, paddingBottom: 100 }}>GeVU</h1>
            <Link to="/EscolherEstacionamentosSensores" style={{textDecoration: 'none', backgroundColor: '#444', color: 'white', position: 'absolute', top: 20, padding: 20}}> 
                Voltar
            </Link>
            <h2>Editar sensor</h2>
            <div>
                {estacionamento && sensores ?
                    <div>
                        <h3><b>{estacionamento.setor}</b> {verificaSeAtivo(estacionamento)}</h3>
                        <form onSubmit={mudarEstadoSensor}>
                        <p>Insira o número do sensor...</p>
                            <div>
                                <input  
                                    value={idSensor}
                                    onChange = {e => setIdSensor(e.target.value)}
                                >
                                </input>
                            </div>
                            <p>Informe o novo estado...</p>
                            <div>
                                <input  
                                    value={estado}
                                    onChange = {e =>setEstado(e.target.value) }
                                >
                                </input>
                            </div>
                            <button type='submit'>Aplicar mudança</button>
                        </form>
                        <div>
                            <ul>
                                {sensores.map(sensor => (
                                    <li>
                                        <p><b>Sensor {sensor.id_sensor_vaga}</b>: {sensor.status}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                :
                    <p>Carregando...</p>}
            </div>
        </div>
    );
}