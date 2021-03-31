import React, { createContext, useState } from 'react';
import GitHubService from 'services/api';


const GitHubRepositoriesContext = createContext({});

const GitHubRepositoriesProvider = (props) => {
  const { children } = props;
  const [perPage, setPerPage] = useState(30);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentValue, setCurrentValue] = useState(1);
  const [repositoriesList, setRepositoriesList] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [cacheList, setCacheList] = useState([]);
  const [cacheQuery, setCacheQuery] = useState('');

  const cache = () => {
    setCacheList([...repositoriesList]);
    setCacheQuery(`q=${currentValue}&page=${currentPage}`);
  }

  const getRepositories = (value, page) => {
    if (cacheQuery === `q=${value}&page=${page}`) {
      const newList = [...cacheList];
      cache();
      setRepositoriesList([...newList]);
      setCurrentPage(page);
      setCurrentValue(value);
    } else {
      cache();
      setFetching(true);
      GitHubService.getRepositories(value, page)
        .then(response => {
          setFetching(false);
          const {total_count, items} = response;
          setTotal(total_count);
          setRepositoriesList(items);
          setCurrentPage(page);
          setCurrentValue(value);
        })
        .catch(error => {
          setFetching(false);
          console.log("Error", error);
        })
    }
  }

  const clearResults = () => {
    cache();
    setRepositoriesList([]);
    setTotal(0);
    setCurrentPage(0);
    setCurrentValue('');
  }

  const { Provider } = GitHubRepositoriesContext;
  return <Provider value={{perPage, total, repositoriesList, isFetching, setPerPage, getRepositories, clearResults}}>{children}</Provider>
};

export {GitHubRepositoriesContext, GitHubRepositoriesProvider};
