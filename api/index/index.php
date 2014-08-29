<?php
	
	/*
	*	主页的所有AJAX请求处理处
	*/
	include_once '../../config/config.inc.php';

	if($_GET['action'] == 'index')
	{
		include_once '../../model/index/index.mod.php';
		$page = $_GET['page'];
		$user = $_GET['user'];
		$rows = $config['page']['content_num'];
		$mod = new Index_mod();

		if(empty($page) || !is_numeric($page))
			$page = 1;
		
		//	取内容
		$back = $mod->get_data($user , $page, $rows);
		$data['db'] = $back['data'];

		//	当前条件取的数据为空时（可能是页数大于尾页），取前一页数据
		if(empty($data['db']))
		{
			$back = $mod->get_data($user , $page-1 , $rows);
			$data['db'] = $back['data'];
		}
		foreach($data['db'] as $key=>&$val)
		{
			$val['content'] = htmlspecialchars_decode($val['content']);
			//	取该条内容的评论数
			$val['comment_num'] = $mod->get_comment_num($data['db'][$key]['id']);
			//	为图片lazyload做特殊处理
			//$val['content'] = preg_replace('/(\.jpg|\.gif|\.png){1}"/i', "$1.lazyload\"", $val['content']);
			$val['content'] = str_replace('lazyload="0"', '', $val['content']);
			//$val['content'] = preg_replace('/<img(.*?)(\.jpg|\.gif|\.png){1}"([^>]*)>/is', "<img $1$2.lazyload\" $3  lazyload=\"1\" />", $val['content']);
			$val['content'] = preg_replace('/<img (.*?)src="(.*?)(\.jpg|\.gif|\.png){1}"([^>]*)>/is', "<img $1 src=\"". STATIC_ROOT ."default.jpg\" $4 data=\"$2$3\"  lazyload=\"1\" />", $val['content']);

			$val['time'] = date('Y-m-d H:i:s' , $val['time']);
		}

		echo $back = json_encode(array('data'=>$data['db'] , 'page'=>$back['page'] , 'last_page'=>$back['last_page']));
	}
	/**
	*	取日志评论
	*
	*/
	if($_GET['action'] == 'get_comment')
	{
		include_once '../../model/index/index.mod.php';
		$mod = new Index_mod();
		$aid = $_GET['aid'];
		$page = $_GET['page'];
		if(empty($aid) || !is_numeric($aid))
		{
			//echo json_encode(false);exit;
		}
		if(empty($page) || !is_numeric($page))
		{
			$page = 1;
		}
		
		$data = $mod->get_comment($aid , $page, $_GET['rows']);
		if(empty($data['data']))
			echo json_encode(false);
		else
			echo json_encode($data);
	}
	/**
	*	提交评论
	*/
	if($_GET['action'] == 'insert_comment')
	{
		include_once '../../model/index/add.mod.php';
		$mod = new Add_mod();

		$aid	 	= intval($_GET['aid']);
		$pid	 	= intval($_GET['pid']);
		$bid	 	= intval($_GET['bid']);
		$content 	= $_GET['content'];
		$user 		= $_GET['user'];
		$link 		= $_GET['link'];

		if( empty($user) ){
			echo json_encode(array(
					'status' 	=>'error',
					'msg'		=>'昵称不能为空'
				));
			exit;
		}
		if( empty($content) ){
			echo json_encode(array(
					'status' 	=>'error',
					'msg'		=>'评论内容不能为空'
				));
			exit;
		}

		$data = $mod->submit_comment($aid, $pid, $bid, $content , $user, $link , 'say', '3');
		if(empty($data['res'])){
			echo json_encode(array(
					'status' 	=>'error',
					'msg'		=>'评论失败'
				));
			exit;
		}else{
			echo json_encode(array(
					'status' 	=>'success',
					'msg'		=>'评论成功'
				));
			exit;
		}
	}
	/**
	 * 	拉黑评论
	 */
	if($_GET['action'] == 'black_comment')
	{
		global $global;
		checkUser();
		if($global['is_mine'] != 1)exit('error user');

		include_once '../../model/index/add.mod.php';
		$mod = new Add_mod();

		$cid	 	= $_GET['cid'];
		$action	 	= $_GET['act'];
		$data = $mod->black_comment($cid , $action);
		if(empty($data['res']))
			echo json_encode(false);
		else
			echo json_encode($data);
	}
	/**
	 * 	取幻灯片的图片
	 */
	if($_GET['action'] == 'marqueeP')
	{
		include_once '../../model/index/index.mod.php';
		$user 		= $_GET['user'];

		$mod = new Index_mod();
		$data = $mod->getMarqueePhotos($user);

		if(empty($data))
			echo json_encode(false);
		else
			echo json_encode($data);
	}