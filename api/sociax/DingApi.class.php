<?php

use Ts\Models\User as UserModel;
use Ts\Models\Login;

/**
 *   钉钉服务接口类
 *   2016/9/28.
 */
class DingApi extends Api
{
    public static $code;
    public static $access_token;
    public static $userid;

    public function __construct()
    {
        if ($_REQUEST['code']) {
            self::$code = $_REQUEST['code'];
            self::$access_token = self::get_sns_access_token()->access_token;
            $pcode = self::get_persistent_code(self::$access_token, self::$code);
            self::$userid = dingtalk_get_userid_unionid($pcode['unionid'])->userid;
        } else {
            $this->error('无效的CODE');
        }
    }

    /**
     * 钉钉授权登陆接口.
     *
     * @author zhangwei
     * @date   2016-10-08
     *
     * @return json
     */
    public function init()
    {
        $userInfo = dingtalk_get_user_info(self::$userid); //获取授权用户信息
        $uInfo = UserModel::where('userid', self::$userid)->first();
        if ($uInfo) {
            $uInfo->phone = $userInfo->mobile;
            $uInfo->avatar = $userInfo->avatar;
            $uInfo->email = $userInfo->email;
            $uInfo->intro = $userInfo->remark;
            $uInfo->department_id = implode(',', $userInfo->department);
            $uInfo->save();
            $avatar = new \AvatarModel($uInfo->uid);
            $avatar->saveRemoteAvatar($userInfo->avatar, $uInfo->uid);
            if ($log = Login::where('uid', $uInfo->uid)->where('type', 'location')->first()) {
                $login_data['oauth_token'] = $log->oauth_token;
                $login_data['oauth_token_secret'] = $log->oauth_token_secret;
                $login_data['uid'] = $uInfo->uid;
            } else {
                $login_data['oauth_token'] = getOAuthToken($uInfo->uid);
                $login_data['oauth_token_secret'] = getOAuthTokenSecret();
                $login_data['uid'] = $uInfo->uid;
                $savedata['type'] = 'location';
                $savedata = array_merge($savedata, $login_data);
                D('login')->add($savedata);
            }
            $login_data['status'] = 1;

            return $login_data;
        } else {
            $depList = dingtalk_get_dept_list()->department;
            $depArr = getSubByKey($depList, 'id');
            $isDep = count(array_intersect($userInfo->department, $depArr));
            if ($isDep > 0) {
                //是此公司的员工,同步用户数据到TS
                $this->sign_in($userInfo);
            }
        }
    }

    public static function get_user_info()
    {
        $dep = dingtalk_get_dept_list()->department;
        $arr = getSubByKey($dep, 'id');
        print_r($arr);
    }

    /**
     * 同步钉钉数据.
     *
     * @author zhangwei
     * @date   2016-10-08
     *
     * @return json
     */
    public function sign_in($data)
    {
        $user = new UserModel();
        $user->phone = $data->mobile;
        $user->uname = $data->name;
        $user->email = $data->email;
        $user->intro = $data->remark;
        $user->openid = $data->openId;
        $user->userid = $data->userid;
        $user->avatar = $data->avatar;
        $user->login_salt = rand(10000, 99999);
        $user->password = $data->userid;
        $user->sex = 0;
        $user->is_audit = 1;
        $user->is_active = 1;
        $user->is_init = 1;
        $user->identity = 1;
        $user->ctime = time();
        $user->domain = '';
        $user->province = 0;
        $user->city = 0;
        $user->area = 0;
        $user->is_del = 0;
        $user->last_post_time = 0;
        $user->is_fixed = 1;
        $user->department_id = implode(',', $data->department);
        $user->first_letter = Pinyin::getShortPinyin($data->name);
        $user->search_key = sprintf('%s %s', $data->name, Pinyin::getPinyin($data->name));

        $user->save();

        if (!$user->uid) {
            return array(
                'status' => 0,
                'msg' => '同步钉钉数据失败',
            );
        }
        //保存头像
        $avatar = new \AvatarModel($user->uid);
        $avatar->saveRemoteAvatar($data->avatar, $user->uid);

        /* 添加默认用户组 */
        model('Credit')->setUserCredit($user->uid, 'init_default');
        $registerConfig = model('Xdata')->get('admin_Config:register');
        $userGroup = empty($registerConfig['default_user_group']) ? C('DEFAULT_GROUP_ID') : $registerConfig['default_user_group'];
        model('UserGroupLink')->domoveUsergroup($user->uid, implode(',', $userGroup));
        if ($log = Login::where('uid', $user->uid)->where('type', 'location')->first()) {
            $login_info['oauth_token'] = $log->oauth_token;
            $login_info['oauth_token_secret'] = $log->oauth_token_secret;
            $login_info['uid'] = $user->uid;
        } else {
            $login_info['oauth_token'] = getOAuthToken($user->uid);
            $login_info['oauth_token_secret'] = getOAuthTokenSecret();
            $login_info['uid'] = $user->uid;
            $savedata['type'] = 'location';
            $savedata = array_merge($savedata, $login_info);
            D('login')->add($savedata);
        }
        $login_info['status'] = 1;

        $this->success($login_info);
    }

