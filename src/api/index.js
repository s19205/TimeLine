import axios from 'axios';
import { handleTokenExpired } from '../utils/apiUtils';
const apiAddress = 'https://timelineapi.azurewebsites.net';
axios.defaults.baseURL = apiAddress;

axios.interceptors.request.use(
  config => {
		const token = window.localStorage.getItem('access_token');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		// config.headers['Content-Type'] = 'application/json';
		return config;
  },
  error => {
		Promise.reject(error);
  });


	axios.interceptors.response.use(
		(res) => {
			return Promise.resolve(res)
		},
		(err) => handleTokenExpired(err, axios)
	)

export default axios;