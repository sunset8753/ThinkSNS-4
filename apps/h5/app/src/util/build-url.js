import { build_url } from '../../config.js';

const BuildURL = (controller, action, param) => {

  let url = build_url;

  url = url
    .replace(/\%controller\%/g, controller)
    .replace(/\%action\%/g, action)
  ;
  let arr  = url.split('?');
  let base = arr[0];

  if (typeof param != 'object') {
    param = {};
  }
  if (typeof arr[1] != 'undefined') {
    arr = arr[1].split('&');
    arr.forEach((value) => {
      value = value.split('=');
      param[value[0]] = value[1];
    });
  }

  url = '';
  for (let i in param) {
    url += i + '=' + param[i] + '&';
  }

  url = base + '?' + url;

  return url.slice(0, url.length - 1);
};

export default BuildURL;