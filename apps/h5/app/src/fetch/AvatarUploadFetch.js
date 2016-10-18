import request from 'superagent';
import buildURL from '../util/build-url.js';

const url = buildURL('file', 'uploadAvatar');

const AvatarUploadFetch = (file, fn) => {
  request
    .post(url)
    .attach(file.name, file)
    .end((error, response) => fn({error, response}))
  ;
};

export default AvatarUploadFetch; 