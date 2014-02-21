<?php
	/**************************************************
	*code by acol						
	*
	*下边选项中带*号的为必填
	*
	*如果同一个站在多处地方调用的必填项，如页列表，内容数，sql语句等都不同的话，请copy当前文件到调用目录进行修改，然后调用即可
	*
	************************************************/
	@session_start();
	date_default_timezone_set('Asia/Shanghai');
	//获取程序根目录
	define('ROOT' , dirname(dirname(__FILE__)));
	//define('WEB_ROOT' , 'http://'.str_replace('index.php' , '' ,$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']));
	define('WEB_ROOT' , 'http://xiaoqiqiu.com/');
	define('STATIC_ROOT' , 'http://static.xiaoqiqiu.com/');

	$global['user'] = 'acol';			//	当前用户
	$global['is_mine'] = 0;				//	是否是当前用户本人空间

	$config = array();
	///数据库连接设置
	$config['database']['host'] = 'localhost';			//*
	$config['database']['port'] = '3366';				//*
	$config['database']['user'] = 'root';				//*
	$config['database']['pass'] = 'root';				//*
	$config['database']['dbname'] = 'acol_blog';			//*
	$config['database']['charset'] = 'utf8';			//*

	///分页设置	
	$config['page']['sql'] = ' SELECT * FROM dp_news ';				//*计算数据总量（总页数）的SQL及抓取内容sql
	$config['page']['sid'] = '';									//当前类别的文章			（无则不填，填的话会显示在url值里，可以抓取）
	$config['page']['page_listNum'] = 5;							//*每页的页列表中显示几个页数
	$config['page']['content_num'] = 8;							//*每页显示几条内容

	//*点击页列表当前页面是否跳转,"0"为正常方式跳转，填"1"则为无刷新方式传值,两存值的隐藏域分别为：存放page值的<input id="page_form" name="page" type="hidden" value="" />和存放sid值的<input id="sid_form" name="sid" type="hidden" value="" />，用JS抓取后用AJAX传值给后台，传值方式是post或者get都行
	//如果值为1---无刷新传值，则最好将处理页面（php，如test.php）和显示页面（Html或者php，如test.html）分离，然后通过JS文件（如ajax.js）连接彼此
	$config['page']['ajax'] = '1';
			
	//自定义页列表A标签的前半截<a href=xx xx>里的属性（选填）
	//如果是AJAX方式，则设置href="javascript:void(0)"和id="@"
	//如果内容是放在iframe里的（比如后台），要在$config['page']['page_list_a']值里加上target="iframeName"
	$config['page']['page_list_a'] = ' style="background:#ccf;margin:0 5px;border:1px solid #fcf;padding:2 3 2 3px;" ';

	/////自定义内容显示层后的设置 (为了自动排版需要的参数，选填！！选择了容器之后再填，正确填写会输出对应的内容)
	$config['content']['article_url'] = 'article.php';				//数据超链接的url (填了这项，container必选选<ul>标签)	

	//	设置cache文件过期时间
	$config['cache']['timeout'] = 0;			//	单位是秒

	//	设置上传图片路径
	$config['cache']['pic_path'] = 'upload/img/';		//	相对于根目录
	//	设置上传后压缩的图片的路径
	$config['cache']['compress_pic_path'] = 'upload/imgCompress/';

	header('Content-type:text/html;charset=utf-8');
	include_once(ROOT."/helper/useful.func");		//	帮助函数
	//include_once(ROOT."/helper/Url.hlp");			//	路由
	//include_once(ROOT."/helper/Load.hlp");			//	页面cache和模版引擎
	//include_once(ROOT."/helper/Db.hlp");			//	DB操作
	//include_once(ROOT."/helper/Page.hlp");			//	分页
	//include_once(ROOT."/helper/Passport.hlp");		//	登录
	//include_once(ROOT."/helper/Controller.hlp");	//	controller父类
	//include_once(ROOT."/helper/Model.hlp");	//	model父类