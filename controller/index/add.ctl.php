<?php
	
	class Add_ctl extends Controller{
		public $text = '';

		function __construct(){
			parent::__construct(__CLASS__);
		}

		function __destruct()			//这里的析构函数真TM有用啊，我就是要整个类执行完后才执行load->tpl操作！！
		{
			parent::__destruct();
			//导入模板
			/*$data['text'] = $this->text;
			$load = new Load();
			$load->tpl('index/add',$data);*/
		}
		function editor($text = ''){
			$this->text = $text;
		}
		//	处理表单的提交
		public function submit()
		{
			if(isset($_POST['add_data']))
			{
				if(empty($_SESSION['username']))echo js_code('alert("未登录！")');
				//print_r($_POST);
				//$this->data = $_POST;
				$add_data = htmlspecialchars($_POST['add_data'] , ENT_QUOTES);
				$back = $this->mod->save_data($add_data);
				if($back == 'success')
				{
					echo js_code('location.href="../index"');
				}else{
					echo js_code('alert("保存的时候出了点小问题，亲")');
				}
			}else{
				include_once(ROOT . '/error.php');
			}
		}
		/**
		*	保存文章
		*/
		public function SaveArticle($content , $aid=0){
			return $this->mod->SaveArticle($content , $aid);
		}
		/**
		*	保存图片
		*/
		public function SavePhoto($photo){
			$this->mod->SavePhoto($photo);
		}

		/**
		*	删除文章
		*/
		public function DelArticle($aid){
			return $this->mod->DelArticle($aid);
		}
		/**
		*	取指定文章内容
		*/
		public function GetArticle($aid){
			return $this->mod->GetArticle($aid);
		}
	}