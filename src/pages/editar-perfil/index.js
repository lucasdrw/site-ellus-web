import React, {useState, useEffect} from "react";
import api from "../../services/api";
import "./styles.css";

export default function EditarPerfil({history, match}) {

  const [usuario, setUsuario] = useState("");
  //const [user, setUser] = useState("");
  //const [senha, setSenha] = useState("");

  useEffect(() => {
    async function carregarUsuario(){
      const id = localStorage.getItem("user");
      const response = await api.get(`/users/${id}`)

      setUsuario(response.data);
    }

    carregarUsuario();
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();

    const id = localStorage.getItem("user");
    const {user, senha } = usuario;

    await api.put(`/users/${id}/editar`, {
      user,
      senha
    });

    history.push("/configuracoes");
  }

  return (
    <>
    <div className="header" />
    <div className="container-editar-perfil">
    <h1>Editar Perfil</h1>
    <div className="content-config">
    <form onSubmit={handleSubmit}>
            <label htmlFor="user">Usuário</label>
            <input
              type="text"
              id="user"
              value={usuario.user}
              onChange={event => setUsuario({...usuario, user: event.target.value})}
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="text"
              id="senha"
              value={usuario.senha}
              onChange={event => setUsuario({...usuario, senha: event.target.value})}
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
