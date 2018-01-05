
// BaseApi.js

import axios from 'axios';

const api_url = process.env.backendUrl || "http://localhost:3001/";

const client = axios.create({
  baseURL: api_url
});

const request = function(options) {
  const onSuccess = function(response) {
    console.debug('Request Successful', response);
    return response.data;
  }

  const onError = function(error) {
    console.error('Request Failed', error.config);
    console.error('backend unavailable at: ', api_url)

    if(error.response) {
      console.error('Status: ', error.response.status);
      console.error('Data: ', error.response.data);
      console.error('Headers: ', error.response.headers);
    }
    else {
      console.error('Error Message: ', error.message);
    }
    return Promise.reject(error.response || error.message);
  }

  return client(options)
    .then(onSuccess)
    .catch(onError);
}

export default request;
