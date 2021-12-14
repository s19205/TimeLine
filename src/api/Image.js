import axios from './index';

export function GetImage() {
  return axios.get('/image/{imageName}');
};

export function AddImage(image) {
  return axios.post('/image/{idEvent}', image);
};