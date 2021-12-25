import axios from './index';

export function AddEvent(data) {
  return axios.post('/event', getFormData(data), { headers: { 'Content-Type': 'multipart/form-data' } });
};

export function GetEvents(data) {
  return axios.get('/event/all/', { params: { year: 2021, month: 0 } });
};

export function GetEvent(id) {
  return axios.get('/event/${id}/');
};

export function UpdateEvent(data) {
  return axios.get('/event/edit/', getFormData(data), { headers: { 'Content-Type': 'multipart/form-data' } });
};

const getFormData = object => Object.keys(object).reduce((formData, key) => {
  formData.append(key, object[key])
  return formData
}, new window.FormData())