import axios from 'axios';

const apiAddress = 'http://localhost:3000/';
axios.defaults.baseURL = apiAddress;

axios.interceptors.request.use(
  config => {
      const token = window.localStorage.getItem('access_token');
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      config.headers['Content-Type'] = 'application/json';
      return config;
  },
  error => {
      Promise.reject(error)
  });

export default axios;