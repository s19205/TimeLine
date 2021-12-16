import axios from './index';

export function GetImage(imageName) {
  return axios.get(`/image/${imageName}`);
};

export function AddImage(idEvent, image) {
  return axios.post(`/image/${idEvent}`, getFormData(image), { headers: { 'Content-Type': 'multipart/form-data' } });
};

const getFormData = object => Object.keys(object).reduce((formData, key) => {
  formData.append(key, object[key])
  return formData
}, new window.FormData())





