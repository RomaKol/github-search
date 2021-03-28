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
  getUsers(page, items, values) {
    return api.get(`/search/users?q=kol&per_page=10&page=1&order=asc`);
  }
}

export default new GitHubService();