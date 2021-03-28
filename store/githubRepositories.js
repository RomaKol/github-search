import React, { createContext, useState } from 'react';
import GitHubService from 'services/api';


const GitHubRepositoriesContext = createContext({});

const GitHubRepositoriesProvider = (props) => {
  const { children } = props;
  const [perPage, setPerPage] = useState(30);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [repositoriesList, setRepositoriesList] = useState([]);

  const getRepositories = (page, items, values) => {
    setPage(page);
    GitHubService.getRepositories(page, items, values).then(reponse => {
      console.log("reponse", reponse)
    })
  }

  const { Provider } = GitHubRepositoriesContext;
  return <Provider value={{perPage, page, total, repositoriesList, getRepositories}}>{children}</Provider>
};

export {GitHubRepositoriesContext, GitHubRepositoriesProvider};
