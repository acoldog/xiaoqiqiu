<?php
	
	class Add_mod extends Model{
		function __construct(){
			parent::__construct();
		}
		public function save_data($data)
		{
			$time = time();
			$ip = get_client_ip();
			
			$insert_arr = array(
				'username' => $_SESSION['username'],
				'content' => $data,
				'sort_id' => 0,
				'time' => $time,
				'ip' =>$ip
			);
			$result = $this->db->insert($insert_arr , 'ab_say');
			if($result)
			{
				return 'success';
			}else{
				return 'failed';
			}
		}
		//	保存文章
		public function SaveArticle($content , $aid){
			$time = time();
			$ip = get_client_ip();
			$table = 'ab_diary';

			$content = str_replace("'", "\'", $content);	//过滤可能的单引号
			$data_arr = array('content'=>mysql_escape_string($content), 'time'=>$time, 'ip'=>$ip,'username'=>$_SESSION['username']);
			if($aid < 1){
				$result = $this->db->insert($data_arr , $table);
				return array(
					'res'	=>$result,
					'aid'	=>mysql_insert_id()
				);
			}else{
				$where_arr = array('id'=>$aid);
				$result = $this->db->update($data_arr , $where_arr , $table);
				return array(
					'res'	=>$result,
					'aid'	=>$aid
				);
			}
		}
		//	保存图片
		public function SavePhoto($photo){
			$time = time();
			$ip = get_client_ip();
			
			$photoData = str_replace("'", "\"", $photo);
			$photoData = json_decode($photoData , true);
			if(!empty($photoData)){
				$diary_id = mysql_insert_id();
				foreach ($photoData as $key => $value) {
					//判断图片格式
					if( !preg_match('/[\.jpg|\.gif|\.png|\.bmp]/' , $value) ){
						continue;
					}

					$insert_arr = array('diary_id'=>$diary_id ,'time'=>$time, 'ip'=>$ip,'username'=>$_SESSION['username'],'src'=>$value);
					$result = $this->db->insert($insert_arr , 'ab_photo');
				}
			}
			return $result;
		}

		//	删除文章
		public function DelArticle($aid){
			$where = array('id'=>$aid);
			return $result = $this->db->del($where , 'ab_diary');
		}
		//	取指定文章内容
		public function GetArticle($aid){
			return $this->db->getOne('SELECT content FROM `ab_diary` WHERE id='. intval($aid));
		}
		// 编辑公告
		public function editNotice($notice, $user){
			$where_arr = array('username'=>$user);
			$data_arr  = array('notice'=>$notice);

			$result = $this->db->update($data_arr , $where_arr , 'ab_user');
			if($result){
				$res = array(
					'res'	=>$result,
					'notice'	=>$notice
				);
			}else{
				$res = false;
			}
			return $res;
		}

	}