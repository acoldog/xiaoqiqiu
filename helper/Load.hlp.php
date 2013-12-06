<?php
	/*
	*
	*		cache文件名长这样：	1-acol-dog@index.cache
	*/
	
	class Load{

		function __construct($file='')
		{
		}
		public function tpl($filename,$data)
		{
			global $global;
			$file = explode('.',$filename);
			$file = $file['0'];				//去除文件名后缀
			//	如果filename中带路径
			$file_path = '';
			$filename_arr = explode('/' , $file);
			$filename_arr_lenth = count($filename_arr);
			if($filename_arr_lenth > 1)
			{
				$file = array_pop($filename_arr);
				$file_path = implode('/' , $filename_arr).'/';
			}

			//echo $_SERVER["QUERY_STRING"];			//GET参数
			//$get_var = explode('-',$_GET['var']);

			//if(trim($get_var['0'])!=='')			//如果GET参数存在，则改变文件名
			//{
			//	$file .= '_'.implode('_',$get_var);
			//}
			
			//查看有没有该文件的模板文件，有的话不用替换了，直接加载
			//if(file_exists($config['local_path'].'html/'.$file.'.tpl.html'))
			//{
				//include_once($config['local_path'].'html/'.$file.'.tpl.html');
				//return;
			//}
			//没有模板文件，开始替换处理
			//global $config;
			//print_r($data);
			//重定向CSS和JS文件引用路径
			//$html = file_get_contents(ROOT.'view/'.$filename);
			//$html = str_replace('href="css/' , 'href="'.WEB_ROOT.'/view/css/' , $html);
			//$html = str_replace('src="js/' , 'src="'.WEB_ROOT.'/view/js/' , $html);

			//$fp = fopen(ROOT.'cache/'.$file.'.cache.php', 'w+');	//生成处理后的缓存文件(cache)
			//fwrite($fp , $html);
			//fclose($fp);

			ob_start();							//浏览器cache控制

			include(ROOT .'/view/'. $file_path .$file.'.tpl.html');
			$info = ob_get_contents();
			//	解析模板里的PHP
			$info = $this->parse_tpl($data , $info);
			
			$now = time();
			$fp = fopen(ROOT .'/cache/'.$now.'.cache.php', 'w+');	//生成处理后的暂时缓存文件，方便查错（通常报错会导致“暂时缓存文件”未被删除）
			fwrite($fp , $info);
			fclose($fp);
			
			unset($info);
			ob_clean();		//清空缓冲区（上面有个include操作了）
			include(ROOT .'/cache/'.$now.'.cache.php');
			$info2 = ob_get_contents();
			//	如果文件夹不存在则逐级创建
			$file_path_part = ROOT.'/cache/';
			foreach($filename_arr as $path_val){
				if(!file_exists($file_path_part . $path_val)){echo $file_path_part . $path_val;
					mkdir($file_path_part . $path_val,0700);            //若不存在，则创建目录并赋予最高权限
			    }
			    $file_path_part .= '/'. $path_val;
			}
			$cache_name = $file_path .'@'. $global['user'] .'@'. $file;
			$fp = fopen(ROOT.'/cache/' . $cache_name .'.cache', 'w+');	//生成处理后的模板文件(html) -- 缓存文件！
			fwrite($fp , time().$info2 );						//在缓存文件的头部写入缓存文件生成时间，以控制缓存文件过期时间！
			fclose($fp);
		
			ob_end_clean();
			echo $info2;
			// 输出成功后再删除“暂时缓存文件”，方便中间出错时可以在缓存文件看到出错时的代码
			@unlink(ROOT .'/cache/'.$now.'.cache.php');
			//include_once(ROOT.'html/'.$file.'.tpl.html');
		}
		//控制器
		public function ctl($filename)
		{
			require_once('../controller/'.$filename);
		}
		//帮助文件
		public function hlp($filename)
		{
			require_once('../helper/'.$filename);
		}

		//解析模板
		public function parse_tpl($data , $html)
		{
			//重定向CSS和JS文件引用路径
			$html = str_replace('href="css/' , 'href="'.STATIC_ROOT.'css/' , $html);
			$html = str_replace('src="js/' , 'src="'.STATIC_ROOT.'js/' , $html);
			$html = str_replace('src="img/' , 'src="'.STATIC_ROOT.'img/' , $html);
			
			//if else语句输出 
			$html = str_replace('{if(' , '<?php if(' , $html);
			$html = str_replace(')}' , '){ ?>' , $html);
			//echo语句在模板中的输出	{echo ;}
			$html = str_replace('{echo' , '<?php echo ' ,$html);
			//php语句执行	{eval ;}
			$html = str_replace('{php' , '<?php ' ,$html);
			
			if(!empty($data))
			{
				$html = $this->parse_loop($data , $html);

				$html = '<?php $data='.substr($this->create_array($data) , 0 ,-1).'; ?>'.$html;				//打印构造的数组
			}

			//各表达式尾部统一处理
			$html = str_replace(';}' , '; ?>' , $html);
			$html = str_replace('{/loop}' , '<?php } ?>' , $html);		
			$html = str_replace('{/else}' , '<? }else{ ?>' , $html);	
			$html = str_replace('{/if}' , '<?php } ?>' ,$html);

			return $html;
		}
		//在模板中构造一个数组形式的字符串
		public function create_array($data)
		{
			$easyphp_array = 'array(';				//构造数组
			foreach( $data as $key=>$val )
			{
				if(!is_array($val))
				{
					$easyphp_array .= '\'' . $key . '\'=>\'' . $val . '\',';		//构造数组
					//
				}else{
					$easyphp_array .= '\'' . $key . '\'=>'.$this->create_array($val);		//构造数组
				}
			}
			return $easyphp_array .= '),';			//构造数组
		}
		//解析模板里的数组循环	{loop $arr}
		public function parse_loop($data , $html)
		{
			if(!is_array($data))
			{
				return $html;
			}	
			foreach($data as $key=>$val)		
			{
				$html = str_replace('{loop $'.$key.'}' , '<?php foreach($data[\''.$key.'\'] as $i=>$arr){ ?>' , $html);
				//如果此时的数组元素为一维数组，直接打印这个一维数组全部
				$html = str_replace('{$'.$key.'}' , '<?php echo $data[\''.$key.'\'][$i]; ?>' , $html);
				//注意：由于这里进入下一层循环，所以排在前面的子数组的子元素数组的key值不能和排在后面的子数组key值相同！	
				//总的来说所有数组的Key值最好不要有重复...
				$html = $this->parse_loop_show($key , $val , $html);	
			}
			return $html;
		}
		//解析模板里的loop循环里的值的输出的解析	{$arr}
		public function parse_loop_show($key , $val , $html)
		{
			if(!is_array($val))
			{
				return $html;
			}	
			foreach($val as $key2=>$val2)
			{
				if(is_array($val2))	//此时的数组元素还为多维数组，递归
				{
					$html = $this->parse_loop_show($key2 , $val2 , $html);
				} else {		//此时的数组元素为一维数组时
					$html = str_replace('{$'.$key2.'}' , '<?php echo $arr[\''.$key2.'\']; ?>' , $html);
				}	
			}
			return $html;
		}

		//	从程序名和$_GET参数里得出cache文件名
		function get_cache_name()
		{
			
		}

	}