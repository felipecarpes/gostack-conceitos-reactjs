import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const repo = await api.post('repositories', {
      title: "Repositório do Felipe",
      url: "https://github.com/felipecarpes",
      techs: ["node", "react"]
    })
    setRepositories([...repositories, repo.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const ListRepos = repositories.filter(repo => repo.id !== id)

    setRepositories(ListRepos)
  }

  return [
    <h1>Repositórios do GitHub</h1>,
    <div className="all-body">
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button key={repo.title} onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  ]
}

export default App;
