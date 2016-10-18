/**
 * 人人通 h5 必要信息配置文件
 */

// 根地址
const base = 'http://rrt.io';

// 路由白名单，不需登录就可以访问的页面路由地址
const publicRouters = [
  '/',
  '/login',
  '/login/dingtalk',
];

const config = {
  dist_url: base+"/storage/app/h5/",
  build_url: base+"/index.php?app=h5&mod=%controller%&act=%action%",
  api_url: base+'/api.php?mod=%controller%&act=%action%',
  title: "人人通",
  description: 'renrentong modern mobile web apps.',
  public_routers: publicRouters,
  dingtalk_appid: 'dingoapzvjar3m9zbxxvx1',
};


module.exports = config;
