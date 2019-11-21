import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { estaAutenticado } from './pages/chamados/index'

import Cadastro from "./pages/cadastro";
import EditarPerfil from "./pages/editar-perfil";
import Login from "./pages/login";
import Chamados from "./pages/chamados";
import NovoChamado from "./pages/novo-chamado";
import Editar from "./pages/editar"
import Configuracoes from "./pages/configuracoes"
import Postos from "./pages/postos"

//verificando se o usuario esta autenticado
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
    estaAutenticado() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
  } />
)

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/cadastro" component={Cadastro} />
        <PrivateRoute path="/editar-perfil" component={EditarPerfil} />
        <PrivateRoute path="/chamados" component={Chamados} />
        <PrivateRoute path="/novo-chamado" component={NovoChamado} />
        <PrivateRoute path="/configuracoes" component={Configuracoes} />
        <PrivateRoute path="/editar/:chamado" component={Editar} />
        <PrivateRoute path="/postos" component={Postos} />
        <Route path="*" component={() => <h1>Página não encontrada</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
