import axios from './index';

export function AddEvent(event) {
  return axios.post('/event', event);
};

export function GetEvent() {
  return axios.get('/event');
};