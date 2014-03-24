<?php

	/**
	*	照片墙，瀑布流
	*/
	class Video_ctl extends Controller{
		protected $mod;
		function __construct(){
			parent::__construct(__CLASS__);
		}
		function __destruct(){
			parent::__destruct();
			
			global $global;
			//导入模板
			$data['user'] = $global['user'];
			$this->load->tpl('index/video' , $data);
		}
		public function test(){
			echo 123;
		}


	}	// class end