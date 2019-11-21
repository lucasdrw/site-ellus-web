import React, { useState } from "react";
import api from "../../services/api";
import "./styles.css";

export default function NovoChamado({ history }) {
  const [nomePosto, setNomePosto] = useState("");
  const [atendimento, setAtendimento] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [data, setData] = useState("");
  const [prioridade, setPrioridade] = useState("Normal");
  const [situacao, setSituacao] = useState("Aberto");

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
            <select
              id="nomePosto"
              value={nomePosto}
              onChange={event => setNomePosto(event.target.value)}
            >
              <option value="" selected> Selecione o Posto de Combustível</option>
              <option value="Ellus Default">Ellus Default</option>
              <option value="Posto 2 Irmãos">2 Irmãos</option>
              <option value="Posto Acaizal">Acaizal</option>
              <option value="Posto Antonio Marcos">Antonio Marcos</option>
              <option value="Posto Araguaia">Araguaia</option>
              <option value="Posto Araguanã">Araguanã</option>
              <option value="Posto Arapoema">Arapoema</option>
              <option value="Posto Avenida">Avenida</option>
              <option value="Posto Barra do Ouro">Barra do Ouro</option>
              <option value="Posto Brito">Brito</option>
              <option value="Posto Buriti">Buriti</option>
              <option value="Posto Carajas">Carajás</option>
              <option value="Posto Cidade">Cidade</option>
              <option value="Posto Cidelândia">Cidelândia</option>
              <option value="Posto Coimbra PA">Coimbra PA</option>
              <option value="Posto Coimbra TO">Coimbra TO</option>
              <option value="Posto Confianca">Confiança</option>
              <option value="Posto Cristal">Cristal</option>
              <option value="Posto Esmeralda">Esmeralda</option>
              <option value="Posto Estreito">Estreito</option>
              <option value="Posto Estrela">Estrela</option>
              <option value="Posto Filadelfia">Filadelfia</option>
              <option value="Posto Formula 1">Formula 1</option>
              <option value="Posto Goias">Goias</option>
              <option value="Posto Goiatins">Goiatins</option>
              <option value="Posto Ipanema 8">Ipanema 8</option>
              <option value="Posto Ipanema Carmolandia">Ipanema Carmolandia</option>
              <option value="Posto Ipanema Filadelfia">Ipanema Filadelfia</option>
              <option value="Posto Jerusalem">Jerusalem</option>
              <option value="Posto JK">JK</option>
              <option value="Posto Lider">Lider</option>
              <option value="Posto Madrigal">Madrigal</option>
              <option value="Posto Minas Gerais">Minas Gerais</option>
              <option value="Posto Mundo Belo">Mundo Belo</option>
              <option value="Posto Ofir">Ofir</option>
              <option value="Posto Oliveira">Oliveira</option>
              <option value="Posto Padre Cicero">Padre Cicero</option>
              <option value="Posto Pantanal">Pantanal</option>
              <option value="Posto Petro Lider">Petro Lider</option>
              <option value="Posto Petro Posto">Petro Posto</option>
              <option value="Posto Ponto Certo">Ponto Certo</option>
              <option value="Posto Promoçao">Promoção</option>
              <option value="Posto Queiroz">Queiroz</option>
              <option value="Posto Rio Verde Filial">Rio Verde Filial</option>
              <option value="Posto Rio Verde Matriz">Rio Verde Matriz</option>
              <option value="Posto Rodeio Filial">Rodeio Filial</option>
              <option value="Posto Rodeio Matriz">Rodeio Matriz</option>
              <option value="Posto Rubaiyat">Rubaiyat</option>
              <option value="Posto Sampaio 2">Sampaio 2</option>
              <option value="Posto Santa Terezinha">Santa Terezinha</option>
              <option value="Posto Thawan">Thawan</option>
              <option value="Posto Tupi">Tupi</option>
              <option value="Posto Vale">Vale</option>
              <option value="Posto Wanderlandia">Wanderlandia</option>
              <option value="Posto Xodo">Xodo</option>
            </select>
            <label htmlFor="atendimento">Atendimento</label>
            <input
              type="text"
              id="atendimento"
              value={atendimento}
              onChange={event => setAtendimento(event.target.value)}
            />
            <label htmlFor="detalhes">Detalhes</label>
            <textarea
              id="detalhes"
              value={detalhes}
              onChange={event => setDetalhes(event.target.value)}
              cols={40} rows={5}
            />
            <label htmlFor="data">Data</label>
            <input
              id="data"
              type="date"
              value={data}
              onChange={event => setData(event.target.value)}
            />
            <label htmlFor="prioridade">Prioridade</label>
            <select
              id="prioridade"
              value={prioridade}
              onChange={event => setPrioridade(event.target.value)}
            >
              <option value="Normal">Normal</option>
              <option value="Alta">Alta</option>
              <option value="Urgente">Urgente</option>
            </select>
            <label htmlFor="situacao">Situação</label>
            <select
              id="situacao"
              value={situacao}
              onChange={event => setSituacao(event.target.value)}
            >
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
