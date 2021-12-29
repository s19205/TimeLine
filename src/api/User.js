import axios from './index';

export function RegisterUser(user) {
  return axios.post('/user/signup', user);
};

export function AutorizeUser(user) {
  return axios.post('/user/login', user);
};

export function GetUser() {
  return axios.get('/user/');
};

export function UpdateUserMail(email) {
  return axios.post('/user/email', email);
}

export function GetUserPassword() {
  return axios.get('/user/password');
}

export function UpdateUserPassword(password) {
  return axios.post('/user/password', password)
}

export function UpdateUser(user) {
  return axios.post('/user/', user);
};

export function DeleteUser() {
  return axios.delete('/user/');
};

export function refreshUser(data) {
  return axios.post('/user/refresh', data);
};


