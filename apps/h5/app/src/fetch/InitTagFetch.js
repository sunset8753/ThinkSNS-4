import { TAG_GET_ALL, request } from '../util/api.js';

const InitTagFetch = (end) => request(TAG_GET_ALL).end(end);

export default InitTagFetch;