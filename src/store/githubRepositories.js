import React, { createContext, useState } from 'react';
import GitHubService from 'services/api';


const GitHubRepositoriesContext = createContext({});

const GitHubRepositoriesProvider = (props) => {
  const { children } = props;
  const [perPage, setPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [repositoriesList, setRepositoriesList] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [cache, setCache] = useState({});

  const updateCache = (key, value) => {
    const newCache = {
      ...cache,
      [key]: [...value]
    }
    const keys = Object.keys(cache);
    if(keys.length > 4) {
      delete newCache[keys[0]]
    }
    setCache(newCache);
  }

  const getRepositories = (value, page) => {
    if(cache[`q=${value}&page=${page}`]){
      setRepositoriesList(cache[`q=${value}&page=${page}`]);
    } else {
      setFetching(true);
      GitHubService.getRepositories(value, page)
        .then(response => {
          setFetching(false);
          const {total_count, items} = response;
          setTotal(total_count);
          setRepositoriesList(items);
          updateCache(`q=${value}&page=${page}`, items);
        })
        .catch(error => {
          setFetching(false);
          console.log("Error", error);
        })
    }
  }

  const clearResults = () => {
    setRepositoriesList([]);
    setTotal(0);
  }

  const { Provider } = GitHubRepositoriesContext;
  return <Provider value={{perPage, total, repositoriesList, isFetching, setPerPage, getRepositories, clearResults}}>{children}</Provider>
};

export {GitHubRepositoriesContext, GitHubRepositoriesProvider};
