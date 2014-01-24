<?php
	
	/*
	*	内容添加页的所有AJAX请求处理处
	*/
	include_once '../../config/config.inc.php';


	//	检测是否是当前用户
	//	检查登录用户
	global $global;
	checkUser();
	if($global['is_mine'] != 1)exit('error user');

	if($_GET['action'] == 'change_version'){
		$version = intval( $_GET['version'] );

		$data_arr['version'] = $version;
		$db = new Db();
		$result = $db->update($data_arr , array('username'=>$_SESSION['username']) , 'ab_user');

		echo js_code("window.location.href='". $_SERVER['HTTP_REFERER'] ."'");
		exit;
	}