<?php
/*
	easyphp V3.0   20110402    ----acol
	一。	
		URL规则1:
			模仿home.51.com的 “ home.51.com/?c=index&u=acolcat ” 这种格式，其中c代表controller的名字，
			若在controller目录的子文件夹里，则用-号分隔表示，比如：c=file1-file2-index
			所以 home.51.com/?c=index 和 home.51.com/acol/dog/?c=index 的结果一样！操作controller目录是在c参数里
			这些参数都可以用$_GET方式直接获得

		URL规则2：
			" home.51.com/acolcat/1 "
	
		注：（http://php.chinaunix.net/manual/zh/function.include.php）

		使用HTTP方式的include ： include('http://xxxx.com/a.php?a=123');	

		这样可以成功传递GET参数，但是貌似只是显示该页面的输出，和readfile功能一样...，就相当于往服务器发送一个页面请求，而没法把该页面的类，函数包含进来！
	二。
		对比前两版easyphp，主要是这个url解析类做了改变，提出了新要求：
		1.	如果要写成类，而用url调用类方法，则 controller文件和model文件的类名都要分别写成 xxx_ctl 和 xxx_mod

		2.	也可以把controller文件写成原来的形式，在页顶初始化model对象，在页底做 Load->tpl操作

		3.	这里注意一点是，cache文件不会保存controller中的输出，只会保存解析后的tpl文件。这个问题暂时不解决。
*/
	
	class Url
	{
		function __construct()
		{
			$url_str = $_SERVER["QUERY_STRING"];
			//分析提取URL参数
			if(!empty($url_str))
			{
				$url_ctl = $this->analyse_url($url_str);
				//发送参数
				$this->get_controller($url_ctl);
			}else{
				//GET参数不存在则使用第二种URL规则解析
				$url_ctl = $this->analyse_url2();
			}
		}
		
		//按顶部的URL格式来解析其中的内容，找出controller及其相对controller目录的路径，如:file1-file2-index
		public function analyse_url($url_str)
		{
			$arr = explode('&' , $url_str);
			foreach($arr as $key=>$val)
			{
				$arr2 = explode('=' , $val);
				if($arr2['0'] == 'c')
				{
					$url_ctl = $arr2['1'];
					unset($arr,$arr2);
					return $url_ctl;
				}
			}
			unset($arr,$arr2);
			if(!isset($url_ctl))
				return $url_ctl = 'index';
		}




		//按顶部第二种规则解析，优先级是  文件夹名	》 controller文件名  》 controller中的函数  》 匿名GET变量
/*
		URL中包含的文件夹可以多个，controller文件名有且只能一个，执行函数只能一个，匿名GET变量可以多个

		从左往右：
			1。如果只有一个元素，则			//	localhost/blog/acol
				（1）controller目录里存在这样的PHP文件夹名，则
					a.该url是执行该目录下的controller为index（如果不存在Index，则跳转到错误页面）	// ...controller/index.php
				（2）如果文件夹不存在，controller目录里存在这样的PHP文件名，则
					a.该元素是controller	//	...controller/acol.php
				（3）如果都不存在，则
					a.默认是controller为index里的一个函数		// ...controller/index.php
					b.如果存在index但不存在该函数则为get变量	// ...controller/index.php
					c.如果不存在Index，则跳转到错误页面
			2. 如果有两个元素，则			//	localhost/blog/acol/dog
				（1）如果第一个是contronler目录下的存在的文件夹，则
					a.如果第二个是该目录中的controller		//	...controller/acol/dog.php
					b.如果该目录不存在第二个这样的controller，则默认为该目录下controller为index的函数 //	...controller/acol/index.php
					c.如果该函数不存在，默认执行该目录下controller为index，第二个为匿名变量		//	...controller/acol/index.php
					c.如果该目录下不存在controller为index，则跳转到错误页面
				（2）如果第一个是controller目录下的controller文件名，则
					a.第二个为该controller中的函数				//	...controller/acol.php
					b.如果该函数不存在，则为匿名GET变量			//	...controller/acol.php
				（3）如果controller目录下存在controller为index，则
					a.第二个为该controller中的函数				//	...controller/index.php
					b.如果该函数不存在，则为匿名GET变量			//	...controller/index.php
				（4）如果controller目录下不存在controller为index，则跳转到错误页面
			3. 如果有三个或三个以上元素，则		//	localhost/blog/acol/dog/cat
				。。。依此类推

		多个GET变量传递，URL应该是这样：localhost/acol/blog2/10/20110401/acolcat	
*/
		public function analyse_url2()
		{
			/*if($_SERVER['SERVER_PORT'] == '80')
			{
				$port = '';
			}else{
				$port = ':'. $_SERVER['SERVER_PORT'];
			}
			$http_head = 'http://'. $_SERVER['HTTP_HOST'] . $port;
			$local_url_path = str_replace($http_head , '' , WEB_ROOT);	*/
			if(!empty($_SERVER["REQUEST_URI"]))
			{
				$local_url_path = $_SERVER["REQUEST_URI"];
			}else{
				$local_url_path = $_SERVER["SCRIPT_URL"];
			}

			$request_url = parse_url($_SERVER['REQUEST_URI']);
			$request_url_path = preg_replace("/[^\w\/\\\]/",'',$request_url['path']);		//   /acol/easyphp/index/	//获取URL上除host外的字串

			$request_url_arr = explode('/', $request_url_path);
			$web_root_arr = explode('/', WEB_ROOT);
			$request_arr = empty($request_url_path) ? array() : array_diff($request_url_arr, $web_root_arr);
			//$request_arr = empty($request_url_path) ? array() : split("[/\\]+",str_replace($local_url_path,"",$request_url_path));
			
			$request_arr = array_filter($request_arr);     //消除空元素
print_r($request_arr);
			//开始判断。。太复杂了，，我囧了
			$i = 0;
			$ctl_path = '';				//路径
			$ctl_name = '';				//controller
			$has_controller = false;
			$has_function = false;
			$class_name = $class_method_name = $function_name = false;
			$cache = false;			//	是否有有效缓存
			foreach($request_arr as $key=>$val)
			{
				//	controller唯一，找到了就不再寻找
				if(!$has_controller)
				{
					//元素是文件夹名
					if(is_dir(ROOT . '\controller\\' . $val))
					{
						$ctl_path .= $val.'\\';
					}
					else if(file_exists(ROOT. '\controller\\' . $ctl_path. $val . '.ctl.php'))
					{
						$has_controller = true;			//ctl唯一
						$ctl_name = $val;
						if(file_exists(ROOT.'\model\\'. $ctl_path. $val .'.mod.php'))
						{
							include ROOT.'\model\\'. $ctl_path. $val .'.mod.php';
							include ROOT.'\controller\\'. $ctl_path. $val .'.ctl.php';
							//	这里的controller里如果有类，就暂时不默认实例化它了，以后根据需要改！
							$class_name = ucfirst($ctl_name . '_ctl');
						}else{
							include_once(ROOT . '\error.html');			//model不存在跳转到错误页
							exit;
						}
					}else{
						include_once(ROOT . '\error.html');			//在找到controller之前的元素既不是文件名也不是controller，那就报错吧
						exit;
					}
					
				} else {
					$class = ucfirst($ctl_name . '_ctl');		//ucfirst将首字母大写
					//执行函数唯一
					if(!$has_function && function_exists($val))		
					{
						$has_function = true;			//执行function 唯一
						$function_name = $val;						//运行这个函数

					}else if(!$has_function && class_exists($class)){	//如果执行函数是在controller的类中的方法
						if(method_exists( $class , $val  ))			//检测controller的类是否存在
						{
							$has_function = true;
							$class_name = $class;
							$class_method_name = $val;
							//$obj = new $class_name;
							//$obj->$val();
						}else{	
							$_GET[$i] = $val;				//设置GET参数，设置好就可以自动传值到controller页面了
							$i++;
						}	
					}else{	
						$_GET[$i] = $val;				//设置GET参数，设置好就可以自动传值到controller页面了
						$i++;
					}
				}
			}
			/*
			*	如果存在缓存文件则直接加载显示，不再往下进行操作
			*/	
			global $config;
			$cache_name = $ctl_path . implode('-' , $_GET) . '@' . $ctl_name;
			if($this->check_cache($cache_name , $config['cache']['timeout']))
			{
				exit('cache');
			}

			//
			//	在$_GET参数获取完毕后，再做执行类和方法的操作!!!
			//
			if($function_name)
			{
				$function_name();
			}
			if($class_name)
			{
				$obj = new $class_name;
			}
			if($class_method_name && is_object($obj))
			{
				$obj->$class_method_name();
			}
			



			//默认的controller类名为Index_ctl
			if(empty($class_name))
			{
				$class_name = 'Index_ctl';
			}

			// 当url中没有执行函数时，默认实例化controller的类，执行该类的构造函数（如果存在该类）
			/*if(isset($class_name) && class_exists($class_name) && !isset($obj))
			{
				$obj = new $class_name;
			}*/

			//	如果找不到controller，默认加载的controller为index
			if(empty($ctl_name))
			{
				if(file_exists(ROOT. '\controller\\' . $ctl_path. 'index.ctl.php'))
				{
					/*
					*	如果存在缓存文件则直接加载显示，不再往下进行操作
					*/
					$cache_name = $ctl_path . implode('-' , $_GET) . '@index';
					if($this->check_cache($cache_name , $config['cache']['timeout']))
					{
						exit('cache');
					}

					include ROOT.'\model\\'. $ctl_path. 'index.mod.php';
					include ROOT.'\controller\\'. $ctl_path. 'index.ctl.php';
					if(class_exists('Index_ctl'))
					{
						$obj = new Index_ctl;			//默认初始化这个类
					}
				}else{
					include_once(ROOT . '\error.html');
					exit;
				}
			}

		}



		//根据解析到的参数加载相应model和controller , $url_ctl为controller文件名（也是model名）
		public function get_controller($url_ctl)
		{
			$ctl_arr = explode('-' , $url_ctl);
			//获取ctroller文件名（在 - 分隔成的数组最后一位）
			$ctl_name = array_pop($ctl_arr);
			if($ctl_arr != NULL)
			{
				$ctl_path = implode('\\' , $ctl_arr).'\\';
			}else{
				$ctl_path = '';
			}

			//判断相应的model文件是否存在，存在就导入
			if(file_exists(ROOT.'model\\'.$ctl_path.$ctl_name.'.mod.php'))
			{
				include_once(ROOT.'model\\'.$ctl_path.$ctl_name.'.mod.php');
			}
			echo ROOT.'\controller\\'.$ctl_path.$ctl_name.'.ctl.php';
			//判断该controller文件是否存在，存在就导入，否则跳转到error页
			if(file_exists(ROOT.'controller\\'.$ctl_path.$ctl_name.'.ctl.php'))
			{
				include_once(ROOT.'controller\\'.$ctl_path.$ctl_name.'.ctl.php');
			}else{
				//路径错误，或者目标程序不存在，则引入错误页面
				include_once(ROOT . 'error.html');
				exit;
			}
		}
		
		/*
		*	在这里看看缓存文件是否存在		$file 为程序文件名		$time 为缓存文件过期时间，0为不缓存，单位是秒
		*/
		public function check_cache($file , $time=0)
		{
			if(file_exists(ROOT.'/cache/'.$file.'.cache'))
			{
				$html = file_get_contents(ROOT.'/cache/'.$file.'.cache');
				if(intval($time) > 0)
				{
					$cache_time = substr($html,0,10);
					//如果缓存文件还在有效期，则直接调用缓存文件（去除头部的过期时间 - 长度为10的数字串）
					if((time() - $cache_time) < $time )
					{
						echo substr($html,10);
						return true;
					}
				}			
				
			}
			return false;
		}


	}		//end class