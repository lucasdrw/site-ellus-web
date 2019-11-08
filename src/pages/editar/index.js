import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";

import icon from '../../assets/delete.png'

export default function Editar({ history, match}) {
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    async function carregarChamado() {
      const id = match.params.chamado;
      const response = await api.get(`/chamados/${id}`);

      setChamados(response.data);
      
    }
    carregarChamado();
  }, []);


  async function handleSubmit(event) {
    event.preventDefault();
    
    const id = match.params.chamado;
    const {   nomePosto, atendimento, data, prioridade, situacao} = chamados;

    await api.put(
      `/chamados/${id}/editar`,
      {
        nomePosto,
        atendimento,
        data,
        prioridade,
        situacao
      },
    );

    history.push("/chamados");
  }

  async function excluir () {
    if (window.confirm('Excluir Registro?')){
    const id = match.params.chamado;
    await api.delete(`/chamados/${id}`); 
    history.push("/chamados");
    }
  };

  function handleInputChangeNomePosto(  e ){
   setChamados({ ...chamados, nomePosto: e.target.value });
  };


  function handleInputChangeData(  e ){
    setChamados({ ...chamados, data: e.target.value });
   };


  function handleInputChangeAtendimento(  e ){
    setChamados({ ...chamados, atendimento: e.target.value });
   };

   
  function handleInputChangePrioridade(  e ){
    setChamados({ ...chamados, prioridade: e.target.value });
   };

   
  function handleInputChangeSituacao(  e ){
    setChamados({ ...chamados, situacao: e.target.value });
   };
  return (
    <>
      <div className="container-incluir">
        <h1>Editar Atendimento</h1>
        <div className="form-incluir">
          <form onSubmit={handleSubmit}>
            <label htmlFor="nomePosto">Posto </label>
            <select
              id="nomePosto"
              value={chamados.nomePosto}
              required
              onChange={handleInputChangeNomePosto}
            >
              <option value="Ellus Default">Ellus Default</option>
              <option value="Posto Acaizal">Acaizal</option>
              <option value="Posto Antonio Marcos">Antonio Marcos</option>
              <option value="Posto Araguaia">Araguaia</option>
              <option value="Posto Araguana">Araguana</option>
              <option value="Posto Arapoema">Arapoema</option>
              <option value="Posto Avenida">Avenida</option>
              <option value="Posto Barra do Ouro">Barra do Ouro</option>
              <option value="Posto Brito">Brito</option>
              <option value="Posto Buriti">Buriti</option>
              <option value="Posto Carajas">Carajás</option>
              <option value="Posto Cidade">Cidade</option>
              <option value="Posto Cidelandia">Cidelandia</option>
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
            <textarea
              id="atendimento"
              required
              value={chamados.atendimento}
              onChange={handleInputChangeAtendimento}
              cols={40} rows={7}
            />
            <label htmlFor="data">Data</label>
            <input
              id="data"
              type="date"
              value={chamados.data}
              onChange={handleInputChangeData}
            />
            <label htmlFor="prioridade">Prioridade</label>
            <select
              id="prioridade"
              value={chamados.prioridade}
              onChange={handleInputChangePrioridade}
            >
              <option value="Normal">Normal</option>
              <option value="Alta">Alta</option>
              <option value="Urgente">Urgente</option>
            </select>
            <label htmlFor="situacao">Situação</label>
            <select
              id="situacao"
              value={chamados.situacao}
              onChange={handleInputChangeSituacao}
            >
              <option value="Aberto">Aberto</option>
              <option value="Concluido">Concluido</option>
              <option value="Aguardando resposta Cliente"> Aguardando resposta Cliente </option>
              <option value="Aguardando resposta Base">Aguardando resposta Base</option>
            </select>
            <button type="submit" className="btn"> Enviar </button>           
          </form>
          <div className="delete">
            <img onClick={excluir} src={icon} alt="delete" height="50px" />
          </div>         
        </div>
      </div>
    </>
  );
}
