import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

//pegando token do usuario para verificar se ta autenticado ou não
export const estaAutenticado = () => localStorage.getItem("user") != null;

export default function Chamados({ history }) {
  const [chamados, setChamados] = useState([]);
  const [chamadosInfo, setChamadosinfo] = useState({});
  const [page, setPage] = useState(1);
  const [filtro, setFiltro] = useState([]);

  useEffect(() => {
    async function carregarChamados() {
      const response = await api.get('/chamados', {
        params: { page }
      });

      const { docs, ...chamadosInfo } = response.data;

      setChamados(docs);
      setChamadosinfo(chamadosInfo);
    }
    carregarChamados();
  }, [page, filtro]);

  function prevPage() {
    if (page === 1) return;

    const pageNumber = page - 1;

    setPage(pageNumber)
  };

  function nextPage() {
    if (page === chamadosInfo.pages) return;

    const pageNumber = page + 1;

    setPage(pageNumber)
  };

  async function logout() {
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <>
      <div className="header">
        <div className="acoes">
          <Link to="configuracoes/"><p id="btn-acoes">Configurações</p></Link>
          <p onClick={logout} id="btn-acoes">Sair</p>
        </div>
      </div>
      <div className="container-chamados">
        <h1>Atendimentos</h1>
        <Link to="new/">
          <button className="btn">Registrar novo Chamado</button>
        </Link>

        <form className="form-sit">
          <div>
            <input type="checkbox"
              id="Aberto"
              name="sit"
              value="Aberto"
              defaultChecked
            />
            <label htmlFor="Aberto">Aberto</label>
          </div>
          <div>
            <input type="checkbox" id="Concluido" name="sit" value="Concluido" defaultChecked />
            <label htmlFor="Concluido"> Concluído </label>
          </div>
          <div>
            <input type="checkbox" id="Aguardando Cliente" name="sit" value="Aguardando Cliente" defaultChecked />
            <label htmlFor="Aguardando Cliente"> Aguardando Cliente </label>
          </div>
          <div>
            <input type="checkbox" id="Aguardando Base" name="sit" value="Aguardando Base" defaultChecked />
            <label htmlFor="Aguardando Base"> Aguardando Base </label>
          </div>
          <button type="submit" value="Enviar">Filtrar</button>
        </form>

        <ul className="lista-chamados">
          <li id="cabe">
            <p id="cabecalho">Usuário</p>
            <p id="cabecalho">Data</p>
            <p id="cabecalho">Situação</p>
            <p id="cabecalho">Prioridade</p>
          </li>
          {chamados.map(chamado => (
            <Link to={`/editar/${chamado._id}`} key={chamado._id}> <li key={chamado._id}>
              <strong id="nomePosto">{chamado.nomePosto} </strong>
              <strong id="atendimento">{chamado.atendimento}</strong>
              <div id="clear"> </div>
              <p
                id="atendente"
                className={chamado.situacao === "Concluido" ? "back-concluido" : chamado.situacao === "Aberto" ? "back-aberto" : chamado.situacao === "Aguardando resposta Cliente" ? "back-cliente" : "back-base"}
              > {chamado.user === "5da7c945f1af9436a41f76ec" ? "Lucas" : chamado.user === "5db327602f91c314a0429b9f" ? "Natanael" : chamado.user === "5db327e52f91c314a0429ba2" ? "Wanderson" : "Administrador"} </p>
              <p
                id="data"
                className={chamado.situacao === "Concluido" ? "back-concluido" : chamado.situacao === "Aberto" ? "back-aberto" : chamado.situacao === "Aguardando resposta Cliente" ? "back-cliente" : "back-base"}
              > {chamado.data} </p>
              <p
                id="situacao"
                className={chamado.situacao === "Concluido" ? "back-concluido" : chamado.situacao === "Aberto" ? "back-aberto" : chamado.situacao === "Aguardando resposta Cliente" ? "back-cliente" : "back-base"}
              > {chamado.situacao} </p>
              <p
                id="prioridade"
                className={chamado.situacao === "Concluido" ? "back-concluido" : chamado.prioridade === "Alta" ? "back-alta" : chamado.prioridade === "Normal" ? "back-normal" : "back-urgente"}
              > {chamado.prioridade} </p>
            </li> </Link>
          ))}
        </ul>
        <div className="actions">
          <p onClick={prevPage}>Anterior</p>
          <p onClick={nextPage}>Próxima</p>
        </div>
      </div>
    </>
  );
}
