import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckboxGroup from "react-checkbox-group";
import {parseISO, format} from "date-fns";
import pt from "date-fns/locale/pt"
import api from "../../services/api";
import "./styles.css";

//pegando token do usuario para verificar se ta autenticado ou não
export const estaAutenticado = () => localStorage.getItem("user") != null;

export default function Chamados({ history }) {
  const [chamados, setChamados] = useState([]);
  const [date, setDate] = useState([]);
  const [chamadosInfo, setChamadosinfo] = useState({});
  const [page, setPage] = useState(1);
  const [filtro, setFiltro] = useState(['Aberto', 'Aguardando resposta Base', 'Aguardando resposta Cliente']);

  const sit = [filtro[0], filtro[1], filtro[2], filtro[3]];

  useEffect(() => {
    async function carregarChamados() {
      const response = await api.get('/chamados', {
        params: { page, sit }
      });

      const { docs, ...chamadosInfo } = response.data;

      setChamados(docs);
      setChamadosinfo(chamadosInfo);

      const ndata = chamados.map(chamado => {
        const firstDate = parseISO(chamado.data);
        const formated = format(firstDate, "dd'/'MM'/'yyyy", {locale: pt})
        const id = chamado._id;
        const atendimento = chamado.atendimento;
        const nomePosto = chamado.nomePosto;
        const prioridade = chamado.prioridade;
        const situacao = chamado.situacao;
        const user = chamado.user;

        return{
          id,
          data : formated,
          atendimento,
          nomePosto,
          prioridade,
          situacao,
          user
        };
      })     
      setDate(ndata)   
    }
    carregarChamados();
  }, [page, filtro, date]);

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
        <div className="form-sit">
        <CheckboxGroup name="filtro" value={filtro} onChange={setFiltro}>
          {(Checkbox) => (
            <>          
          <label>
            <Checkbox value="Aberto"/>Aberto
          </label>
          <label>
            <Checkbox value="Concluido"/>Concluido
          </label>
          <label>
            <Checkbox value="Aguardando resposta Base"/>Aguardando resposta Base
          </label>
          <label>
            <Checkbox value="Aguardando resposta Cliente"/>Aguardando resposta Cliente
          </label>
          </>
          )}
        </CheckboxGroup>
        </div>
        <ul className="lista-chamados">
          <li id="cabe">
            <p id="cabecalho">Usuário</p>
            <p id="cabecalho">Data</p>
            <p id="cabecalho">Situação</p>
            <p id="cabecalho">Prioridade</p>
          </li>
          {date.map(chamado => (
            <Link to={`/editar/${chamado.id}`} key={chamado.id}> <li key={chamado.id}>
              <strong id="nomePosto">{chamado.nomePosto} </strong>
              <strong id="atendimento">{chamado.atendimento}</strong>
              <div id="clear"/>
              <p
                id="atendente"
                className={chamado.situacao === "Concluido" ? "back-concluido" : chamado.situacao === "Aberto" ? "back-aberto" : chamado.situacao === "Aguardando resposta Cliente" ? "back-cliente" : "back-base"}
              > {chamado.user === "5da7c945f1af9436a41f76ec" ? "Lucas" : chamado.user === "5db327602f91c314a0429b9f" ? "Natanael" : chamado.user === "5db327e52f91c314a0429ba2" ? "Wanderson" : "Administrador"} </p>
              <p
                 id="data"
                 className={chamado.situacao === "Concluido" ? "back-concluido" : chamado.situacao === "Aberto" ? "back-aberto" : chamado.situacao === "Aguardando resposta Cliente" ? "back-cliente" : "back-base"}
                 >{chamado.data}</p>    
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
