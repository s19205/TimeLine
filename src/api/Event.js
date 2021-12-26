import axios from './index';

export function AddEvent(data) {
  return axios.post('/event', getFormData(data), { headers: { 'Content-Type': 'multipart/form-data' } });
};

export function GetEvents(params) {
  return axios.get('/event/all/', { params });
};

export function GetEvent(id) {
  return axios.get(`/event/${id}/`);
};

export function DeleteEvent(id) {
  return axios.delete(`/event/${id}/`);
};

export function UpdateEvent(id, data) {
  return axios.post(`/event/${id}/`, getFormData(data), { headers: { 'Content-Type': 'multipart/form-data' } });
};

const getFormData = object => Object.keys(object).reduce((formData, key) => {
  formData.append(key, object[key])
  return formData
}, new window.FormData())