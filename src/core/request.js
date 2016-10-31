import 'whatwg-fetch';

const defaultFetchOptions = {
  // mode: 'no-cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const handleErrors = (response) => {
  if (!response.ok) {
    console.log('Error', response);
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
};

function fetchAPI(url, options) {
  return fetch(url, { ...defaultFetchOptions, ...options })
    .then(handleErrors);
}

export default {
  get: (url, options) => fetchAPI(url, { ...options, method: 'GET' }),
  post: (url, body, options) => fetchAPI(url, { ...options, body: JSON.stringify(body), method: 'POST' }),
  put: (url, body, options) => fetchAPI(url, { ...options, body: JSON.stringify(body), method: 'PUT' })
};
