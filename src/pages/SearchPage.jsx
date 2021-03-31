import React, { useContext, useEffect } from 'react';
import { GitHubRepositoriesContext } from 'store/githubRepositories';
import SearchForm from 'components/SearchForm';
import Pagination from 'components/Pagination';
import RepositoryCard from 'components/RepositoryCard';
import { compose } from 'recompose';
import withQueryParams from 'HOC/withQueryParams';
import { pushQueryParams, clearQueryParams } from 'services/history';

const SearchPage = (props) => {
  const { perPage, total, repositoriesList, isFetching, getRepositories, clearResults } = useContext(GitHubRepositoriesContext);
  const { queryParams } = props;
  const page = parseInt(queryParams.page) || 1;
  const text = queryParams.text;

  const handleTextChange = value => {
    pushQueryParams({ text: value, page: 1 });
    getRepositories(value, 1);
  }

  const handlePaginationChange = page => {
    pushQueryParams({ page });
    getRepositories(text, page);
  }

  const handleClear = () => {
    clearQueryParams();
    clearResults();
  }

  useEffect(() => {
    text && getRepositories(text, page);
  }, [])

  return (
    <div className="app-body">
      <div className="container">
        <SearchForm text={text} onSubmit={handleTextChange} onClear={handleClear} />
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
            onChange={handlePaginationChange}
          />
        )}
      </div>
    </div>
  );
}

export default compose(
  withQueryParams,
)(SearchPage);
