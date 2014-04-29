<?php

	/*
	*	内容添加页的所有AJAX请求处理处
	*/
	include_once '../../config/config.inc.php';

	//	检查登录用户
	if(!isset($_SESSION['username']) || trim($_SESSION['username']) == ''){
		exit('用户未登录，请前往<a href="#" onclick="window.open(\'http://xiaoqiqiu.com/\');window.close();">小气球</a>进行登录操作');
	}

	if( !isset($_GET['netImg']) || trim($_GET['netImg']) == '' ){
		exit('图片地址为空');
	}

	if( trim($_GET['img_title']) != '' ){
		$desc = $_GET['img_title'];
	}else if( trim($_GET['imgAlt']) != '' ){
		$desc = $_GET['imgAlt'];
	}else{
		$desc = $_GET['doc_title'];
	}

	$tmp_dir 	= '/tmp/upload_tmp/';
	$file_name 	= 'net_'. md5(time());
	//$file_name 		= 'net_b0c377a53abcac63e0f8d9b8c26a3aea';
	
	$tmp_file 			= $tmp_dir . $file_name;
	
	$imgdata = file_get_contents($_GET['netImg']);

	$tmp_file = $tmp_dir . $file_name;
	$fp = fopen ( $tmp_file , 'wb' );
	if ($fp) {
		$fw = fwrite ( $fp, $imgdata );
	}
	fclose ( $fp );

	$img_info 	= getimagesize($tmp_file);
	$width 		= $img_info[0];
	$height		= $img_info[1];

	$img_type 	= $img_info['mime'];

	$pu = new PhotoUpload();


	$type = $pu->get_photo_type($img_type);
	if($type && $type != 'error type'){
		$file_name 			.= $type;

		$tmp_name 			= 'tmp_'. $file_name;
		$path 				= ROOT .'/'. $config['cache']['pic_path'];                    //指定图片存放目录
		$compress_path 		= ROOT . '/' .$config['cache']['compress_pic_path'];
		$adr_name 			= $path . $file_name;
		$tmp_adr_name 		= $path . $tmp_name;

		$res 				= copy($tmp_file , $tmp_adr_name);

		if( $res ){
			//	原图限制1280*800最大
			//	git动画图不压缩
			if(!$pu->IsAnimatedGif($tmp_adr_name)){
				$pu->generate_thumb($tmp_adr_name , $path , $file_name ,'1024','0');	//	高度不裁剪
				@unlink($tmp_adr_name);
			}else{
				@rename($tmp_adr_name , $adr_name);
			}

			$pu->generate_thumb($adr_name , $compress_path , $file_name ,'350','280');
			//$photo_introduce = $_POST['photoIntro'][$i];	//	图片描述
			$compress_src = WEB_ROOT . $config['cache']['compress_pic_path'] . $file_name;		//	压缩后的相对路径+图片名
			$compress_root = $compress_path . $file_name;		//	本地路径，方便删除操作

			//	这里不做数据库操作，而返回需要放进数据库的数据
			$img_data = json_encode( array('compress_src' => $compress_src) );

			//网络抓取的图片自动入库
			include_once '../../model/index/add.mod.php';
			$add = new Add_mod();

			if(!empty($img_data) && $img_data != '{}'){
				$res = $add->SavePhoto($img_data, array('diary_id'=>0, 'desc'=>$desc));	//diary_id默认为0
				if($res){
					echo '图片入库成功，请到个人小站的图片墙查看';
				}else{
					echo '图片入库失败，请重试';
				}
			}

		}else{
			echo 'tmp copy error';
		}
		
	}else{
		echo '图片抓取失败';
	}

	echo '<script type="text/javascript">setTimeout(function(){window.close();}, 500);</script>';




