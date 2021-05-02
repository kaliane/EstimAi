import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import NewAtividade from './pages/NewAtividade';
import Perfil from './pages/Perfil';
import CentralUsuario from './pages/CentralUsuario';
import NovoUsuario from './pages/NovoUsuario';
import CentralEquipe from './pages/CentralEquipe';
import NovaEquipe from './pages/NovaEquipe';
import CentralSprint from './pages/CentralSprint';
import NovaSprint from './pages/NovaSprint';
import CentralAtividade from './pages/CentralAtividade';
import EncerrarSprint from './pages/EncerrarSprint';

export default function Routes(){
    return(
        <BrowserRouter>
            {/*Swith serve para chamar apenas uma rota por vez, nunca vai chamar duas*/}
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/home' exact component={Home} />
                <Route path='/new' exact component={NewAtividade} />
                <Route path='/perfil' exact component={Perfil} />
                <Route path='/centralusuario' exact component={CentralUsuario} />
                <Route path='/novousuario' exact component={NovoUsuario} />
                <Route path='/centralequipe' exact component={CentralEquipe} />
                <Route path='/novaequipe' exact component={NovaEquipe} />
                <Route path='/centralsprint' exact component={CentralSprint} />
                <Route path='/novasprint' exact component={NovaSprint} />
                <Route path='/centralatividade' exact component={CentralAtividade} />
                <Route path='/encerrarsprint' exact component={EncerrarSprint} />
            </Switch>
        </BrowserRouter>
    );
}