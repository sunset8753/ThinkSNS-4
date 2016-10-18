<?php

namespace App\H5\Service\Dingtalk;

use Httpful\Request;

class Connection
{
    protected $corpid;
    protected $corpsecret;

    public function __construct($corpid, $corpsecret)
    {
        $this->corpid = $corpid;
        $this->corpsecret = $corpsecret;
    }

    public function getAccessToken()
    {
        $url = sprintf('https://oapi.dingtalk.com/gettoken?corpid=%s&corpsecret=%s', urlencode($this->corpid), urlencode($this->corpsecret));

        $response = Request::get($url)->send();

        return $response->body->access_token;
    }

    public function getUserIdByUnionid($access_token, $unionid)
    {
        $url = sprintf('https://oapi.dingtalk.com/user/getUseridByUnionid?access_token=%s&unionid=%s', urlencode($access_token), urlencode($unionid));
        $response = Request::get($url)->send();

        return $response->body->userid;
    }

    public function getUserInfoByUserId($access_token, $userid)
    {
        $url = sprintf('https://oapi.dingtalk.com/user/get?access_token=%s&userid=%s', urlencode($access_token), urlencode($userid));
        $response = Request::get($url)->send();

        return $response->body;
    }
}
