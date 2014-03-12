<?php
	

	//$arr = $db->getOne(" select * from ep_user ");		//这里写法是错误的，controller里不应该有DB操作，要把这一步单独创建个文件写到model里
	

class Index_ctl extends Controller{
	public 		$load_index = true;	//	是否做默认操作（针对AJAX情况）
	public 		$username = 'acol';

	public function __construct(){
		parent::__construct(__CLASS__);
	}

	public function __destruct(){			//这里的析构函数真TM有用啊，我就是要整个类执行完后才执行load->tpl操作！！
		parent::__destruct();

		global $global , $config;
		$page = get_by_pos(0);
		if(empty($page) || !is_numeric($page))
			$page = 1;

		$rows = $config['page']['content_num'];
		//	取内容
		$back = $this->mod->get_data($global['user'], $page , $rows);
		$data['db'] = $back['data'];
		//	当前条件取的数据为空时（可能是页数大于尾页），取前一页数据
		if(empty($data['db']))
		{
			$back = $this->mod->get_data($global['user'], $page-1 , $rows);
			$data['db'] = $back['data'];
		}
		if(!empty($data['db'])){
			foreach($data['db'] as $key=>&$val){
				$val['content'] = htmlspecialchars_decode($val['content']);
				//	取该条内容的评论数
				$val['comment_num'] = $this->mod->get_comment_num($data['db'][$key]['id']);
				//$val['content'] = preg_replace('/<img(.*?)(\.jpg|\.gif|\.png){1}"([^>]*)>/is', "<img $1$2.lazyload\" $3  lazyload=\"1\" />", $val['content']);
				$val['content'] = preg_replace('/<img (.*?)src="(.*?)(\.jpg|\.gif|\.png){1}"([^>]*)>/is', "<img $1 src=\"". STATIC_ROOT ."default.jpg\" $4 data=\"$2$3\"  lazyload=\"1\" />", $val['content']);
				$val['content'] = str_replace("\\\'", "\\'", $val['content']);
				$val['time'] = date('Y-m-d H:i:s' , $val['time']);
			}
		}else{
			$data['db'] = array();
		}
		//	取用户资料
		$data['userInfo'] = $this->mod->get_userInfo($global['user']);
		
		//把当前页数告诉模板文件
		$data['page'] = $page;
		$data['last_page'] = $back['last_page'];
		//	当前主页用户名
		$data['user'] = $global['user'];
		$data['is_mine'] = $global['is_mine'];

		//导入模板
		if( $data['userInfo']['version'] == 1 ){
			$this->load->tpl('index/bootstrap',$data ,'index');
		}else{
			$this->load->tpl('index/index',$data);
		}
		
	}
		
}