<?php
	
	if( !isset($_REQUEST['action']) )exit;
	/*
	*	内容添加页的所有AJAX请求处理处
	*/
	include_once '../../config/config.inc.php';

	/**
	*
	*	上传图片
	*
	*/
	if($_POST['action'] == 'upload')
	{
		$pu = new PhotoUpload($_FILES['Filedata'] , false);
		$result = $pu->uploadOne();
		echo json_encode($result);
		exit;
	}


	//	检测是否是当前用户
	//	检查登录用户
	global $global;
	checkUser();
	if($global['is_mine'] != 1)exit('error user');

	if($_GET['action'] == 'weibo'){
		sync2weibo($_GET['content']);
		exit;
	}

	/**
	*
	*	提交保存文章内容
	*/
	if(isset($_POST) && $_POST['action'] == 'submit')
	{//var_dump($_POST['content'] , $_POST['photo']);
		
		if(!empty($_POST['content'])){
			include_once '../../controller/index/add.ctl.php';
			include_once '../../model/index/add.mod.php';
			$add = new Add_ctl();
			$result = $add->SaveArticle($_POST['content'] , $_POST['aid']);

			if(!empty($_POST['photo']) && $_POST['photo'] != '{}'){
				$add->SavePhoto($_POST['photo']);
			}
			if($result['res']){
				echo json_encode(array(
						'status'	=>'success',
						'msg'		=>'上传成功',
						'aid'		=>$result['aid']
					));
			}else{
				echo json_encode(array(
					'status'	=>'error',
					'msg'		=>'保存失败'
				));
			}
		}
	}
	

	/**
	*	删除指定ID文章
	*
	*/
	if($_GET['action'] == 'del'){
		if(!empty($_GET['aid'])){
			include_once '../../controller/index/add.ctl.php';
			include_once '../../model/index/add.mod.php';
			$add = new Add_ctl();
			$result = $add->DelArticle($_GET['aid']);
			if($result){
				echo json_encode(array(
						'status'	=>'success',
						'msg'		=>'上传成功'
					));
			}
		}
	}

	/**
	*	编辑-取文章内容
	*
	*/
	if($_GET['action'] == 'edit'){
		if(!empty($_GET['aid'])){
			include_once '../../controller/index/add.ctl.php';
			$add = new Add_ctl();
			$result = $add->GetArticle($_GET['aid']);
			if($result){
				echo json_encode(array(
						'status'	=>'success',
						'data'		=>$result['content']
					));
			}
		}
	}

	//	同步到微博
	function sync2weibo($content){
		if($_SESSION['username'] != 'acol')return;
		// 将 abc 替换成你的新浪微博登陆名
	    $username = "acoldog@126.com";
	    // 将 123 替换成你的新浪微博密码
	    $password = "acol132";
	    
	    //$get_post_info = get_post($post_ID);
	    
        //$request = new WP_Http;
        $status = strip_tags( $content ) . ' http://xiaoqiqiu.com';
        $api_url = 'http://api.t.sina.com.cn/statuses/update.json';
        $body = array( 'status' => $status, 'source'=>'2429050160');
        $headers = array( 'Authorization' => 'Basic ' . base64_encode("$username:$password") );
        //$result = $request->post( $api_url , array( 'body' => $body, 'headers' => $headers ) );
        $res = Http::Post('api.t.sina.com.cn' ,'statuses/update.json' ,array(
        	'status' => $status, 
        	'source'=>'2429050160',
        	'Authorization' => 'Basic ' . base64_encode("$username:$password")
        	));
        //$res = Http::Get('i.56.com' , 'api/getUserProfileForSquare.php?user_id=acoldog&uid=acoldog');
        var_dump($res);
	}
