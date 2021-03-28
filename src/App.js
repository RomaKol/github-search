import React from 'react';
import { GitHubRepositoriesProvider } from 'store/githubRepositories';

function App() {
  return (
    <div className="App">
      <GitHubRepositoriesProvider>

      </GitHubRepositoriesProvider>
    </div>
  );
}

export default App;
