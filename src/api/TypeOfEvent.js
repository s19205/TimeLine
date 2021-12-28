import axios from './index';

export function GetEventTypes() {
  return axios.get('/eventtype/all');
};

export function GetEventType(id) {
  return axios.get(`/eventtype/${id}`);
};

export function AddEventType(data) {
  return axios.post('/eventtype/add', data);
};

export function UpdateEventType(data) {
  return axios.post('/eventtype/update', data);
};

export function DeleteEventType(id) {
  return axios.delete(`/eventtype/${id}`);
};