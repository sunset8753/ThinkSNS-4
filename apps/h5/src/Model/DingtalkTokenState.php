<?php

namespace App\H5\Model;

use Ts\Bases\Model;

class DingtalkTokenState extends Model
{
    protected $table = 'dingtalk_token_states';

    protected $primaryKey = 'dingtalk_token_state_id';

    public static function createState()
    {
        $state_code = bin2hex(random_bytes(32));
        $state = self::find($state);

        if ($state) {
            return self::createState();
        }

        $state = new self();
        $state->dingtalk_token_state_id = $state_code;
        $state->save();

        return $state_code;
    }
}
