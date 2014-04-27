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

		if( empty($_POST['desc']) ){
			echo json_encode(array(
					'status'	=>'error',
					'msg'		=>'小站简介不能为空'
				));
			exit;
		}

		if( !preg_match('/[a-zA-Z0-9_]+/', $_POST['username']) ){
			echo json_encode(array(
					'status'	=>'error',
					'msg'		=>'用户名只能是下划线，数字和字母'
				));
			exit;
		}

		$db = new Db();
		$data_arr = array(
				'username'		=>$_POST['username'],
				'password'		=>sha1($_POST['password']),
				'desc'			=>$_POST['desc'],
				'face'			=>$_POST['face'],
				'tqq'			=>empty($_POST['tqq']) ? '' : $_POST['tqq'],
				'weibo'			=>empty($_POST['weibo']) ? '' : $_POST['weibo'],
				'xiami' 		=>empty($_POST['xiami']) ? '' : $_POST['xiami'],
				'reg_time'		=>time()
			);
		$result = $db->insert($data_arr , 'ab_user');

		if($result){
			echo json_encode(array(
					'status'	=>'success',
					'msg'		=>'注册成功'
				));
		}
		exit;
	}
	/**
	*
	*	修改资料
	*
	*/
	if($_REQUEST['action'] == 'edit')
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
		if(!empty( $_REQUEST['r_nickname'] )){
			$data_arr['nickname'] = $_REQUEST['r_nickname'];
		}
		if(!empty( $_REQUEST['r_pass'] )){
			$data_arr['password'] = sha1($_REQUEST['r_pass']);
		}
		if(!empty( $_REQUEST['r_desc'] )){
			$data_arr['desc'] = $_REQUEST['r_desc'];
		}
		if(!empty( $_REQUEST['face'] )){
			$data_arr['face'] = $_REQUEST['face'];
		}
		if(!empty( $_REQUEST['r_tqq'] )){
			$data_arr['tqq'] = $_REQUEST['r_tqq'];
		}
		if(!empty( $_REQUEST['r_weibo'] )){
			$data_arr['weibo'] = $_REQUEST['r_weibo'];
		}
		if(!empty( $_REQUEST['r_xiami'] )){
			$data_arr['xiami'] = $_REQUEST['r_xiami'];
		}

		if(empty( $data_arr )){
			echo json_encode(false);
			exit;
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