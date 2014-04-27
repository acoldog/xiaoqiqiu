<?php
	/*
	*	登陆登出AJAX请求处理
	*/
	include_once '../../config/config.inc.php';

	// 登录
	if($_POST['action'] == 'login')
	{
		$username = trim($_POST['username']);
		$password = trim($_POST['password']);

		$login = new PassPort();
		$login->login($username , $password);
		echo json_encode(array(
			'status'	=>$login->login_success,
			'username'	=>$login->GetUserName()
		));
	}
	//	退出
	if($_POST['action'] == 'logout')
	{
		$login = new PassPort();
		$login->logout();
		echo $login->logout_success;
	}
	