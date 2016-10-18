<?php

namespace App\H5;

use App\H5\Service\Access;
use Symfony\Component\HttpFoundation\Request;

abstract class Controller
{
    protected $user;

    protected $request;

    /**
     * 初始化之前操作.
     *
     * @author Seven Du <lovevipdsw@outlook.com>
     * @homepage http://medz.cn
     */
    public function __construct()
    {
        $this->request = Request::createFromGlobals();

        $uid = isset($_SESSION['mid']) ? $_SESSION['mid'] : 0;

        if (
            $uid <= 0 &&
            method_exists($this, sprintf('%sAction', ACTION_NAME)) &&
            Access::make(MODULE_NAME, ACTION_NAME) === false
        ) {
            $this->error('请先登录！');
        } elseif ($uid > 0) {
            $this->user = Model\User::find($uid);
        }
    }

    /**
     * Show error message.
     *
     * @param string $message 错误消息
     * @param mixed  $data    携带数据
     *
     * @author Seven Du <lovevipdsw@outlook.com>
     * @homepage http://medz.cn
     */
    protected function error($message = 'error', $data = null)
    {
        $this->message(0, $data, $message);
    }

    /**
     * Show success message.
     *
     * @param string $message message
     * @param mixed  $data    datas
     *
     * @author Seven Du <lovevipdsw@outlook.com>
     * @homepage http://medz.cn
     */
    protected function success($message = 'success', $data = null)
    {
        $this->message(1, $data, $message);
    }

    /**
     * Show message.
     *
     * @param int    $status  status code
     * @param mixed  $data    datas
     * @param string $message message
     *
     * @author Seven Du <lovevipdsw@outlook.com>
     * @homepage http://medz.cn
     */
    protected function message($status, $data, $message = '')
    {
        ob_end_clean();

        header('Content-type:application/json;charset=utf-8');

        ob_start(function ($buffer, $mode) {
            if (extension_loaded('zlib') && function_exists('ob_gzhandler')) {
                return ob_gzhandler($buffer, $mode);
            }

            return $buffer;
        });

        echo json_encode(array(
            'status' => intval($status),
            'message' => strval($message),
            'data' => $data,
        ));

        ob_end_flush();

        exit;
    }
}
