import axios from './index';

export function AddEvent(data) {
  return axios.post('/event', getFormData(data), { headers: { 'Content-Type': 'multipart/form-data' } });
};

export function GetEvent() {
  return axios.get('/event');
};

const getFormData = object => Object.keys(object).reduce((formData, key) => {
  formData.append(key, object[key])
  return formData
}, new window.FormData())