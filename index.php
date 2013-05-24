<?php
	/**
	*	$_SERVER["QUERY_STRING"]	获取URL的GET变量字符串c=acol-1&b=2，参数c是对应的controller，
	*	其中若含有-号，则最后一个-后面是controller，前面是它所在的目录。
	*	如果有多个c参数，则取第一个
	*
	*		c=acol-1&a=2&p=10
	**/
	include_once('config/config.inc.php');

	$a = new Url();
