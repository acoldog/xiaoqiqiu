-- phpMyAdmin SQL Dump
-- version 3.1.3.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2011 年 04 月 22 日 03:32
-- 服务器版本: 5.1.23
-- PHP 版本: 5.2.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `u117577_blog`
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

--
-- 导出表中的数据 `ab_about`
--


-- --------------------------------------------------------

--
-- 表的结构 `ab_comment`
--

CREATE TABLE IF NOT EXISTS `ab_comment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(250) NOT NULL,
  `comment_user` varchar(10) NOT NULL COMMENT '留言者',
  `comment_id` int(11) NOT NULL COMMENT '对评论的的评论，ID为评论的对象评论的ID',
  `sort` varchar(10) NOT NULL COMMENT '评论类型：比如say,photo,share',
  `sort_id` int(11) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `time` int(10) NOT NULL,
  `ip` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sort` (`sort`),
  KEY `sort_id` (`sort_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 导出表中的数据 `ab_comment`
--

INSERT INTO `ab_comment` (`id`, `comment`, `comment_user`, `comment_id`, `sort`, `sort_id`, `state`, `time`, `ip`) VALUES
(1, '啊啊啊啊', '游客1', 0, 'say', 3, 1, 1, '1'),
(2, '啊啊啊啊', '游客2', 0, 'say', 3, 1, 1, '1'),
(3, '啊啊啊啊', '游客3', 0, 'say', 3, 1, 1, '1'),
(4, '啊啊啊啊', '游客4', 0, 'say', 3, 1, 1, '1');

-- --------------------------------------------------------

--
-- 表的结构 `ab_diary`
--

CREATE TABLE IF NOT EXISTS `ab_diary` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `content` longtext NOT NULL,
  `sort_id` int(11) NOT NULL,
  `time` int(10) NOT NULL,
  `ip` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 导出表中的数据 `ab_diary`
--


-- --------------------------------------------------------

--
-- 表的结构 `ab_diary_sort`
--

CREATE TABLE IF NOT EXISTS `ab_diary_sort` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 导出表中的数据 `ab_diary_sort`
--


-- --------------------------------------------------------

--
-- 表的结构 `ab_friends`
--

CREATE TABLE IF NOT EXISTS `ab_friends` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `src` varchar(255) NOT NULL,
  `order_id` mediumint(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 导出表中的数据 `ab_friends`
--


-- --------------------------------------------------------

--
-- 表的结构 `ab_keyword`
--

CREATE TABLE IF NOT EXISTS `ab_keyword` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `word` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 导出表中的数据 `ab_keyword`
--


-- --------------------------------------------------------

--
-- 表的结构 `ab_photo`
--

CREATE TABLE IF NOT EXISTS `ab_photo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `introduce` text NOT NULL,
  `src` varchar(255) NOT NULL,
  `sort_id` int(11) NOT NULL,
  `time` int(10) NOT NULL,
  `ip` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 导出表中的数据 `ab_photo`
--


-- --------------------------------------------------------

--
-- 表的结构 `ab_photo_sort`
--

CREATE TABLE IF NOT EXISTS `ab_photo_sort` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 导出表中的数据 `ab_photo_sort`
--


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

--
-- 导出表中的数据 `ab_say`
--

INSERT INTO `ab_say` (`id`, `content`, `sort_id`, `time`, `ip`) VALUES
(1, '我是第一条哦', 0, 1, '1'),
(2, '&lt;p&gt;&lt;br /&gt;\r\n	acol&lt;/p&gt;&lt;br /&gt;\r\n', 0, 1303182595, '127.0.0.1'),
(3, '&lt;p&gt;&lt;br /&gt;\r\n	acol&lt;/p&gt;&lt;br /&gt;\r\n', 0, 1303182627, '127.0.0.1'),
(9, '<p>\r\n	<strong><span style="font-size: 24px;"><span style="font-size: 48px;">范德萨</span></span></strong></p>\r\n', 0, 1303195156, '127.0.0.1'),
(10, '<p>\r\n	<strong><span style="font-size: 72px;">范德萨发</span></strong></p>\r\n<p>\r\n	&nbsp;&nbsp; <strong><span style="font-size: 72px;">发的</span></strong></p>\r\n<p>\r\n	&nbsp;</p>\r\n', 0, 1303195203, '127.0.0.1'),
(11, '&lt;p&gt;\r\n	啊啊&lt;/p&gt;\r\n', 0, 1303195563, '127.0.0.1'),
(12, '&lt;p&gt;\r\n	&lt;span style=&quot;font-size: 36px;&quot;&gt;你好，&lt;/span&gt;&lt;/p&gt;\r\n&lt;p&gt;\r\n	&lt;span style=&quot;font-size: 36px;&quot;&gt;欢迎光临&lt;/span&gt;&lt;/p&gt;\r\n', 0, 1303195619, '127.0.0.1'),
(13, '&lt;p&gt;\r\n	套套啊啊啊啊&lt;/p&gt;\r\n', 0, 1303206267, '127.0.0.1');

-- --------------------------------------------------------

--
-- 表的结构 `ab_say_sort`
--

CREATE TABLE IF NOT EXISTS `ab_say_sort` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 导出表中的数据 `ab_say_sort`
--


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

--
-- 导出表中的数据 `ab_share`
--


-- --------------------------------------------------------

--
-- 表的结构 `ab_user`
--

CREATE TABLE IF NOT EXISTS `ab_user` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(8) NOT NULL,
  `password` varchar(40) NOT NULL,
  `login_time` int(10) NOT NULL,
  `login_ip` varchar(15) NOT NULL,
  `reg_time` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 导出表中的数据 `ab_user`
--

INSERT INTO `ab_user` (`id`, `username`, `password`, `login_time`, `login_ip`, `reg_time`) VALUES
(1, 'acol', '7d167d2061829b54eec7170420de558327546422', 0, '', 0);
