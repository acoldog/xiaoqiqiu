<?php
/****************************
*数据库执行类   09-8-18
*未完待续			acol
***************************/


class Db{
	///////////连接数据库///////////
	public $db_name;	//数据库名
	public $sql_sever;		//服务器
	public $username;		//SQL用户名
	public $password;	//SQL密码
	public $port;		//mysql端口
	public $conn;
	//////////////构造SQL语句里的值//////////////////
	public $table_name;    //要查找的表名
	public $form_name;     //要查找的列名
	public $table;			//表名
	public $where_arr;			//WHERE条件句数组
	public $order_by;		//按哪个列来排序
	public $method;			///排序方式
	public $limit_X;		/////由当前页$page算出的抓取文章的起始位置
	public $limit_Y;            ///一个页面中要显示的文章数
		
		function __construct($username='',$password='',$db_name='',$host="localhost",$port="3306")
		{
			global $config;			
			if(is_array($config))
			{
				$this->host = $config['database']['host'].':'.$config['database']['port'];
				$this->username = $config['database']['user'];
				$this->password = $config['database']['pass'];
				$this->db_name = $config['database']['dbname'];
			}else{
				$this->host = $host.':'.$port;
				$this->username = $username;
				$this->password = $password;
				$this->db_name = $db_name;
			} 
			$this->conn = mysql_connect($this->host,$this->username,$this->password) or die ('error to connect mysql');
			mysql_select_db($this->db_name,$this->conn);
			if(isset($config['database']['charset']))
			{
				mysql_query("SET NAMES '{$config['database']['charset']}', sql_mode=''");
			}
		}
		////////////重置编码/////////
		public function setCode($code)
		{				
			mysql_query("SET NAMES $code");
		}
			//////////生成SQL语句/////////
		public function select($form_name,$table_name)
		{
			$sql = "SELECT $form_name FROM $table_name ";	
			return $sql;
		}
		public function where($where_arr){				//WHERE条件句
			foreach($where_arr as $key=>$value){
				$where[] = $key.'=\''.$value.'\'';
				}
			$where_arr = implode(' AND ',$where);		
			$sql = " WHERE ".$where_arr;
			return $sql;
			}	
		public function order_by($order_by,$method){        //order by子句
			$sql = " ORDER BY $order_by $method ";
			return $sql;
			}	
		public function limit($limit_X,$limit_Y){ 			//limit子句
			$sql = " LIMIT $limit_X,$limit_Y ";
			return $sql;
			}	
			////////////执行SQL语句////////////////
		public function query($sql){										//直接执行sql
			//echo $sql;
			$result = mysql_query($sql) or die (mysql_error());				//报错模式
			//$result = @mysql_query($sql);
			return $result;
			}		
			////////////抓取数据/////////////////	
		public function nums($sql){                                     //计算数据总数
			$num = @mysql_num_rows($this->query($sql));
			//if($num=='0'){return false;}
			return $num;
		}	
		public function getOne($sql , $type=0){									//抓取一条数据，type=1时，按mysql_fetch_assoc方式抓取
			$result = $this->query($sql);
				if($result)
				{
					if($type == 1)
					{
						$data = @mysql_fetch_assoc($result);
					}else{
						$data = @mysql_fetch_array($result);
					}					
					return $data;
				}else{
					return '';	
				}				
			}	      
		public function getAll($sql , $type=0){						//抓取多组数据，返回一个2维数组
			$result = $this->query($sql);
			if($type == 1)
			{
				while( $data = @mysql_fetch_assoc( $result ) )
				{
					$arr[] = $data;
				}
			}else{
				while( $data = @mysql_fetch_array( $result ) )
				{
					$arr[] = $data;
				}
			}
			
			if(!isset($arr)){$arr='';}					//处理当数据库为空的情况（不报错）
			return $arr;	
			}
		public function getTableOne($table){				//抓取指定表的一条数据
			$sql = "SELECT * FROM ".$table." LIMIT 0,1 ";
			$data = @mysql_fetch_array($this->query($sql));
			return $data;
			}
		public function getTableAll($table){				//抓取指定表的全部数据
			$sql = "SELECT * FROM ".$table;
			$result = $this->query($sql);
			while( $data = @mysql_fetch_array( $result ) ){
				$arr[] = $data;
				}
			return $arr;	
			}		
		///////////////查询/////////////////
/*		public function select($table,$col,$where_arr){
			查询比较多情况，不作细化，参照‘生成SQL语句’
			}*/
		///////////////插入//////////////////
		public function insert($insert_arr , $table){	//$data = array('col1'=>val1,'col2'=>val2,...);
			foreach($insert_arr as $key=>$value){
				$col[] = '`' . $key . '`';
				$val[] = '\'' . $value . '\'';
				}
				$col = implode(',',$col);
				$val = implode(',',$val);
			$sql = "INSERT INTO ".$table." ( ".$col." ) VALUES ( ".$val." );";
			$result = $this->query($sql);
			return $result;
			}
		////////////////修改//////////////////
		public function update($update_arr , $where_arr , $table){		//$update_arr和$where_arr为数组
			foreach($update_arr as $key=>$value){
				$update[] = '`' . $key . '`=\''.$value.'\'';
				}
			$update_arr = implode(',',$update);			//修改句
			$sql = "UPDATE `" . $table . "` SET " . $update_arr . $this->where($where_arr);
			$result = $this->query($sql);
			return $result;
			}	
		///////////////删除///////////////////
		public function del($where_arr , $table){
			$sql = "DELETE FROM " . $table . $this->where($where_arr);
			$result = $this->query($sql);
			return $result;
			}
		/////////////结束操作/////////////
		public function free($result)
		{
			return mysql_free_result($result);
		}
		//////////////清空数据表内容////////////////
		public function clear($table)
		{
			return $this->query("TRUNCATE TABLE $table ");	
		}
		//////////////关闭连接/////////////
		public function close()
		{
			mysql_close($this->conn);
		}
		////////////////重置主键累加的初始值///////////
	}
