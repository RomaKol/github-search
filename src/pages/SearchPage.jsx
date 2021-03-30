import React, { useContext } from 'react';
import { GitHubRepositoriesContext } from 'store/githubRepositories';
import SearchForm from 'components/SearchForm';
import Pagination from 'components/Pagination';
import RepositoryCard from 'components/RepositoryCard';
import { compose } from 'recompose';
import withQueryParams from 'HOC/withQueryParams';

const SearchPage = () => {
  const { perPage, page, total, repositoriesList, isFetching, setPage, getRepositories, clearResults } = useContext(GitHubRepositoriesContext);

  return (
    <div className="app-body">
      <div className="container">
        <SearchForm onSubmit={getRepositories} onClear={clearResults} />
        <div className="section-title">{total} repository results</div>
        {
          isFetching &&
          <p>Loading ...</p>
        }
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

export default compose(
  withQueryParams,
)(SearchPage);
