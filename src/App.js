import React from 'react';
import { GitHubRepositoriesProvider } from 'store/githubRepositories';
import SearchPage from 'pages/SearchPage';

function App() {
  return (
    <div className="App">
      <GitHubRepositoriesProvider>
        <SearchPage />
      </GitHubRepositoriesProvider>
    </div>
  );
}

export default App;
