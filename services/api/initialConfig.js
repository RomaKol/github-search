import logger from 'services/logger';

var inintialConfig = {
  timeout: 10000,
  validateStatus: status => {
    return status;
  },
};

function handleRequest(config) {
  return config;
}

function handleResponse(response) {
  const { message } = response.data;

  if (response.status < 400) {
    return response.data;
  }

  return Promise.reject({
    type: 'ERROR',
    data: message || 'Someting went wrong'
  })
}

const handleResponseError = error => {
  logger(error);

  return Promise.reject({
    type: 'ERROR',
    data: error.message
  })
}

export {
  inintialConfig as default,
  handleRequest,
  handleResponse,
  handleResponseError,
}