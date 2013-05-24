<?php
	
	/*
	*	瀑布流的所有AJAX请求处理处
	*/
	include_once '../../config/config.inc.php';


	//	取照片列表
	if($_GET['action'] == 'imgList'){
		include_once '../../model/index/wall.mod.php';
		$page = $_GET['page'];
		$rows = $_GET['rows'];

		$wall = new Wall_mod();
		$list_data = $wall->getImgList($page , $rows, $_REQUEST['user']);
		echo json_encode($list_data);
		exit;
	}

	//	放在取列表之后哦，不然列表内容取不出来了
	//	检测是否是当前用户
	//	检查登录用户
	checkUser();
	if($global['is_mine'] != 1)exit('error user');

	//	删除照片（要先删关联文章）
	if($_GET['action'] == 'delImg'){
		include_once '../../model/index/wall.mod.php';
		$pid = $_GET['pid'];
		
		$wall = new Wall_mod();
		$res = $wall->delOneImg($pid);
		header("Access-Control-Allow-Origin: *");
		echo json_encode($res);
		exit;
	}