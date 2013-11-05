<?php

	/**
	*	照片墙，瀑布流
	*/
	class Wall_ctl{
		protected $mod;
		function __construct(){
			//include_once ROOT .'/model/index/wall.mod.php';
			$this->mod = new Wall_mod();
			//	检测URL中的用户名
			checkUser();
			
		}
		function __destruct(){
			global $global;
			//导入模板
			$load = new Load();
			$data['user'] = $global['user'];
			$load->tpl('index/wall' , $data);
		}

		//	取用户图片
		public function GetImgList($page , $rows){
			global $global;
			return $list_data = $this->mod->getImgList($page , $rows ,$global['user']);
		}
	}