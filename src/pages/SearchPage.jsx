import React, { useContext } from 'react';
import { GitHubRepositoriesContext } from 'store/githubRepositories';
import SearchForm from 'components/SearchForm';
import Pagination from 'components/Pagination';
import RepositoryCard from 'components/RepositoryCard';

const SearchPage = () => {
  const { perPage, page, total, repositoriesList, isFetching, setPage, getRepositories, clearResults } = useContext(GitHubRepositoriesContext);

  return (
    <div className="app-body">
      <div className="container">
        <SearchForm onSubmit={getRepositories} onClear={clearResults} />
        {
          isFetching &&
          <p>Loading ...</p>
        }
        <div>
          <p>{total} repository results</p>
        </div>
        {
          !isFetching &&
          repositoriesList.length > 0 &&
          repositoriesList.map((repo) => {
            return (<RepositoryCard key={repo.id} repository={repo} />)
          })
        }
        {total > perPage && (
          <Pagination
            page={page}
            perPage={perPage}
            total={total}
            onChange={setPage}
          />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
