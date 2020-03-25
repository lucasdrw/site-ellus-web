import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./styles.css";

export default function NovoChamado({ history }) {
  const [nomePosto, setNomePosto] = useState("");
  const [atendimento, setAtendimento] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [data, setData] = useState("");
  const [prioridade, setPrioridade] = useState("Normal");
  const [situacao, setSituacao] = useState("Aberto");

  const [postos, setPostos] = useState([]);

  useEffect(() => {
    async function carregarPostos(){
      const response = await api.get('/postos');

      const { docs } = response.data;

      setPostos(docs);
    }
    carregarPostos();
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();
    const user_id = localStorage.getItem("user");

    await api.post(
      "/chamados",
      {
        nomePosto,
        atendimento,
        detalhes,
        data,
        prioridade,
        situacao,
      },
      { headers: { user_id } }
    );

    history.push("/chamados");
  }

  return (
    <>
    <div className="header"/>
      <div className="container-incluir">
        <h1>Registrar Atendimento</h1>
        <div className="form-incluir">
          <form onSubmit={handleSubmit}>
            
            <label htmlFor="nomePosto">Posto </label>
            <select id="nomePosto" value={nomePosto} onChange={event => setNomePosto(event.target.value)}>
              <option value="" required> Selecione o Posto de Combustível</option>
              {postos.map(posto => (
                <option value={posto.posto}>{posto.posto}</option>
                ))
              }
            </select>

            <label htmlFor="atendimento">Atendimento</label>
            <input type="text" id="atendimento" value={atendimento} required onChange={event => setAtendimento(event.target.value)} />

            <label htmlFor="detalhes">Detalhes</label>
            <textarea id="detalhes" value={detalhes} onChange={event => setDetalhes(event.target.value)} cols={40} rows={5} />

            <label htmlFor="data">Data</label>
            <input id="data" type="date" value={data} required onChange={event => setData(event.target.value)} />

            <label htmlFor="prioridade">Prioridade</label>
            <select id="prioridade" value={prioridade} onChange={event => setPrioridade(event.target.value)} >
              <option value="Normal">Normal</option>
              <option value="Alta">Alta</option>
              <option value="Urgente">Urgente</option>
            </select>

            <label htmlFor="situacao">Situação</label>
            <select id="situacao" value={situacao} onChange={event => setSituacao(event.target.value)} >
              <option value="Aberto">Aberto</option>
              <option value="Concluido">Concluido</option>
              <option value="Aguardando resposta Cliente"> Aguardando resposta Cliente </option>
              <option value="Aguardando resposta Base">Aguardando resposta Base</option>
            </select>

            <button type="submit" className="botao"> Enviar </button>
          </form>
        </div>
      </div>
    </>
  );
}
