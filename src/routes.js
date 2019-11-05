import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { estaAutenticado } from './pages/chamados/index'

import Cadastro from "./pages/cadastro";
import Login from "./pages/login";
import Chamados from "./pages/chamados";
import New from "./pages/new";
import Editar from "./pages/editar"

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
        <PrivateRoute path="/chamados" component={Chamados} />
        <PrivateRoute path="/new" component={New} />
        <PrivateRoute path="/editar/:chamado" component={Editar} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
