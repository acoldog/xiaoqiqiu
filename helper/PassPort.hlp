<?php
	
	class PassPort
	{
		private $conn;
		public $login_success = 'failed';
		public $logout_success = 'failed';

		public function __construct()
		{
			//链接数据库
			$this->conn = new Db();
		}

		public function check_input($username , $password)
		{
			if(trim($username) == '' || trim($password) == '')
			{
				return -1;
			}
			return 1;
		}

		public function check_db($username , $password)
		{
			$sql = "SELECT * FROM ab_user WHERE status=1 AND username='". $username ."' AND password='". $password."'";
			//验证通过
			if( $this->conn->getOne($sql)!='' )
			{
				//	更新登陆时间
				$this->conn->update(array('login_time'=>time() , 'login_ip'=>get_client_ip()) , array('username'=>$username) , 'ab_user');
				return true;
			}
		}
		
		//登陆操作
		public function login($username , $password)
		{
			if($this->check_input($username , $password) > 0)
			{
				if($this->check_db($username , sha1($password)))
				{
					$_SESSION['username'] = $username;
					$_SESSION['login_time'] = time();
					$this->login_success = 'success';
				}
			}
		}

		public function logout()
		{
			if(isset($_SESSION['username']))
			{
				unset($_SESSION['username']);
			}
			session_destroy();
			$this->logout_success = 'success';
			$this->conn->close();
		}
		
	
	}	//end class
	