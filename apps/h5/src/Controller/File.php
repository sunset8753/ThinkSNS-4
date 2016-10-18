<?php

namespace App\H5\Controller;

// use App\H5\Base\Controller;
// use App\H5\Common;
use App\H5\Controller;
use AvatarModel;

/**
 * 文件相关控制器.
 *
 * @author Seven Du <lovevipdsw@outlook.com>
 **/
class File extends Controller
{
    // public function uploadAction()
    // {
    //     $info = Common::uploadFile('image', 'feed_image', 'gif', 'png', 'jpg', 'jpeg');

    //     if (count($info['info']) <= 0) {
    //         $this->error('没有上传图片', true);

    //     /* 状态 */
    //     } elseif ($info['status'] == false) {
    //         $this->error('上传失败', true);
    //     }

    //     $this->trace('attach_id', $info['info'][0]['attach_id']);
    //     $this->success('上传成功', true);
    // }

    public function uploadAvatarAction()
    {
        $avatar = new AvatarModel($this->user->user_id);
        $response = $avatar->uploadAvatars(true);

        if ($response['status'] != 1) {
            $this->error($response['msg']);
        }

        $this->saveAvatar($avatar, $response['data']);
    }

    protected function saveAvatar(AvatarModel $avatar, array $data)
    {
        $scaling = 5;
        $data['w'] = $data['x2'] = $data['picwidth'] * $scaling;
        $data['h'] = $data['y2'] = $data['picheight'] * $scaling;
        $data['x1'] = $data['y1'] = 0;

        $response = $avatar->dosave($data, true);

        if ($response['status'] != 1) {
            $this->error($response['info']);
        }

        $this->success('success', $response['data']);
    }
} // END class File extends Controller
