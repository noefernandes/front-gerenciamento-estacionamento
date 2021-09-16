import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Principal from './Pages/Principal';
import EditarEstacionamentos from './Pages/EditarEstacionamentos';
import EscolherEstacionamentos from './Pages/EscolherEstacionamentos';
import EscolherEstacionamentosSensores from './Pages/EscolherEstacionamentosSensores'
import EditarSensores from './Pages/EditarSensores'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Principal} />
                <Route path="/EscolherEstacionamentos" exact component={EscolherEstacionamentos} />
                <Route path="/EscolherEstacionamentosSensores" exact component={EscolherEstacionamentosSensores} />
                <Route path="/EditarEstacionamentos" exact component={EditarEstacionamentos} />
                <Route path="/EditarSensores" exact component={EditarSensores} />
            </Switch>
        </BrowserRouter>
    );
}