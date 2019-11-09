import React, { useState } from "react";
import api from "../../services/api";

export default function Login({ history }) {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  if(localStorage.getItem("user") != null){
    history.push("/chamados")
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/sessions", {
      user,
      senha
    });

    const { _id } = response.data;

    localStorage.setItem("user", _id);

    history.push("/chamados");
  }

  return (
    <>
    <div className="header"/>
      <div className="container">
        <div className="content">
          <form onSubmit={handleSubmit}>
            <label htmlFor="user">Usuário</label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={event => setUser(event.target.value)}
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={event => setSenha(event.target.value)}
            />

            <button type="submit" className="btn">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
