<?php

namespace App\H5\Model;

use Ts\Bases\Model;

class DingtalkAuth extends Model
{
    protected $table = 'dingtalk_auths';

    protected $primaryKey = 'dingtalk_auth_id';

    protected $softDelete = false;

    public function scopeByUnionId($query, $unionid)
    {
        return $query->where('unionid', $unionid);
    }

    public function scpoeByUserId($query, $user_id)
    {
        return $query->where('user_id', $user_id);
    }
}
