<?php

	/**
	*	照片墙，瀑布流
	*/
	class Wall_ctl extends Controller{
		protected $mod;
		function __construct(){
			parent::__construct(__CLASS__);
		}
		function __destruct(){
			parent::__destruct();

			global $global;
			//导入模板
			$load = new Load();
			$data['user'] = $global['user'];
			$this->load->tpl('index/wall' , $data);
		}

		//	取用户图片
		public function GetImgList($page , $rows){
			global $global;
			return $list_data = $this->mod->getImgList($page , $rows ,$global['user']);
		}
	}