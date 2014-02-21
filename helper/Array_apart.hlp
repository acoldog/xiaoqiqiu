<?php
/*
*	20100824	对数组数据进行分页显示
*	对分页类Page_apart进行部分重载实现
*	code by acol
*/
	class Array_apart extends Page_apart
	{
		public $data_arr = array();
	
		public function __construct($data_arr)
		{
			//判断是否为数组
			if(is_array($data_arr))
			{
				$this->data_arr = $data_arr;
			}else{
				return;
			}
		}
		//总内容数（数组长度）
		public function nums()
		{
			return count($this->data_arr);
		}

		//limit_Y
		public function limit_Y()
		{
			if( ($this->nums() - $this->limit_X()) < $this->content_num() ){
				$limit_Y = $this->nums() - $this->limit_X();
			}else{
				$limit_Y = $this->content_num();
			}
			return $this->limit_X() + $limit_Y;
		}

		//获取当前分类 （可选，暂时置空）
		public function sid()
		{
			return;
		}

		##############显示数据处处理	
		public function get_content(){	    ////抓取当前页所有数据！！如果不采取本分类样式，可以只调用这个获取当前页内容，然后生成页列表////
			for($i=$this->limit_X() ; $i<$this->limit_Y() ; $i++)
			{
				$data[] = $this->data_arr[$i];
			}
			if($data!='' && count($data)!='0'){	
				return $data;
			}else{
				return false;	
			}
		}


	}		// class end