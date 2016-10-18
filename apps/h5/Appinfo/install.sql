--
-- 活动分类
-- ts_event_cate 结构
--
-- DROP TABLE IF EXISTS `ts_event_cate`;
-- CREATE TABLE IF NOT EXISTS `ts_event_cate` (
--   `cid`   int(10)      unsigned NOT NULL AUTO_INCREMENT COMMENT '分类id'  ,
--   `name`  varchar(255)          NOT NULL                COMMENT '分类名称',
--   `leval` int(10)      unsigned NOT NULL DEFAULT 0      COMMENT '排序等级',
--   `del`   enum('0', '1')        NOT NULL DEFAULT '0'    COMMENT '删除标记',
--   PRIMARY KEY (`cid`)                                                     ,
--   INDEX `idx_name` (`name`)                                               ,
--   KEY `idx_del` (`del`)
-- ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='活动分类' AUTO_INCREMENT=1 ;


DROP TABLE IF EXISTS `ts_dingtalk_token_states`;
CREATE TABLE IF NOT EXISTS `ts_dingtalk_token_states` (
    `dingtalk_token_state_id` varchar(255) NOT NULL COMMENT '状态码',
    `token` varchar(255) NULL DEFAULT NULL COMMENT '令牌',
    `is_use` tinyint(1) NULL DEFAULT 0 COMMENT '是否使用',
    `created_at` timestamp on update CURRENT_TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

    PRIMARY KEY (`dingtalk_token_state_id`),
    INDEX `use` (`is_use`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='state和token对应记录' AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `ts_dingtalk_auths`;
CREATE TABLE IF NOT  EXISTS `ts_dingtalk_auths` (
    `dingtalk_auth_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `unionid` varchar(255) NOT NULL COMMENT '钉钉平台唯一id',
    `openid` varchar(255) NOT NULL COMMENT '用户在当前开放应用内的唯一标识',
    `persistent_code` varchar(255)  NOT NULL COMMENT '用户给开放应用授权的持久授权码，此码目前无过期时间',
    `user_id` int(11)  NOT NULL COMMENT '本站用户id',
    `dingtalk_user_id` varchar(255) NOT NULL COMMENT '钉钉平台应用用户id',
    `avatar` varchar(255) NULL DEFAULT '' COMMENT '暂存的用户头像地址',
    `created_at` timestamp on update CURRENT_TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

    PRIMARY KEY (`dingtalk_auth_id`),
    INDEX `unionid` (`unionid`),
    INDEX `user` (`user_id`),
    INDEX `dingtalk_user_id` (`dingtalk_user_id`)

) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='钉钉用户与本地用户关联表' AUTO_INCREMENT=1 ;
