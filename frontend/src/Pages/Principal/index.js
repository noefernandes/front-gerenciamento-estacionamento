import React from 'react';
import { Link } from 'react-router-dom';

export default function Principal(){
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
                <p><b>Setor I:</b>  </p>
                <p><b>Setor II:</b>  </p>
                <p><b>Setor III:</b>  </p>
                <p><b>Setor IV:</b>  </p>
                <p><b>Setor V:</b>  </p>
                <p><b>Setor IMD:</b>  </p>
            </div>

            <h2>Quantidade de movimentações</h2>
            <div>
                <p>X automóveis no dia</p>
                <p>X automóveis no mês</p>
            </div>

            <h2>Sensores funcionais</h2>
            <div>
                <p>X sensores</p>
                <p>X disponíveis</p>
            </div>
            
        </div>
    );
};