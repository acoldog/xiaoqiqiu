<?php
	
	class Add_mod extends Model{
		function __construct(){
			parent::__construct();
		}
		public function save_data($data)
		{
			$this->initDB();

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
			$this->initDB();

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
		public function SavePhoto($photo, $op){
			$time = time();
			$ip = get_client_ip();
			$desc = '';
			
			$photoData = str_replace("'", "\"", $photo);
			$photoData = json_decode($photoData , true);
			if(!empty($photoData)){
				if( empty($op['diary_id']) ){
					$diary_id = mysql_insert_id();
				}else{
					$diary_id = $op['diary_id'];
				}
				if( !empty($op['desc']) ){
					$desc = $op['desc'];
				}

				$this->initDB();
				foreach ($photoData as $key => $value) {
					//判断图片格式
					if( !preg_match('/[\.jpg|\.gif|\.png|\.bmp]/' , $value) ){
						continue;
					}

					$insert_arr = array('diary_id'=>$diary_id ,'time'=>$time, 'ip'=>$ip,
					 'username'=>$_SESSION['username'],'src'=>$value, 'introduce'=>$desc);
					$result = $this->db->insert($insert_arr , 'ab_photo');
				}
			}
			return $result;
		}

		//	删除文章
		public function DelArticle($aid){
			$this->initDB();
			$where = array('id'=>$aid);
			return $result = $this->db->del($where , 'ab_diary');
		}
		//	取指定文章内容
		public function GetArticle($aid){
			$this->initDB();
			return $this->db->getOne('SELECT content FROM `ab_diary` WHERE id='. intval($aid));
		}
		// 编辑公告
		public function editNotice($notice, $user){
			$this->initDB();
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

		//	提交评论
		public function submit_comment($aid, $pid, $bid, $content , $user, $link , $sort, $sort_id)
		{
			$this->initDB();

			$time = time();
			$ip = get_client_ip();
			$table = 'ab_comment_new';

			//是否盖楼
			if( $pid == 0 ){
				$bid = time();
			}else{
				//判断是不是从楼中间回复（是不是已经是别的楼的pid），是的话要盖出另一层楼
				$sql = 'SELECT id FROM  `ab_comment_new` WHERE pid='. $pid;
				$res = $this->db->getOne($sql, 1);
				if( !empty($res) ){
					$bid = time();
				}

				//判断父楼是不是顶楼，是的话也要另盖
				$sql = 'SELECT pid FROM  `ab_comment_new` WHERE id='. $pid;
				$res = $this->db->getOne($sql, 1);
				if( !empty($res) && intval($res['pid'] === 0) ){
					$bid = time();
				}
			}

			$data_arr = array(
				'comment'		=>$content, 
				'comment_user'	=>$user, 
				'link' 			=>$link,
				'pid' 			=>$pid,
				'bid' 			=>$bid,
				'diary_id'		=>$aid, 
				'sort'			=>$sort, 
				'sort_id'		=>$sort_id,
				'time'			=>date('Y-m-d H:i:s' , $time),
				'ip'			=>$ip
			);
			if(!empty($aid) && $aid > 0){
				$result = $this->db->insert($data_arr , $table);
				return array(
					'res'	=>$result,
					'cid'	=>mysql_insert_id()
				);
			}
		}
		//	拉黑评论
		public function black_comment($cid , $action)
		{
			$this->initDB();
			
			if(empty($cid) || !is_numeric($cid))return false;
			$table = 'ab_comment_new';
			$where_arr = array('id'=>$cid);
			if($action == 'black'){
				$data_arr = array('state'=>0);
			}else{
				$data_arr = array('state'=>1);
			}
			$result = $this->db->update($data_arr , $where_arr , $table);
			return array(
					'res'	=>$result,
					'cid'	=>$cid
				);
		}

	}