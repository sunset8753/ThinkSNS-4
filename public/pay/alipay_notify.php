<?php

// require_once __DIR__.'/request.php';
// $target = '/index.php?app=public&mod=Account&act=alipayNotify';
// $url = explode(basename(__FILE__), $_SERVER['REQUEST_URI']);
// $url = dirname(dirname($url[0])).$target;
// request($url);

$_GET['app'] = 'public';
$_GET['mod'] = 'Account';
$_GET['act'] = 'alipayNotify';

require __DIR__.'/../index.php';
