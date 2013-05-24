<?php
/******************************************************
*	分页类（AJAX效果在IE下有问题）
*	code by acol
*
*	20100824 最简版
********************************************************/
	class Page{
		
		##################初始化
		public function __construct(){			
			//
		}
		###################################初始化各个值################################
		//sql语句
		public function sql()
		{
			global $config;
			return $config['page']['sql'];
		}
		//是否ajax
		public function ajax()
		{
			global $config;
			return $config['page']['ajax'];
		}
		//每页的页列表中显示几个页数
		public function page_listNum()
		{
			global $config;
			return $config['page']['page_listNum'];
		}//每页显示几条内容
		public function content_num()
		{
			global $config;
			return $config['page']['content_num'];
		}


		//上一页
		public function pre_page()
		{
			$pre_page = $this->page() - 1;
			if($pre_page < 1 ){$pre_page = 1;}
			return $pre_page;
		}
		//下一页
		public function next_page()
		{
			$next_page = $this->page() + 1;
			if($next_page > $this->last_page()){$next_page = $this->last_page();}
			return $next_page;
		}
		//后退一个页列表的页数
		public function pre_list()
		{
			$pre_list = $this->page() - $this->page_listNum();
			if($pre_list < 1){$pre_list = 1;}
			return $pre_list;
		}
		//前进一个页列表的页数
		public function next_list()
		{
			$next_list = $this->page() + $this->page_listNum();
			if($next_list > $this->last_page()){$next_list = $this->last_page();}
			return $next_list;
		}
		////首页
		public function first_page()
		{
			return '1';
		}
		//总内容数
		public function nums()
		{
			return $this->conn_db()->nums( $this->sql() );
		}
		//尾页
		public function last_page()
		{
			return ceil( $this->nums()/$this->content_num() );
		}
		//limit_X
		public function limit_X()
		{
			$limit_X = ($this->page() - 1) * $this->content_num();
			if($limit_X < 0)
				$limit_X = 0;
			return $limit_X;
		}
		//limit_Y
		public function limit_Y()
		{
			if( ($this->nums() - $this->limit_X()) < $this->content_num() ){
				return $limit_Y = $this->nums() - $this->limit_X();
			}else{
				return $limit_Y = $this->content_num();
			}
		}
		//页列表A标签样式
		public function page_list_a()
		{
			global $config;
			return $config['page']['page_list_a'];
		}
		//页列表A标签href
		public function article_url()
		{
			global $config;
			return $config['content']['article_url'];
		}
		//获取当前页
		public function page()
		{
			if(isset($_REQUEST['page']) && $_REQUEST['page']!='' && $_REQUEST['page']>1){
				$page = intval($_REQUEST['page']);
			}else{
				$page = 1;		//当前页不能小于1或为空
			}
			if($page >= $this->last_page()){
				$page = $this->last_page();			//当前页不能超过最大页数
			}
			return $page;
		}
		//获取当前分类 （可选）
		public function sid()
		{
			global $config;
			if(isset($_REQUEST['sid']) && $_REQUEST['sid']!='' && $_REQUEST['sid']>1){
				$sid = intval($_REQUEST['sid']);
			}else{
				$sid = $config['page']['sid'];		
			}
			return $sid;
		}

		############连接数据库，数据库操作
		public function conn_db()
		{
			return new Db();
		}	

		##############显示数据处处理	
		public function get_content(){	    ////抓取当前页所有数据！！如果不采取本分类样式，可以只调用这个获取当前页内容，然后生成页列表////
			$sql = $this->sql() . $this->conn_db()->limit($this->limit_X(),$this->limit_Y()) ;
			$arr = $this->conn_db()->getAll($sql);
				//echo $sql;
			if($arr!=''){	
				return $arr;
			}else{
				return false;	
			}
		}	

		############页列表制作	（---改天优化这个！---）
		public function left_page(){							///////////最左侧为第几页////
			$left = ( ( ceil($this->page()/$this->page_listNum())-1) * $this->page_listNum() )+1;
			if($left<0){$left=0;}
			return $left;
			}	
		public function right_page(){						//////最右侧为第几页，不能超过最大页数$max_page//////
			$right_page = ceil($this->page()/$this->page_listNum())*$this->page_listNum();
			if($right_page > $this->last_page()){                         
				return $this->last_page();
				}else{
				return $right_page;
				}
			}
		public function create_page_list(){						////生成页列表////
			$html = '';
			if($this->ajax() == '1'){							//**超链接不跳转，值通过改变ID值来传递**//
				//设置传值隐藏域
				$html .= '<form id="acol" name="acol" method="post" action="test.php">';
				$html .= '<input id="page_form" name="page" type="hidden" value="1" />';
				$html .= '<input id="sid_form" name="sid" type="hidden" value="1" />';
				$html .= '</form>';

					if($this->page_list_a() == ''){				//默认样式
							$html .= '<a class="listPage" href="javascript:void(0)" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;" onclick="document.getElementById(\'page_form\').value=\'1\';document.getElementById(\'sid_form\').value=\''.$this->sid().'\' ">首页</a>';

							$html .= '<a class="listPage" href="javascript:void(0)" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;" onclick="document.getElementById(\'page_form\').value=\''.$this->pre_list().'\';document.getElementById(\'sid_form\').value=\''.$this->sid().'\' "> << </a>';
							
							$html .= '<a class="listPage" href="javascript:void(0)" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;" onclick="document.getElementById(\'page_form\').value=\''.$this->pre_page().'\';document.getElementById(\'sid_form\').value=\''.$this->sid().'\' "> < </a>';
					}else{
							$page_list_a = '<a class="listPage" href="javascript:void(0)" '.$this->page_list_a().' onclick="document.getElementById(\'page_form\').value=\'@\';document.getElementById(\'sid_form\').value=\'*\' " >';		
							if($this->sid()!='')
							{
								$search = array('@','*');
								$replace0 = array("1",$this->sid());
								$replace1 = array($this->pre_list(),$this->sid());
								$replace2 = array($this->pre_page(),$this->sid());

								$html .= str_replace($search,$replace0,$page_list_a).'首页</a>';
								$html .= str_replace($search,$replace1,$page_list_a).' << </a>';			
								$html .= str_replace($search,$replace2,$page_list_a).' < </a>';
							}else{
								$html .= str_replace('@','1',$page_list_a).'首页</a>';
								$html .= str_replace('@',$this->pre_list(),$page_list_a).' << </a>';			
								$html .= str_replace('@',$this->pre_page(),$page_list_a).' < </a>';
							}
					}
		############循环生成页列表	
						for($num=$this->left_page();$num<=$this->right_page();$num++){
							if($num==$this->page()){
								$html .= '<b style="margin:3px">'.$num.'</b>';
							}else{
								if($this->page_list_a() == ''){				//默认样式
									$html .= '<a class="listPage" href="javascript:void(0)" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;" onclick="document.getElementById(\'page_form\').value=\''.$num.'\';document.getElementById(\'sid_form\').value=\''.$this->sid().'\' ">'.$num.'</a>';
								}else{
									
									if($this->sid()!=''){				//是否存在分类
										$search = array('@','*');
										$replace = array($num,$this->sid());
										$html .= str_replace($search,$replace,$page_list_a).$num.'</a>';
									}else{
										$html .= str_replace('@',$num,$page_list_a).$num.'</a>';
									}		
									
								}
							}
						}
						if($this->page_list_a() == ''){				//默认样式表				
							$html .= '<a class="listPage" href="javascript:void(0)" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;" onclick="document.getElementById(\'page_form\').value=\''.$this->next_page().'\';document.getElementById(\'sid_form\').value=\''.$this->sid().'\' "> > </a>';

							$html .= '<a class="listPage" href="javascript:void(0)" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;" onclick="document.getElementById(\'page_form\').value=\''.$this->next_list().'\';document.getElementById(\'sid_form\').value=\''.$this->sid().'\' "> >> </a>';	
							
							$html .= '<a class="listPage" href="javascript:void(0)" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;" onclick="document.getElementById(\'page_form\').value=\''.$this->last_page().'\';document.getElementById(\'sid_form\').value=\''.$this->sid().'\' ">尾页</a>';
						}else{
							if($this->sid()!=''){				//是否存在分类
								$search = array('@','*');
								$replace0 = array($this->next_page(),$this->sid());
								$replace1 = array($this->next_list(),$this->sid());
								$replace2 = array($this->last_page(),$this->sid());

								$html .= str_replace($search,$replace0,$page_list_a).' > </a>';
								$html .= str_replace($search,$replace1,$page_list_a).' >> </a>';			
								$html .= str_replace($search,$replace2,$page_list_a).'尾页</a>';
							}else{
								$html .= str_replace('@',$this->next_page(),$page_list_a).' > </a>';
								$html .= str_replace('@',$this->next_list(),$page_list_a).' >> </a>';			
								$html .= str_replace('@',$this->last_page(),$page_list_a).'尾页</a>';

							}	
						}
						$html .= '  共'.$this->last_page().'页';

			}else{						//***超链接跳转，非AJAX***//

						if($this->page_list_a() == ''){				//默认样式
							if($this->sid()!=''){				//是否存在分类
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page=1&sid='.$this->sid().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;">首页</a>';
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$this->pre_list().'&sid='.$this->sid().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;"> << </a>';
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$this->pre_page().'&sid='.$this->sid().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;"> < </a>';		
							}else{
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page=1" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;">首页</a>';
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$this->pre_list().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;"> << </a>';
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$this->pre_page().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;"> < </a>';	
							}
						}else{
							$page_list_a = '<a class="listPage" href="@" '.$this->page_list_a().' >';			//组装完整a标签
							if($this->sid()!=''){				//是否存在分类
								$href0 = $_SERVER['PHP_SELF'].'?page=1&sid='.$this->sid();
								$href1 = $_SERVER['PHP_SELF'].'?page='.$this->pre_list().'&sid='.$this->sid();
								$href2 = $_SERVER['PHP_SELF'].'?page='.$this->pre_page().'&sid='.$this->sid();
							}else{
								$href0 = $_SERVER['PHP_SELF'].'?page=1';
								$href1 = $_SERVER['PHP_SELF'].'?page='.$this->pre_list();
								$href2 = $_SERVER['PHP_SELF'].'?page='.$this->pre_page();
							}		
							$html .= str_replace('@',$href0,$page_list_a).'首页</a>';
							$html .= str_replace('@',$href1,$page_list_a).' << </a>';
							$html .= str_replace('@',$href2,$page_list_a).' < </a>';
						}
		############循环生成页列表	
						for($num=$this->left_page();$num<=$this->right_page();$num++){
							if($num==$this->page()){
								$html .= '<b style="margin:3px">'.$num.'</b>';
							}else{
								if($this->page_list_a() == ''){				//默认样式
									if($this->sid()!=''){				//是否存在分类
										$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$num.'&sid='.$this->sid().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;"  target="main">'.$num.'</a>';
									}else{
										$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$num.'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;"  target="main">'.$num.'</a>';
									}
								}else{
									if($this->sid()!=''){				//是否存在分类
										$href = $_SERVER['PHP_SELF'].'?page='.$num.'&sid='.$this->sid();
									}else{
										$href = $_SERVER['PHP_SELF'].'?page='.$num;
									}		
									$html .= str_replace('@',$href,$page_list_a).$num.'</a>';
								}
							}
						}
						if($this->page_list_a() == ''){				//默认样式表	
							if($this->sid()!=''){				//是否存在分类
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$this->next_page().'&sid='.$this->sid().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;"> > </a>';
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$this->next_list().'&sid='.$this->sid().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;"> >> </a>';
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$this->last_page().'&sid='.$this->sid().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;">尾页</a>';
							}else{
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$this->next_page().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;"> > </a>';
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$this->next_list().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;"> >> </a>';
								$html .= '<a href="'.$_SERVER['PHP_SELF'].'?page='.$this->last_page().'" style="background:#cff;margin:0 3px;padding:1px 6px 3px 6px;border:1px solid #ccc;">尾页</a>';
								$html .= '  共'.$this->last_page().'页';
							}
						}else{
							if($this->sid()!=''){				//是否存在分类
								$href1 = $_SERVER['PHP_SELF'].'?page='.$this->next_page().'&sid='.$this->sid();
								$href2 = $_SERVER['PHP_SELF'].'?page='.$this->next_list().'&sid='.$this->sid();
								$href3 = $_SERVER['PHP_SELF'].'?page='.$this->last_page().'&sid='.$this->sid();
							}else{
								$href1 = $_SERVER['PHP_SELF'].'?page='.$this->next_page();
								$href2 = $_SERVER['PHP_SELF'].'?page='.$this->next_list();
								$href3 = $_SERVER['PHP_SELF'].'?page='.$this->last_page();
							}		
							$html .= str_replace('@',$href1,$page_list_a).' > </a>';
							$html .= str_replace('@',$href2,$page_list_a).' >> </a>';
							$html .= str_replace('@',$href3,$page_list_a).'尾页</a>';
						}
						$html .= '  共'.$this->last_page().'页';
						
			}
			return $html;
		}		//this function end
		
		
		
		
		
		
		
		
		
	}	//class end	
