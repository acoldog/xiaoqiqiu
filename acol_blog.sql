-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- 主机: localhost:3306
-- 生成日期: 2014 年 05 月 06 日 15:51
-- 服务器版本: 5.1.73
-- PHP 版本: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `acol_blog`
--

-- --------------------------------------------------------

--
-- 表的结构 `ab_about`
--

CREATE TABLE IF NOT EXISTS `ab_about` (
  `content` text NOT NULL,
  `update_time` int(10) NOT NULL,
  `update_ip` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `ab_comment`
--

CREATE TABLE IF NOT EXISTS `ab_comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(250) NOT NULL,
  `comment_user` varchar(10) NOT NULL COMMENT '留言者',
  `link` varchar(255) NOT NULL COMMENT '留言者链接',
  `comment_id` int(11) NOT NULL DEFAULT '0' COMMENT '对评论的的评论，ID为评论的对象评论的ID',
  `diary_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属文章ID',
  `sort` varchar(10) NOT NULL COMMENT '评论类型：比如say,photo,share',
  `sort_id` int(11) NOT NULL DEFAULT '0',
  `state` tinyint(1) NOT NULL DEFAULT '1',
  `time` datetime NOT NULL,
  `ip` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sort` (`sort`),
  KEY `sort_id` (`sort_id`),
  KEY `diary_id` (`diary_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=79 ;

-- --------------------------------------------------------

--
-- 表的结构 `ab_comment_new`
--

CREATE TABLE IF NOT EXISTS `ab_comment_new` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(250) NOT NULL,
  `comment_user` varchar(10) NOT NULL COMMENT '留言者',
  `link` varchar(255) NOT NULL COMMENT '留言者链接',
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '父id,对评论的的评论，ID为评论的对象评论的ID',
  `bid` int(10) NOT NULL DEFAULT '0' COMMENT '楼id',
  `diary_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '所属文章ID',
  `sort` varchar(10) NOT NULL COMMENT '评论类型：比如say,photo,share',
  `sort_id` int(11) NOT NULL DEFAULT '0',
  `state` tinyint(1) NOT NULL DEFAULT '1',
  `time` datetime NOT NULL,
  `ip` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sort` (`sort`),
  KEY `sort_id` (`sort_id`),
  KEY `diary_id` (`diary_id`),
  KEY `bid` (`bid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=67 ;

-- --------------------------------------------------------

--
-- 表的结构 `ab_diary`
--

CREATE TABLE IF NOT EXISTS `ab_diary` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL COMMENT '发布者',
  `title` varchar(50) NOT NULL,
  `content` longtext NOT NULL,
  `sort_id` int(11) NOT NULL DEFAULT '0',
  `time` int(10) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `cmt_num` int(11) NOT NULL DEFAULT '0' COMMENT '评论数，评论的时候更新它',
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  KEY `time` (`time`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=181 ;

-- --------------------------------------------------------

--
-- 表的结构 `ab_diary_sort`
--

CREATE TABLE IF NOT EXISTS `ab_diary_sort` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '分类中文章的数量',
  `type` varchar(50) NOT NULL DEFAULT 'diy' COMMENT '分类类型：diy-自定义，time-日期',
  `username` varchar(25) NOT NULL COMMENT '用户名',
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  KEY `username` (`username`),
  KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=54 ;

-- --------------------------------------------------------

--
-- 表的结构 `ab_friends`
--

CREATE TABLE IF NOT EXISTS `ab_friends` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `name` varchar(16) NOT NULL,
  `src` varchar(255) NOT NULL,
  `update_time` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`update_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='友情链接' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ab_keyword`
--

CREATE TABLE IF NOT EXISTS `ab_keyword` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `word` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ab_photo`
--

CREATE TABLE IF NOT EXISTS `ab_photo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `introduce` text NOT NULL,
  `src` varchar(255) NOT NULL DEFAULT '0',
  `sort_id` int(11) NOT NULL,
  `time` int(10) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `username` varchar(25) NOT NULL COMMENT '发布者',
  `diary_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  KEY `diary_id` (`diary_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=735 ;

-- --------------------------------------------------------

--
-- 表的结构 `ab_photo_sort`
--

CREATE TABLE IF NOT EXISTS `ab_photo_sort` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ab_say`
--

CREATE TABLE IF NOT EXISTS `ab_say` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(250) NOT NULL,
  `sort_id` int(11) NOT NULL,
  `time` int(10) NOT NULL,
  `ip` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

-- --------------------------------------------------------

--
-- 表的结构 `ab_say_sort`
--

CREATE TABLE IF NOT EXISTS `ab_say_sort` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ab_share`
--

CREATE TABLE IF NOT EXISTS `ab_share` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `src` varchar(255) NOT NULL,
  `introduce` text NOT NULL,
  `time` int(10) NOT NULL,
  `ip` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ab_user`
--

CREATE TABLE IF NOT EXISTS `ab_user` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(8) NOT NULL,
  `nickname` varchar(50) NOT NULL COMMENT '用户昵称',
  `password` varchar(40) NOT NULL,
  `desc` varchar(50) NOT NULL DEFAULT '这个人的介绍' COMMENT '首页标题简介',
  `face` varchar(255) NOT NULL DEFAULT 'http://xiaoqiqiu.com/view/img/1.jpg' COMMENT '头像地址',
  `tqq` text NOT NULL COMMENT '腾讯微博接入代码',
  `weibo` text NOT NULL COMMENT '新浪微博接入',
  `xiami` text NOT NULL,
  `notice` varchar(255) NOT NULL COMMENT '公告',
  `login_time` int(10) NOT NULL,
  `login_ip` varchar(15) NOT NULL,
  `reg_time` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否激活:0-否',
  `version` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '0-旧版，1-新版',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `nickname` (`nickname`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=33 ;

-- --------------------------------------------------------

--
-- 表的结构 `cmt_cron`
--

CREATE TABLE IF NOT EXISTS `cmt_cron` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `oid` int(10) NOT NULL COMMENT '最后遍历到的comment_id',
  `plan` tinyint(1) NOT NULL COMMENT '单次是否完成指定计划的数量0-否，1-是',
  `time` datetime NOT NULL COMMENT '执行时间',
  PRIMARY KEY (`id`),
  KEY `oid` (`oid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=86 ;

-- --------------------------------------------------------

--
-- 表的结构 `update_sort_cron`
--

CREATE TABLE IF NOT EXISTS `update_sort_cron` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `oid` int(10) NOT NULL COMMENT '最后遍历到的comment_id',
  `plan` tinyint(1) NOT NULL COMMENT '单次是否完成指定计划的数量0-否，1-是',
  `time` datetime NOT NULL COMMENT '执行时间',
  PRIMARY KEY (`id`),
  KEY `oid` (`oid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21080 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
