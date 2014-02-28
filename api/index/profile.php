<?php
	
	/*
	*	注册和修改资料相关
	*/
	include_once '../../config/config.inc.php';

	/**
	*
	*	注册
	*
	*/
	if($_POST['action'] == 'reg')
	{
		//	如果已经登陆，则不让注册
		if( isset($_SESSION['username']) ){
			echo json_encode(array(
					'status'	=>'error',
					'msg'		=>'登陆状态不让注册'
				));
			exit;
		}
		if( empty($_POST['username']) || empty($_POST['password']) ){
			echo json_encode(array(
					'status'	=>'error',
					'msg'		=>'用户名或者密码不能为空'
				));
			exit;
		}

		$db = new Db();
		$data_arr = array(
				'username'		=>$_POST['username'],
				'password'		=>sha1($_POST['password']),
				'desc'			=>$_POST['desc'],
				'face'			=>$_POST['face'],
				'tqq'			=>($_POST['tqq'] == '微博组件代码，没有可不填' ? '' : $_POST['tqq']),
				'weibo'			=>($_POST['weibo'] == '微博组件代码，没有可不填' ? '' : $_POST['weibo']),
				'reg_time'		=>time()
			);
		$result = $db->insert($data_arr , 'ab_user');

		echo json_encode($result);
		exit;
	}
	/**
	*
	*	修改资料
	*
	*/
	if($_POST['action'] == 'edit')
	{
		//	如果已经登陆，则不让注册
		if( !isset($_SESSION['username']) ){
			echo json_encode(array(
					'status'	=>'error',
					'msg'		=>'非登陆状态不让修改资料'
				));
			exit;
		}

		$data_arr = array();
		$db = new Db();
		if(!empty( $_POST['password'] )){
			$data_arr['password'] = sha1($_POST['password']);
		}
		if(!empty( $_POST['desc'] )){
			$data_arr['desc'] = $_POST['desc'];
		}
		if(!empty( $_POST['face'] )){
			$data_arr['face'] = $_POST['face'];
		}
		if(!empty( $_POST['tqq'] )){
			$data_arr['tqq'] = $_POST['tqq'];
		}
		if(!empty( $_POST['weibo'] )){
			$data_arr['weibo'] = $_POST['weibo'];
		}
		$data_arr['reg_time'] = time();
		
		$result = $db->update($data_arr , array('username'=>$_SESSION['username']) , 'ab_user');

		echo json_encode($result);
		exit;
	}
	/**
	 *
	 * 	获取最近注册用户
	 */
	if($_GET['action'] == 'lastReg')
	{
		//	检查登录用户
		//global $global;
		//checkUser();
		//if($global['is_mine'] != 1)exit('error user');

		$db = new Db();
		$num = intval($_GET['num']);

		$res = $db->getAll('SELECT `username`,`desc`,`face`,`reg_time` FROM ab_user ORDER BY id DESC LIMIT '. $num);
		echo json_encode($res);
		exit;
	}