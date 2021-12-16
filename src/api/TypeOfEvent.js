import axios from './index';

export function GetEventTypes() {
  return axios.get('/eventtypes/all');
};

export function AddEventTypes() {
  return axios.post('/eventtypes/add');
};