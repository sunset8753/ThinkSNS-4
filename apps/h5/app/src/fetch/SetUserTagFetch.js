import { TAG_USER_SET, request } from '../util/api.js';

const SetUserTagFetch = (name, end) => request(TAG_USER_SET)
  .field('name', name)
  .end(end)
;

export default SetUserTagFetch;