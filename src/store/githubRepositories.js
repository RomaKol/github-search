import React, { createContext, useState } from 'react';
import GitHubService from 'services/api';


const GitHubRepositoriesContext = createContext({});

const GitHubRepositoriesProvider = (props) => {
  const { children } = props;
  const [perPage, setPerPage] = useState(30);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [repositoriesList, setRepositoriesList] = useState([]);
  const [isFetching, setFetching] = useState(false)

  const getRepositories = (page, items, values) => {
    setFetching(true);
    GitHubService.getRepositories(page, items, values)
      .then(response => {
        setFetching(false);
        const { total_count, items } = response;
        setTotal(total_count);
        setRepositoriesList(items);
      })
      .catch(error => {
        setFetching(false);
        console.log("Error", error);
      })
  }

  const clearResults = () => {
    setRepositoriesList([]);
    setPage(1);
    setTotal(0);
  }

  const { Provider } = GitHubRepositoriesContext;
  return <Provider value={{perPage, page, total, repositoriesList, isFetching, setPage, setPerPage, getRepositories, clearResults}}>{children}</Provider>
};

export {GitHubRepositoriesContext, GitHubRepositoriesProvider};
