<?php

namespace App\H5\Service\Dingtalk;

use Httpful\Request;

class OAuth
{
    protected $appid;
    protected $appsecret;

    public function __construct($appid, $appsecret)
    {
        $this->appid = $appid;
        $this->appsecret = $appsecret;
    }

    public function getAccessToken()
    {
        $url = sprintf('https://oapi.dingtalk.com/sns/gettoken?appid=%s&appsecret=%s', urlencode($this->appid), urlencode($this->appsecret));
        $response = Request::get($url)->send();

        return $response->body->access_token;
    }

    public function getPersistentCode($access_token, $tmp_auth_code)
    {
        $url = sprintf('https://oapi.dingtalk.com/sns/get_persistent_code?access_token=%s', urlencode($access_token));
        $body = json_encode(array(
            'tmp_auth_code' => $tmp_auth_code,
        ));
        $response = Request::post($url)
            ->body($body)
            ->sendsJson()
            ->send();

        return $response->body;
    }
}
