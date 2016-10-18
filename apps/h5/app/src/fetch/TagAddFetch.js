import { TAG_GET_ALL, request } from '../util/api.js';

const TagAddFetch = (end) => (request(TAG_GET_ALL).end(end));

export default TagAddFetch;