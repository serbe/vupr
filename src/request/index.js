import axios from 'axios';
import auth from '@/auth';
import router from '@/router';

let baseURL = '/api/v1/';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:9090/api/v1/';
}

const client = axios.create({
  baseURL,
});

function request(options) {
  if (auth.isAuth()) {
    client.defaults.headers.common.Authorization = auth.getAuthHeader();
  }

  function onSuccess(response) {
    // console.debug('Request Successful!', response)
    // return response.data
    return response;
  }

  function onError(error) {
    // console.error('Request Failed:', error.config);
    if (error.response) {
      if (error.response.status === 401 && auth.isAuth()) {
        auth.logout();
        router.push({ name: 'login' });
      }
      // console.error('Status:', error.response.status);
      // console.error('Data:', error.response.data);
      // console.error('Headers:', error.response.headers);
    } else if (!error.response) {
      // auth.logout();
      router.push({ name: 'login' });
    }
    return Promise.reject(error.response || error.message);
  }

  return client(options)
    .then(onSuccess)
    .catch(onError);
}

export default request;
