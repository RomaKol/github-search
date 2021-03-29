import axios from 'axios';
import config, {
  handleRequest,
  handleResponse,
  handleResponseError
} from './initialConfig';

const api = axios.create({
  ...config,
  baseURL: process.env.REACT_APP_GITHUB_API_URL
});

api.interceptors.request.use(handleRequest);
api.interceptors.response.use(handleResponse, handleResponseError);

class GitHubService {
  getRepositories(page, items, values) {
    return api.get(`/search/repositories?q=kol&per_page=30&page=1&order=asc&sort=stars`);
  }
}

export default new GitHubService();