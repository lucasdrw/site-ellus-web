import React, {useState} from "react";
import api from "../../services/api";
import "./styles.css";

export default function Cadastro({history}) {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    await api.post("/users", {
      user,
      senha
    });

    history.push("/configuracoes");
  }

  return (
    <>
    <div className="header" />
    <div className="container-cadastro">
    <h1>Cadastrar Usuário</h1>
    <div className="content-config">
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
