import axios from './index';

export function GetAllCountries() {
  return axios.get('/user/signup');
};

export function RegisterUser(user) {
  return axios.post('/user/signup', user);
};

export function AutorizeUser(user) {
  return axios.post('/user/login', user);
};

export function GetUser() {
  return axios.get('/user/');
};

export function UpdateUser(user) {
  return axios.post('/user/', user);
};

export function DeleteUser() {
  return axios.delete('/user/');
};


