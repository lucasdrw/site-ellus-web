import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';

import edit from '../../assets/edit-user.png';
import bomba from '../../assets/bomba.png';
import user from '../../assets/new-user.jpg';

export default function Configuracoes() {

    return (
        <>
            <div className="header" />
            <div className="container-incluir">
                <h1>Configurações</h1>
                <div className="form-incluir">
                    <Link to="editar-perfil"><div className="conf-acoes">
                        <img src={edit} alt="user" height="100px" />
                        <h3>Editar Usuário</h3>
                    </div></Link>
                    <Link to="cadastro"><div className="conf-acoes">
                        <img src={user} alt="user" height="95px" />
                        <h3>Cadastrar Usuário</h3>
                    </div></Link>
                    <Link to="postos"><div className="conf-acoes">
                        <img src={bomba} alt="bomba" height="90px" />
                        <h3>Gerenciar Postos</h3>
                    </div></Link>
                </div>
            </div>
        </>
    );
}