    /**
     * 获取accesstoken，
     * 此处获取的token有效期为2小时，
     * 有效期内重复获取，返回相同值，并自动续期
     *
     * @author zhangwei
     * @date   2016-09-30
     *
     * @return obj
     */
    private static function get_sns_access_token()
    {
        $params = array(
            'appid' => DINGTALK_SNS_APPID,
            'appsecret' => DINGTALK_SNS_APPSECRET,
        );

        return DingTalk::get_dingtalk_api_response('/sns/gettoken', $params);
    }

    /**
     * 获取用户授权的持久授权码
     *
     * @author zhangwei
     * @date   2016-09-30
     *
     * @param string $token 开放应用的token
     * @param string $code  用户授权给钉钉开放应用的临时授权码
     *
     * @return array
     */
    public static function get_persistent_code($token, $code)
    {
        //$persCode =
        $url = '/sns/get_persistent_code?access_token='.$token;
        $params = array(
            'tmp_auth_code' => $code,
        );

        return self::get_api_response($url, json_encode($params), 'json');
    }

    /**
     * 获取用户授权的SNS_TOKEN.
     *
     * @author zhangwei
     * @date   2016-09-30
     *
     * @param string $token  开放应用的token
     * @param string $openid 用户的openid
     * @param string $code   用户授权给钉钉开放应用的持久授权码
     *
     * @return array
     */
    public static function get_sns_token($token, $openid, $code)
    {
        $snsToken = S($openid.'sns_token');
        if (!$snsToken) {
            $url = '/sns/get_sns_token?access_token='.$token;
            $params = array(
                'openid' => $openid,
                'persistent_code' => $code,
            );
            $sns_token = self::get_api_response($url, json_encode($params), 'json');
            S($openid.'sns_token', $sns_token['sns_token'], 7140);

            return $sns_token;
        } else {
            return $snsToken;
        }
    }

    /**
     * 获取用户授权的个人信息.
     *
     * @author zhangwei
     * @date   2016-09-30
     *
     * @param string $token 户授权的SNS_TOKEN
     *
     * @return array
     */
    public static function get_sns_userinfo($token)
    {
        $url = '/sns/getuserinfo?sns_token='.$token;
        $params = [];
        $sns_token = self::get_api_response($url, $params);

        return $sns_token;
    }

    /**
     * 调用钉钉业务API并返回正确结果.
     *
     * @param type $url  API路径，无需域名前缀，如：/user/get
     * @param type $post 是否以post方式提交，0:否(默认) 1:是
     *
     * @return array 解析后的数组
     */
    public static function get_api_response($url, array $params, $type = null, $post = 0)
    {
        $url = DINGTALK_API_URL.$url;
        $http_result = curl_http_request($url, $post, $params, null, $type);
        $result = json_decode($http_result, true);
        if ($result['errcode'] != 0) {
            die_error(DINGTALK_API_ERROR, $result['errmsg']);
        }

        return $result;
    }
}
