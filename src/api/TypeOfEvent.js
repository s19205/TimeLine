import axios from './index';

export function GetEventTypes() {
  return axios.get('/eventtype/all');
};

export function GetEventType(id) {
  return axios.get(`/eventtype/${id}`);
};

export function AddEventType() {
  return axios.post('/eventtype/add');
};

export function UpdateEventType() {
  return axios.post('/eventtype/update');
};

