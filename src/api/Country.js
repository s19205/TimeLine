import axios from './index';

export function GetAllCountries() {
  return axios.get('/country/all');
};