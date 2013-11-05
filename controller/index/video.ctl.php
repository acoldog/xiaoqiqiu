<?php

	/**
	*	照片墙，瀑布流
	*/
	class Video_ctl{
		protected $mod;
		function __construct(){
			$this->mod = new Video_mod();
			//	检测URL中的用户名
			//checkUser();
			//$data = $this->mod->getVideoData(1 , 20);
			//echo json_encode($data);
		}
		function __destruct(){
			global $global;
			//导入模板
			$load = new Load();
			$data['user'] = $global['user'];
			$load->tpl('index/video' , $data);
		}
		public function test(){
			echo 123;
		}


	}	// class end