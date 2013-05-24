<?php

	class Index_mod{
		public $load;
		public $db;
		public $data_nums_from_db;		// 数据总数

		function __construct(){
			$this->db = new Db();	
		}
		public function get_data($username , $page=0 , $content_num=8)
		{
			if(empty($this->data_nums_from_db)){
				$this->data_nums_from_db = $this->db->nums('SELECT * FROM ab_diary WHERE username="'. $username .'"');
			}
			$db_pos = compute_db_pos($page , intval($content_num) , $this->data_nums_from_db);
			//echo "SELECT * FROM ab_say " . "LIMIT " . $db_pos['x'] .','. $db_pos['y'];
			$article_data = $this->db->getAll('SELECT * FROM ab_diary WHERE username="'. $username .'" ORDER BY time DESC ' . 'LIMIT ' . $db_pos['x'] .','. $db_pos['y'] , 1);
			return array(
				'data' => $article_data,
				'page' => $db_pos['page'],
				'last_page' => $db_pos['last_page']
			);
		}
		
		//	抓取指定内容的评论数
		public function get_comment_num($id)
		{
			$sql = "SELECT * FROM ab_comment WHERE `sort`='say' AND `sort_id`='". $id ."'";
			return $this->db->nums($sql);
		}
		//	抓取评论
		public function get_comment($id , $page=1, $rows=2)
		{
			global $config;
			$config['page']['sql'] = "SELECT * FROM ab_comment WHERE `sort`='say' AND `diary_id`='". $id ."' ORDER BY id DESC ";
			$config['content']['article_url'] = WEB_ROOT . "/index/get_comment/";
			$config['page']['page_listNum'] = "3";
			$config['page']['content_num'] = "$rows";			// 每页显示多少条内容
			$config['page']['ajax'] = '1';

			$page = new Page();
			$comment['data'] = $page->get_content();
			$comment['page_list'] = $page->create_page_list();
			$comment['max_page'] = $page->last_page();
			return $comment;
		}
		//	提交评论
		public function submit_comment($aid , $content , $user , $sort, $sort_id)
		{
			$time = time();
			$ip = get_client_ip();
			$table = 'ab_comment';
			$data_arr = array(
				'comment'		=>$content, 
				'comment_user'	=>$user, 
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
		public function black_comment($cid , $action){
			if(empty($cid) || !is_numeric($cid))return false;
			$table = 'ab_comment';
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
		//	取用户资料
		public function get_userInfo($user){
			if(empty($user))return array();
			$sql = "SELECT * FROM ab_user WHERE `username`='". $user ."' LIMIT 1";
			return $this->db->getOne($sql);
		}
	}