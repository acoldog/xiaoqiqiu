<?php

class Index_mod extends Model{
	public $load;
	public $data_nums_from_db;		// 数据总数

	function __construct(){
		parent::__construct();
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
		/*$config['page']['sql'] = "SELECT * FROM ab_comment WHERE `sort`='say' AND `diary_id`='". $id ."' ORDER BY id DESC ";
		$config['content']['article_url'] = WEB_ROOT . "/index/get_comment/";
		$config['page']['page_listNum'] = "3";
		$config['page']['content_num'] = "$rows";			// 每页显示多少条内容
		$config['page']['ajax'] = '1';

		$page = new Page();
		$comment['data'] = $page->get_content();
		$comment['page_list'] = $page->create_page_list();
		$comment['max_page'] = $page->last_page();*/

		if( empty($cnums) ){
			$cnums = $this->db->nums('SELECT * FROM  `ab_comment_new` WHERE diary_id='. $id .' GROUP BY bid');
		}
		$db_pos = compute_db_pos($page , intval($rows) , $cnums);

		$build = array();
		//取盖楼者数据
		$sql = 'SELECT * FROM  `ab_comment_new` WHERE diary_id='. $id
		 .' GROUP BY bid ORDER BY id DESC LIMIT ' . $db_pos['x'] .','. $db_pos['y'];
		$data = $this->db->getAll($sql, 1);

		//查看它们有没有父id，如果没有则它自己就是一栋楼
		foreach ($data as $value) {
			$this_build = array();

			if($value['pid'] == 0){
				$this_build = self::getBuild($value['bid'], $this_build);
			}else{
				//取楼顶
				$sql = 'SELECT * FROM  `ab_comment_new` WHERE id='. $value['pid'];
				$res = $this->db->getOne($sql, 1);
				if( $res['pid'] == 0 ){
					$this_build[] = $res;
				}else{	//顶楼可能是另一栋楼的一部分
					$this_build = self::getBuild($res['bid'], $this_build);
				}
				
				//取同楼层其它层
				$this_build = self::getBuild($value['bid'], $this_build);
			}
			$build[] = $this_build;
		}
		//按最新回复时间重排序，取每栋楼最底层来排序
		$cmt_time = array();
		foreach ($build as $value) {
			if( !is_array($value[0]) ){
				$cmt_time[] = $value['id'];
			}else{
				$cmt_time[] = $value[ (count($value)-1) ]['id'];
			}
		}
		array_multisort($cmt_time , SORT_DESC , $build);

		$comment['data'] = $build;
		$comment['max_page'] = $db_pos['last_page'];

		return $comment;
	}

	//用楼ID取楼
	private function getBuild($bid, $build_arr){
		$sql = 'SELECT * FROM  `ab_comment_new` WHERE bid='. $bid .' ORDER BY id ASC ';
		$res = $this->db->getAll($sql, 1);

		foreach ($res as $value2) {
			$build_arr[] = $value2;
		}
		return $build_arr;
	}

	//	提交评论
	public function submit_comment($aid, $pid, $bid, $content , $user, $link , $sort, $sort_id)
	{
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

	//取幻灯片图片
	public function getMarqueePhotos($user){
		if(empty($user))return array();
		$sql = "SELECT diary_id , src FROM ab_photo WHERE `username`='". $user ."' GROUP BY diary_id ORDER BY id DESC LIMIT 6";
		$res = $this->db->getAll($sql, 1);

		$diary_id 	= array();
		$p_arr    	= array();
		if( !empty($res) ){
			foreach ($res as $key => $value) {
				$diary_id[] = $value['diary_id'];
				$p_arr[$value['diary_id']] = $value;
			}
		}
		unset($res);

		$sql = "SELECT id,content FROM ab_diary WHERE id in (". implode(',', $diary_id) .") ORDER BY id DESC ";
		$res2 = $this->db->getAll($sql, 1);
		foreach ($res2 as $key => $value) {
			$res2[$key]['src'] = $p_arr[$value['id']]['src'];
			$content = str_replace('&nbsp;', '', strip_tags($value['content']));
			$content = trim($content);

			$res2[$key]['less'] = substr($content, 0, 40);	//截取
			if(!$res2[$key]['less']){
				$res2[$key]['less'] = '';
			}
			$res2[$key]['content'] = $content;
		}

		return $res2;
	}

}// end class