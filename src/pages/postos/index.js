import React, { useEffect, useState }from "react";
import api from "../../services/api";
import "./styles.css";

export default function Postos() {

  const [nomePosto, setNomePosto] = useState("");
  const [postos, setPostos] = useState([]);

  useEffect(() => {
    async function carregarPostos(){
      const response = await api.get('/postos');

      setPostos(response.data);
    }

    carregarPostos();
  }, [])


  async function handleSubmit(event) {
    event.preventDefault();

    await api.post("/postos", {
      nomePosto
    });


  }
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
        value={nomePosto}
        onChange={event => setNomePosto(event.target.value)}
      />
      <button type="submit" className="btn">Adicionar</button>
      </form>
      </div>
      <div className="listar">
        <ul className="lista-posto">
          {postos.map(posto => (
            <li key={posto._id}>
              <p>{}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    </>
  );
}
