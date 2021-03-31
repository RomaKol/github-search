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
  getRepositories(value, page) {
    return api.get(`/search/repositories?per_page=30&order=desc&sort=stars&q=${value}&page=${page}`);
  }
}

export default new GitHubService();