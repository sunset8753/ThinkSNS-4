<?php

namespace App\H5\Controller;

use App\H5\Controller;
use App\H5\Model;
use Pinyin;
use Ts\Models\Login as LoginModel;

class Login extends Controller
{
    protected $appid = 'dingoapzvjar3m9zbxxvx1';
    protected $appsecret = 'cRXPA8pCzg3F384T25ntO6zIUIbvcinDmQ2uw2mu7yFN-K8lhYc9bvaglKpgeFM9';

    protected $corpid = 'ding6acc72ca5da0a60635c2f4657eb6378f';
    protected $corpsecret = 'hH56h3Yw5jEc6TiEnvrhdYrgMGNeAMXgNW9byi6vSjtWNbea7olAbupYBrFfQ0GY';

    /**
     * Get login user data.
     *
     * @author Seven Du <lovevipdsw@outlook.com>
     * @homepage http://medz.cn
     */
    public function baseAction()
    {
        if ($this->user instanceof Model\User) {
            $this->getLoginToken();
        } else {
            $state = Model\DingtalkTokenState::createState();
            $this->error('error', $state);
        }
    }

    /**
     * 钉钉登录回调地址.
     *
     * @author Seven Du <lovevipdsw@outlook.com>
     * @homepage http://medz.cn
     */
    public function redirectAction()
    {
        $token = $this->request->query->get('code');
        $state_code = $this->request->query->get('state');
        $state = Model\DingtalkTokenState::find($state_code);

        if ($state) {
            $state->token = $token;
            $state->save();
            echo '<h1 style="text-align: center;">登录成功，请等待...</h1>';
        } else {
            echo '<h1 style="text-align: center;">登录失败，请刷新重试.</h1>';
        }
    }

    /**
     * 同步钉钉数据.
     * 方法很冗余，不想优化。（原因：今天不开森）
     *
     * @author Seven Du <lovevipdsw@outlook.com>
     * @homepage http://medz.cn
     */
    public function syncAction()
    {
        $state_code = $this->request->request->get('state');
        $state = Model\DingtalkTokenState::find($state_code);

        if (!$state || !$state->token) {
            $this->error('error');

            return null;
        }

        $oAuth = new \App\H5\Service\Dingtalk\OAuth($this->appid, $this->appsecret);
        $access_token = $oAuth->getAccessToken();
        $tmp_auth_code = $state->token;
        $persistent = $oAuth->getPersistentCode($access_token, $tmp_auth_code);

        $state->delete();

        $dingtalkAuth = Model\DingtalkAuth::byUnionId($persistent->unionid)->first();

        $dingtalkConnection = new \App\H5\Service\Dingtalk\Connection($this->corpid, $this->corpsecret);
        $access_token_2 = $dingtalkConnection->getAccessToken();

        if (!$dingtalkAuth) {
            $dingtalkAuth = new Model\DingtalkAuth();
            $dingtalkAuth->unionid = $persistent->unionid;
            $dingtalkAuth->openid = $persistent->openid;
            $dingtalkAuth->persistent_code = $persistent->persistent_code;

            $dingtalkAuth->dingtalk_user_id = $dingtalkConnection->getUserIdByUnionid($access_token_2, $dingtalkAuth->unionid);
        }

        $dingtalkUser = $dingtalkConnection->getUserInfoByUserId($access_token_2, $dingtalkAuth->dingtalk_user_id);

        if ($dingtalkUser->errcode != 0) {
            $this->message(2, null);

            return null;
        }

        if (!isset($dingtalkAuth->user_id)) {
            $user = Model\User::existent()
                ->byPhone($dingtalkUser->mobile)
                ->first();
        } else {
            $user = Model\User::find($dingtalkAuth->user_id);
        }

        $mode = false;
        if (!$user) {
            $user = new Model\User();
            $user->login_salt = rand(10000, 99999);
            $user->password = $dingtalkUser->userid;
            $user->sex = 0;
            $user->is_audit = 1;
            $user->is_active = 1;
            $user->is_init = 0;
            $user->identity = 1;
            $user->ctime = time();
            $user->domain = '';
            $user->province = 0;
            $user->city = 0;
            $user->area = 0;
            $user->is_del = 0;
            $user->last_post_time = 0;
            $user->is_fixed = 1;

            $mode = true;
        }

        $user->phone = $dingtalkUser->mobile;
        $user->uname = $dingtalkUser->name;
        $user->email = $dingtalkUser->email;
        $user->intro = $dingtalkUser->remark;
        $user->first_letter = Pinyin::getShortPinyin($dingtalkUser->name);
        $user->search_key = sprintf('%s %s', $dingtalkUser->name, Pinyin::getPinyin($dingtalkUser->name));

        $user->save();

        $dingtalkAuth->user_id = $user->user_id;
        // $dingtalkAuth->avatar = $dingtalkUser->avatar;
        $dingtalkAuth->save();

        model('Passport')->noPasswordLogin($dingtalkAuth->user_id, true);

        if ($mode === true) {
            $avatar = new \AvatarModel($user->user_id);
            $avatar->saveRemoteAvatar($dingtalkUser->avatar, $user->user_id);

            model('Credit')->setUserCredit($user->user_id, 'init_default');
            $registerConfig = model('Xdata')->get('admin_Config:register');
            $userGroup = empty($registerConfig['default_user_group']) ? C('DEFAULT_GROUP_ID') : $registerConfig['default_user_group'];
            model('UserGroupLink')->domoveUsergroup($user->user_id, implode(',', $userGroup));
        }

        $this->user = $user;
        $this->getLoginToken();
    }

    public function outAction()
    {
        model('Passport')->logoutLocal();
        $_SESSION['mid'] = $_SESSION['uid'] = 0;
        LoginModel::byType('dingtalk')->byUserId($this->user->user_id)->delete();
        $this->success('退出成功');
    }

    protected function getLoginToken()
    {
        $user = $this->user;

        $login = LoginModel::byType('dingtalk')
            ->byUserId($user->user_id)
            ->orderBy('login_id', 'desc')
            ->first();

        if (!$login) {
            $login = new LoginModel();
            $login->uid = $user->user_id;
            $login->type_uid = '';
            $login->type = 'dingtalk';
            $login->is_sync = 0;
            $login->oauth_token = getOAuthToken($user->user_id);
            $login->oauth_token_secret = getOAuthTokenSecret();
            $login->save();
        }

        $data = $user->toArray();
        $data['auth'] = $login->toArray();

        $this->success('success', $data);
    }
}
