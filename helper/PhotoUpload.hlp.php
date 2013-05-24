<?php

	if( !isset($global) ){
		include_once('../config/config.inc.php');
	}
	/*
	*
	*			图片上传类（支持一次上传多张）
	*/
	class PhotoUpload{
		public $success_num = 0;
		public $photo_data;
		public $check_type;

		public function __construct($photo_data , $check_type=true)
		{
			$this->photo_data = $photo_data;
			$this->check_type = $check_type;
		}
		public function uploadOne(){
			$back_data = array();
			if( !empty($this->photo_data['name']) ){
				//	上传后保存是否成功
				$error = $this->check_error($this->photo_data['error']);
				if($error == 'no error'){
					$type = $this->get_photo_type($this->photo_data['type']);
					if($type != 'error type'){
						//	从文件名计算文件类型
						$name_arr = explode('.' , $this->photo_data['name']);
						$type = '.'. $name_arr[count($name_arr)-1];
						//判断临时文件目录里文件的是否是要上传的文件
						if(is_uploaded_file($this->photo_data['tmp_name'])){
							global $config;
							$upload_time = time();
						    $path = ROOT .'/'. $config['cache']['pic_path'];                    //指定图片存放目录
							   //判断文件目录是否存在	
						    if(!file_exists($path))
						    {
								mkdir("$path",0700);            //若不存在，则创建目录并赋予最高权限
						    }
							$name = date("YmdHis" , $upload_time).'_'. $i . $type;
							$tmp_name = 'tmp_'. date("YmdHis" , $upload_time).'_'. $i . $type;
							$adr_name = $path . $name;
							$tmp_adr_name = $path . $tmp_name;
							//将存在临时目录里上传文件的移到指定目录下
							$result = move_uploaded_file($this->photo_data['tmp_name'] , $tmp_adr_name);
							//	原图限制1280*800最大
							//	git动画图不压缩
							if(!$this->IsAnimatedGif($tmp_adr_name)){
								$this->generate_thumb($tmp_adr_name , $path , $name ,'1280','0');	//	高度不裁剪
								@unlink($tmp_adr_name);
							}else{
								@rename($tmp_adr_name , $adr_name);
							}
							
							//	上传保存成功
							if($result)
							{
								$this->success_num++;
								//	压缩图片，统一图片大小！
								$compress_path = ROOT . '/' .$config['cache']['compress_pic_path'];
								if(!file_exists($compress_path))
								{
									mkdir("$compress_path",0700);            //若不存在，则创建目录并赋予最高权限
								}
								$this->generate_thumb($adr_name , $compress_path , $name ,'350','280');

								//$photo_introduce = $_POST['photoIntro'][$i];	//	图片描述
								$compress_src = WEB_ROOT . $config['cache']['compress_pic_path'] . $name;		//	压缩后的相对路径+图片名
								$compress_root = $compress_path . $name;		//	本地路径，方便删除操作

								//	这里不做数据库操作，而返回需要放进数据库的数据
								$back_data = array(
									'compress_src' => $compress_src,
									'compress_root' => $compress_root,
									'img_name' => $name,
									'upload_time' => $upload_time
								);
							}else{
								$back_data['error'] = 'move upload error';
							}
						 }else{
						 	$back_data['error'] = 'save upload error';
						 }
					}else{
						$back_data['error'] = $type;
					}
				}else{
					$back_data['error'] = $error;
				}
			}
			return $back_data;
		}
		/**
		 * [uploadMore 同时上传多张]
		 * @return [type] [description]
		 */
		public function uploadMore(){
			if( !empty($this->photo_data['name']) ){
				for($i=0;$i<count($this->photo_data['name']);$i++)
				{
					if($this->photo_data['name'][$i])
					{
						//	上传后保存是否成功
						$error = $this->check_error($this->photo_data['error'][$i]);
						if( $error == 'no error' )
						{
							$type = $this->get_photo_type($this->photo_data['type'][$i]);           //上传文件初始类型
							//	上传类型判断
							if($type == 'error type')
							{
								$back_data['error'] = 'error type';
							}else{
								//判断临时文件目录里文件的是否是要上传的文件
								if(is_uploaded_file($this->photo_data['tmp_name'][$i]))
								{
									global $config;
									$upload_time = time();
								    $path = ROOT .'/'. $config['cache']['pic_path'];                    //指定图片存放目录
									   //判断文件目录是否存在	
								    if(!file_exists($path))
								    {
										mkdir("$path",0700);            //若不存在，则创建目录并赋予最高权限
								    }  
									$name = date("YmdHis" , $upload_time).'_'. $i . $type;
									$tmp_name = 'tmp_'. date("YmdHis" , $upload_time).'_'. $i . $type;
									$adr_name = $path.$name;
									$tmp_adr_name = $path . $tmp_name;
									//将存在临时目录里上传文件的移到指定目录下
									$result = move_uploaded_file($this->photo_data['tmp_name'][$i],$adr_name);
									//	原图限制1280*800最大
									$this->generate_thumb($tmp_adr_name , $path , $name ,'1280','0');
									@unlink($tmp_adr_name);
									//	上传保存成功
									if($result)
									{
										$this->success_num++;
										//	压缩图片，统一图片大小！
										$compress_path = ROOT .'/'. $config['cache']['compress_pic_path'];
										if(!file_exists($compress_path))
										{
											mkdir("$compress_path",0700);            //若不存在，则创建目录并赋予最高权限
										}
										$this->generate_thumb($adr_name , $compress_path , $name ,'350','280');

										$photo_introduce = $_POST['photoIntro'][$i];					//	图片描述
										$compress_src = WEB_ROOT . $config['cache']['compress_pic_path'] . $name;		//	压缩后的相对路径+图片名
										$compress_root = $compress_path . $name;						//	本地路径，方便删除操作

										#############存入数据库##############
										//	这里不做数据库操作，而返回需要放进数据库的数据
										$back_data[$i] = array(
											'photo_introduce' => $photo_introduce,
											'compress_src' => $compress_src,
											'compress_root' => $compress_root,
											'img_name' => $name,
											'upload_time' => $upload_time
										);

										/*
										$ip = $_SERVER["REMOTE_ADDR"];
										$time = time();
										$insert_arr = array('name'=>$_POST['photoName'][$i],'src'=>$img_name,'kind_id'=>$_POST['kind'],'time'=>$time,'ip'=>$ip,'admin_name'=>$_SESSION['username']);
										$result = $db->insert('cef_img',$insert_arr);
										if($result)
										{
											$successNum++;					//统计上传成功次数
										}else{
											@unlink('../'.$adr_name);		//插入不成功删除图片
											@unlink('../imgCompress'.$name);
										}
										*/
									}
								 }
							}
						}else{
							$back_data['error'] = 'error save';  //文件存放报错
						}
					}

				}	//	end for
				$back_data['upload_num'] = $this->success_num;			//	本次上传操作的图片数量
				return $back_data;
			}else{
				return false;
			}
		}

		public function check_error($error)
		{
			$check_result = 'no error';
			if($error)
			{
				switch($error){
				  case '1':$check_result = "文件大小超过了php.ini设定值";
				  case '2':$check_result = "文件大小超过了form隐藏域设定值";
				  case '3':$check_result = "文件被部分上载";
				  case '4':$check_result = "没有上载文件";
			   }
			}
			return $check_result;
		}
		public function get_photo_type($type)
		{
			if(!$this->check_type){
				$type="not care type";
			}else if($type){
				switch($type){
					case 'image/gif' : 
						$type=".gif";
						break;
					case 'image/jpeg' : 
						$type=".jpg";
						break;
					case 'image/pjpeg' : 
						$type=".jpg";
						break;
					case 'image/png' : 
						$type=".png";
						break;
					case 'image/bmp' : 
						$type=".bmp";
						break;
					default:
						$type="error type";
					break;  
				}
			}
			return $type;
		}

		/*	图片压缩
		*
		*generate_thumb('原图片完整路径和名字','压缩后存储路径','压缩后存储名字','压缩后宽度','压缩后高度','是否进行裁剪');
		*
		*/

		private function generate_thumb($source_img , $target_dir , $target_name , $new_width , $new_height='0' , $if_cut='0')
        {
                //图片类型
                $img_type = strtolower(substr(strrchr($source_img,"."),1));

                //图象的完整目标路径
                //$tar_url = $target_dir."/".$target_name.".".$img_type;
                $tar_url = $target_dir . $target_name;
                //$source_img = str_replace('/', '\\', $source_img);
                //初始化图象
                if($img_type=="jpg") $temp_img = imagecreatefromjpeg($source_img);
                if($img_type=="gif") $temp_img = imagecreatefromgif($source_img);
                if($img_type=="png") $temp_img = imagecreatefrompng($source_img);
                
                //原始图象的宽和高
                $old_width  = imagesx($temp_img);
                $old_height = imagesy($temp_img);

                //	尺寸过小不压缩了
                if($old_width <= $new_width && $old_height <= $new_height){
                	if(strpos($target_dir , 'imgCompress')){
                		copy($source_img , $tar_url);
                	}else{
                		$new_img_name = str_replace('tmp_', '', $source_img);
                		$r = rename($source_img , $new_img_name);
                	}
                	return;
                }
                
                if($new_height == '0')$new_height = $old_height;
                //改变前后的图象的比例
                $new_ratio = $new_width/$new_height;
                $old_ratio = $old_width/$old_height;
                
                //生成新图象的参数
                //情况一：裁图 则按设置的大小生成目标图象
                if($if_cut=="1")
                {
                        //$new_width  = $new_width;
                        //$new_height = $new_height;
                        //高度优先
                        if($old_ratio >= $new_ratio)
                        {
                                $old_width  = $old_height*$new_ratio;
                                $old_height = $old_height;
                        }
                        //宽度优先
                        else
                        {
                                $old_width  = $old_width;
                                $old_height = $old_width/$new_ratio;
                        }
                }
                //情况二：不裁图 则按比例生成目标图象
                else
                {
                        //$old_width  = $old_width;
                        //$old_height = $old_height;
                        //高度优先
                        if($old_ratio >= $new_ratio)
                        {
                                $new_width  = $new_width;
                                $new_height = $new_width/$old_ratio;
                        }
                        //宽度优先
                        else
                        {
                                $new_width  = $new_height*$old_ratio;
                                $new_height = $new_height;
                        }
                }
                //生成新图片
                $new_img = imagecreatetruecolor($new_width,$new_height);
                if($img_type=='png' || $img_type=='gif')
                {
                        imagealphablending($new_img, FALSE);//取消默认的混色模式
                        imagesavealpha($new_img,TRUE);//设定保存完整的 alpha 通道信息
                }
                imagecopyresampled($new_img,$temp_img,0,0,0,0,$new_width,$new_height,$old_width,$old_height);
                
                if($img_type=="jpg") imagejpeg($new_img,$tar_url);
                if($img_type=="gif") imagegif($new_img,$tar_url);
                if($img_type=="png") imagepng($new_img,$tar_url);
                
                imagedestroy($new_img);
        }
        /**
        *	判断文件是不是gif动画文件
        */
        public function IsAnimatedGif($filename)
		{
		    $fp = fopen($filename, 'rb');
		    $filecontent = fread($fp, filesize($filename));
		    fclose($fp);
		    return strpos($filecontent,chr(0x21).chr(0xff).chr(0x0b).'NETSCAPE2.0') === FALSE? false : true;
		}


	
	}	// end class


/*
	if(isset($_FILES['photo']))
	{
		echo 'uploading!';
		$p = new PhotoUpload($_FILES['photo']);
		$result = $p->upload();
		var_dump($result);
	}




<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>内容添加</title>
	</head>
	<body>
<form method="post" action="" enctype="multipart/form-data"  target="main">
<ul>

	<li>1.上传图片：<input type="file" name="photo[]" style="width:403px;"/></li>
	<li>图片描述：<input type="text" name="photoIntro[]" /></li>
	<li>2.上传图片：<input type="file" name="photo[]" style="width:403px;"/></li>
	<li>图片描述：<input type="text" name="photoIntro[]" /></li>
	
	<li><input type="submit" class="submit2" value="上传" style="width:50px;" /></li>
</ul>
</form>
</body></html>

*/
?>