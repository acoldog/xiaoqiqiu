<?php

	/**
	*	照片墙，瀑布流
	*/
	class Ttwall_ctl extends Controller{
		function __construct(){
			parent::__construct(__CLASS__);
		}
		function __destruct(){
			parent::__destruct();

			global $global;
			//导入模板
			$load = new Load();
			$data['user'] = $global['user'];
			$this->load->tpl('index/ttwall' , $data);
		}

	}