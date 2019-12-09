import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./styles.css";

import icon from '../../assets/delete.png'

export default function Editar({ history, match}) {
  const [chamados, setChamados] = useState([]);
  const [postos, setPostos] = useState([]);

  useEffect(() => {
    async function carregarChamado() {
      const id = match.params.chamado;
      const response = await api.get(`/chamados/${id}`);

      setChamados(response.data);
    }
    carregarChamado();

    async function carregarPostos(){
      const response = await api.get('/postos');

      setPostos(response.data);
    }
    carregarPostos();
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

   function handleInputChangeDetalhes(  e ){
    setChamados({ ...chamados, detalhes: e.target.value });
   };

  function handleInputChangePrioridade(  e ){
    setChamados({ ...chamados, prioridade: e.target.value });
   };

   
  function handleInputChangeSituacao(  e ){
    setChamados({ ...chamados, situacao: e.target.value });
   };
  return (
    <>
    <div className="header"/>
      <div className="container-incluir">
        <h1>Editar Atendimento</h1>
        <div className="form-incluir">
          <form onSubmit={handleSubmit}>

            <label htmlFor="nomePosto">Posto </label>
            <select id="nomePosto" value={chamados.nomePosto} required onChange={handleInputChangeNomePosto} >
              {postos.map(posto => (
                <option value={posto.posto}>{posto.posto}</option>
              ))
              }
            </select>

            <label htmlFor="atendimento">Atendimento</label>
            <input type="text" id="atendimento" required value={chamados.atendimento} onChange={handleInputChangeAtendimento} cols={40} rows={7} />

            <label htmlFor="detalhes">Detalhes</label>
            <textarea id="detalhes" value={chamados.detalhes} onChange={handleInputChangeDetalhes} cols={40} rows={5} />

            <label htmlFor="data">Data</label>
            <input id="data" type="date" value={chamados.data} onChange={handleInputChangeData} />

            <label htmlFor="prioridade">Prioridade</label>
            <select id="prioridade" value={chamados.prioridade} onChange={handleInputChangePrioridade}>
              <option value="Normal">Normal</option>
              <option value="Alta">Alta</option>
              <option value="Urgente">Urgente</option>
            </select>

            <label htmlFor="situacao">Situação</label>
            <select id="situacao" value={chamados.situacao} onChange={handleInputChangeSituacao} >
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
