import superagent from 'superagent';
import { api_url } from '../../config.js';
import AuthStore from '../store/AuthenticationStore.js';

export const createApi = (api) => {
  let url = api_url;
  const [controller, action] = api.split('/');

  url = url
    .replace(/\%controller\%/g, controller)
    .replace(/\%action\%/g, action)
  ;

  return url;
};

export const request = (api) => {
  const state = AuthStore.getState()
  const request = superagent.post(api);

  if (state === false) {
    return request;
  }

  const { user: { auth: { oauth_token, oauth_token_secret } } } = state;

  return request
    .field('oauth_token', oauth_token)
    .field('oauth_token_secret', oauth_token_secret);
};

// 按照分类获取tag.
export const TAG_GET_ALL = createApi('FindPeople/get_user_tags');

// 获取我的标签
export const TAG_GET_USER_TAG = createApi('Tag/tag_my');

// 设置用户tag
export const TAG_USER_SET = createApi('Tag/addTag');

// 用户推荐关注／推荐好友
export const USER_GET_RECOMMEND = createApi('FindPeople/search_user');

// 搜索用户
export const USER_SEARCH = USER_GET_RECOMMEND;

// 关注一个用户
export const USER_FOLLOW = createApi('User/follow');

// 取消关注一个用户
export const USER_UNFOLLOW = createApi('User/unfollow');

// 全站公开分享
export const WEIBO_PUBLIC_TIMELINE = createApi('Weibo/public_timeline');