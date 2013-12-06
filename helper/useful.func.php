<?php

	/**
	 * @todo 自动加载类文件
	 * @return void
	 */
	function __autoload($class) {
		$class_file = ROOT .'/helper/'. $class .'.hlp.php';
		if (class_exists ( $class_file, false )) {
			return;
		} elseif (! is_readable ( $class_file )) {
			echo $class;
		} else {
			include_once($class_file);
		}
	}
	//	PHP 组装JS代码
	function js_code($code)
	{
		$js_head = '<script type="text/javascript">';
		$js_foot = '   </script>';
		return $js_head. $code . $js_foot;
	}

	//	获取客户端IP
	function get_client_ip()
	{
		global $HTTP_SERVER_VARS;
		if ($HTTP_SERVER_VARS["HTTP_X_FORWARDED_FOR"])
		{
			$ip = $HTTP_SERVER_VARS["HTTP_X_FORWARDED_FOR"];
		}
		elseif ($HTTP_SERVER_VARS["HTTP_CLIENT_IP"])
		{
			$ip = $HTTP_SERVER_VARS["HTTP_CLIENT_IP"];
		}
		elseif ($HTTP_SERVER_VARS["REMOTE_ADDR"])
		{
			$ip = $HTTP_SERVER_VARS["REMOTE_ADDR"];
		}
		elseif (getenv("HTTP_X_FORWARDED_FOR"))
		{
			$ip = getenv("HTTP_X_FORWARDED_FOR");
		}
		elseif (getenv("HTTP_CLIENT_IP"))
		{
			$ip = getenv("HTTP_CLIENT_IP");
		}
		elseif (getenv("REMOTE_ADDR"))
		{
			$ip = getenv("REMOTE_ADDR");
		}
		else
		{
			$ip = '';
		}
		return $ip;
	}

	//	获取URL中指定位置的GET参数
	function get_by_pos($key)
	{
		//获取GET参数
		if(!empty($_GET[$key]))
		{
			return $_GET[$key];
		}
		return false;
	}

	//	根据页数和单页内容数量计算数据在DB中的位置
	function compute_db_pos($page , $content_num , $nums)
	{
		//	计算尾页
		$last_page = ceil( $nums/$content_num );
		if($page >= $last_page)
		{
			$page = $last_page;
		}

		$limit_X = ($page - 1) * $content_num;
		if($limit_X < 0)$limit_X = 0;
		//limit_Y
		if( ($nums - $limit_X) < $content_num ){
			$limit_Y = $nums - $limit_X;
		}else{
			$limit_Y = $content_num;
		}
		//	当当前页的数据库中X坐标起始位置 > 数据总数（也就是当前页大于尾页时），令X,Y都等于总数，让抓出来的数据为空
		//	不至于报错
		
		//echo $limit_X.'-'.$limit_Y;
		return array('x'=>$limit_X , 'y'=>$limit_Y , 'page'=>$page , 'last_page'=>$last_page);
	}
	//	检测URL中的用户名参数(检测GET第一个参数是否是用户)
	function checkUser(){
		global $global;
		$username = empty($_GET[0]) ? $_REQUEST['user'] : $_GET[0];
		//	判断是不是自己的空间
		if(isset($_SESSION['username']) && trim($_SESSION['username']) != ''){
			if(empty($username)){
				$username = $global['user'];
			}
			if($_SESSION['username'] == $username){
				$global['is_mine'] = 1;
			}
		}

		if(empty($_GET))return false;
		$db = new Db();
		$nums = $db->nums('SELECT * FROM ab_user WHERE username="'. $username .'"');
		if($nums < 1){
			Header('Location:http://xiaoqiqiu.com');
			exit;
		}else{
			$global['user'] = $username;
		}
	}