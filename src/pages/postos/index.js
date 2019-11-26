import React, { useEffect, useState }from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

import icon from '../../assets/delete.png';

export default function Postos({history, match}) {

  const [posto, setPosto] = useState("");
  const [postos, setPostos] = useState([]);

  useEffect(() => {
    async function carregarPostos(){
      const response = await api.get('/postos');

      setPostos(response.data);
    }

    carregarPostos();
  }, [postos])


  async function handleSubmit(event) {
    event.preventDefault();

    await api.post("/postos", {
      posto
    });
  }

  async function excluir (id) {
    //if (window.confirm('Excluir Registro?')){
    //id = match.params.chamado;
    //await api.delete(`/chamados/${id}`); 
    //history.push("/chamados");
    //}
    console.log(id)
  };

  return (
    <>
    <div className="header" />
    <div className="container-postos">
    <h1>Gerenciar Postos</h1>
    <div className="content-config">
      <div className="incluir">
      <form onSubmit={handleSubmit}>
      <label htmlFor="posto">Posto </label>
      <input
        type="text"
        id="posto"
        value={posto}
        onChange={event => setPosto(event.target.value)}
      />
      <button type="submit" className="btn">Adicionar</button>
      </form>
      </div>
      <div className="listar">
        <ul className="lista-posto">
          {postos.map(posto => ( 
              <li key={posto._id}>
                {posto.posto}
                <img onClick={excluir} src={icon} alt="delete" height="28px"/>
              </li>  
          ))}
        </ul>
      </div>
    </div>
    </div>
    </>
  );
}
