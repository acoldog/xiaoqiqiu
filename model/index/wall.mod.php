<?php

	class Wall_mod extends Model{
		public function __construct(){
			parent::__construct();
		}
		//	取照片数据
		public function getImgList($page , $rows , $user=''){
			if($user == ''){
				global $global;
				$user = $global['user'];
			}
			$img_nums = $this->db->nums('SELECT * FROM ab_photo WHERE username="'. $user .'"');
			$db_pos = compute_db_pos($page , $rows , $img_nums);

			return array(
				'data' 	=> $this->db->getAll('SELECT * FROM ab_photo WHERE 
				username="'. $user .'" ORDER BY id DESC ' . 'LIMIT ' . $db_pos['x'] .','. $db_pos['y'] , 1),
				'total'	=> $img_nums
			);
		}

		//	删除指定图片及图片文件
		public function delOneImg($pid){
			if(!is_numeric($pid)){
				$back = array(
					'status'=>'error',
					'msg'	=>'参数错误'
				);
			}else{
				//	判断关联文章是否存在
				$res1 = $this->db->getOne('SELECT diary_id,src FROM ab_photo WHERE id='. $pid);
				if($res1){
					$res2 = $this->db->getOne('SELECT content FROM ab_diary WHERE id='. $res1['diary_id']);
					if(!$res2){
						//	文章不存在则执行删除
						$res3 = $this->db->del(array('id'=>intval($pid)) , 'ab_photo');
						//	删除图片文件
						$filename1 = str_replace(WEB_ROOT , ROOT .'/', $res1['src']);
						$filename2 = str_replace('imgCompress' , 'img', $filename1);
						@unlink($filename1);
						@unlink($filename2);
						$back = array(
							'status'=>'success',
							'msg'	=>'',
							'f1'	=>$filename1,
							'f2'	=>$filename2
						);
					}else{
						$back = array(
							'status'=>'error',
							'msg'	=>'图片删除失败，必须先删除图片相关文章('. $res1['diary_id'] .') --- “'. substr(strip_tags($res2['content']), 0, 50) .'”'
						);
					}
				}else{
					$back = array(
						'status'=>'error',
						'msg'	=>'图片不存在'
					);
				}
			}
			return $back;
		}
	}