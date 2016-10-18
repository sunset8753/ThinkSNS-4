<?php


/**
 * 评论接口Api.
 */
class CommentApi extends Api
{
    /**
     * 添加评论接口.
     *
     * @author zhangwei
     * @date   2016-09-26
     * app 	   = Information
     * table   = information_list
     */
    public function addComment()
    {
        $data['app'] = 'Information';
        $data['table'] = 'information_list';
        $data['row_id'] = intval($this->data['row_id']);
        $data['app_uid'] = $this->mid;

        if (!$data['row_id'] || !$data['app_uid']) {
            $this->error('参数错误');
        }

        /*** 有回复 **/
        if ($this->data['to_comment_id']) {
            $data['to_comment_id'] = intval($this->data['to_comment_id']);
            $data['to_uid'] = intval($this->data['to_uid']);
        }
        $data['content'] = formatEmoji(true, $this->data['content']);
        $do = D('Comment')->addComment($data, true);

        if ($do) {
            $field = 'comment_id,row_id,uid,content,to_comment_id,to_uid,ctime';
            $info = D('comment')->field($field)->where(array('comment_id' => $do))->find();
            $info['ctime'] = friendlyDate($info['ctime']);
            $info['user_info']['uname'] = getUserName($info['uid']);
            $info['user_info']['avatar'] = getUserFace($info['uid']);
            $info['user_info']['avatar_url'] = getUserFace($info['uid'], 'm');
            if ($info['to_comment_id']) {
                $replyInfo = model('Comment')->getCommentInfo($info['to_comment_id'], false);
                //$replyInfos = '//@{uid='.$replyInfo['user_info']['uid'].'|'.$replyInfo['user_info']['uname'].'}：'.$replyInfo['content'];

                $info['content'] = parse_html($info['content']);
                $info['content'] = formatEmoji(false, $info['content']); // 解析emoji
            } else {
                $info['content'] = formatEmoji(false, $info['content']);
            }
            if ($info['to_uid']) {
                $info['to_uname'] = getUserName($info['to_uid']);
                $info['to_avatar'] = getUserFace($info['to_uid']);
            }
            //添加文章评论消息
            $pubId = D('information_list')->where(array('id' => $data['row_id']))->find();
            model('UserData')->setUid($pubId['author'])->updateKey('information_comment', 1);

            $return = array('msg' => '添加成功', 'status' => 1, 'data' => $info);
        } else {
            $return = array('msg' => '添加失败', 'status' => 0);
        }

        return $return;
//        exit(json_encode($return));
    }

    /**
     * 评论列表.
     *
     * @author zhangwei
     * @date   2016-09-26
     *
     * @return json
     */
    public function commentList()
    {
        $map['table'] = t($this->data['table']);
        $map['row_id'] = intval($this->data['row_id']);
        if (!$map['table'] || !$map['row_id']) {
            $this->error('参数错误');
        }
        if ($this->data['max_id']) {
            $maxid = $this->data['max_id'];
            $map['comment_id'] = array('lt', $maxid);
        }
        $field = 'comment_id,row_id,uid,content,to_comment_id,to_uid,ctime';
        $list = model('Comment')->field($field)->where($map)->order('ctime desc')->select();
        if (!count($list)) {
            return $this->showError('暂无相关数据');
        } else {
            foreach ($list as $key => &$value) {
                $value['ctime'] = friendlyDate($value['ctime']);
                $value['user_info']['uname'] = getUserName($value['uid']);
                $value['user_info']['avatar_url'] = getUserFace($value['uid']);
                if ($value['to_comment_id']) {
                    $replyInfo = model('Comment')->getCommentInfo($value['to_comment_id'], false);
                    //$replyInfos = '//@{uid='.$replyInfo['user_info']['uid'].'|'.$replyInfo['user_info']['uname'].'}：'.$replyInfo['content'];

                    $value['content'] = parse_html($value['content']);
                    $value['content'] = formatEmoji(false, $value['content']); // 解析emoji
                } else {
                    $value['content'] = formatEmoji(false, $value['content']);
                }
                if ($value['to_uid']) {
                    $value['to_uname'] = getUserName($value['to_uid']);
                    $value['to_avatar'] = getUserFace($value['to_uid']);
                }
            }

            return $this->showSuccess('', $list);
        }
    }
}
