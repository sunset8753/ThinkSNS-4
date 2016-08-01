<?php

// require_once __DIR__.'/request.php';
// $target = '/index.php?app=public&mod=Account&act=alipayReturn';
// $url = explode(basename(__FILE__), $_SERVER['REQUEST_URI']);
// $url = dirname(dirname($url[0])).$target;
// request($url);

$_GET['app'] = 'public';
$_GET['mod'] = 'Account';
$_GET['act'] = 'alipayReturn';

require __DIR__.'/../index.php';
