<?php $data=array('db'=>array('0'=>array('id'=>'70','username'=>'milk','title'=>'','content'=>'<p>
	这里还啥都没有<img alt="smiley" height="96"  src="http://xiaoqiqiu.com/view/default.jpg"  title="smiley" width="96" / data="http://xiaoqiqiu.com/ckeditor/plugins/smiley/images/01.gif"  lazyload="1" />，自己发布咯</p>
','sort_id'=>'0','time'=>'2012-11-30 21:49:24','ip'=>'113.64.109.209','cmt_num'=>'2','comment_num'=>'0',),),'userInfo'=>array('0'=>'2','id'=>'2','1'=>'milk','username'=>'milk','2'=>'df2efa060e335f97628ca39c9fef5469ab3cb837','password'=>'df2efa060e335f97628ca39c9fef5469ab3cb837','3'=>'milk的小窝','desc'=>'milk的小窝','4'=>'http://xiaoqiqiu.com/view/img/14.jpg','face'=>'http://xiaoqiqiu.com/view/img/14.jpg','5'=>'','tqq'=>'','6'=>'','weibo'=>'','7'=>'1352560785','login_time'=>'1352560785','8'=>'','login_ip'=>'','9'=>'1352560785','reg_time'=>'1352560785','10'=>'1','status'=>'1',),'page'=>'1','last_page'=>'1','user'=>'milk','is_mine'=>'0',); ?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>维尼的小气球 - acol</title>
		<meta name="Keywords" content="小气球，维尼的小气球，acol的小气球，简单交互是我的追求" />
		<meta name="Description" content="小气球，维尼的小气球，acol的小气球，简单交互是我的追求" />
		<link rel="shortcut icon" href="weini.ico" type="image/x-icon" />
		<link href="http://s1.56img.com/style/i/v3/css/global/global.css" type="text/css" rel="stylesheet"/>
		<link href="http://xiaoqiqiu.com/view/css/reset.css" type="text/css" rel="stylesheet"/>
		<link href="http://xiaoqiqiu.com/view/css/main.css" type="text/css" rel="stylesheet"/>
		<link href="http://xiaoqiqiu.com/view/css/pop.css" type="text/css" rel="stylesheet"/>
		<link href="http://s1.56img.com/style/include/module/v1/combo/css/module_v.1.css" type="text/css" rel="stylesheet"/>
		<link href="http://xiaoqiqiu.com/plugin/uploadify/uploadify.css" rel="stylesheet" type="text/css" />
		<link type="text/css" rel="stylesheet" href="http://xiaoqiqiu.com/plugin/SyntaxHighlighter/Styles/shCore.css"/>
		<link type="text/css" rel="stylesheet" href="http://xiaoqiqiu.com/plugin/SyntaxHighlighter/Styles/shThemeDefault.css"/>

		<script type="text/javascript" src="http://xiaoqiqiu.com/view/js/jquery.min.js" ></script>
		<script type="text/javascript" src="http://xiaoqiqiu.com/view/js/helper.js"></script>
		<script type="text/javascript" src="http://xiaoqiqiu.com/plugin/SyntaxHighlighter/Scripts/shCore.js"></script>
		<script type="text/javascript" src="http://xiaoqiqiu.com/plugin/SyntaxHighlighter/Scripts/shBrushes.js"></script>
		<script type="text/javascript">
			//	初始化
			var WEB_ROOT = '<?php echo  WEB_ROOT; ?>',
				IS_MINE = <?php echo  $data["is_mine"]; ?>,
				USER = '<?php echo  $data["user"]; ?>';
			SyntaxHighlighter.config.clipboardSwf = WEB_ROOT +'plugin/SyntaxHighlighter/Scripts/clipboard.swf';
			SyntaxHighlighter.all();
		</script>
	</head>
	<body style="-webkit-transform: rotate(-5deg);">
	<div id="top_loading" class="top_loading floater radius"><img src="http://xiaoqiqiu.com//view/top_loading.gif"/> 努力加载中... </div>
	<div class="top">
		<?php if(!isset($_SESSION['username'])){ ?>
		<span id="login_top">未登录，现在<a href="javascript:;" onclick="$_Index.ini();return false;">登录</a>？ 没有账号，<a href="javascript:;" onclick="$_Index.reg();return false;">注册</a>？</span>
		<? }else{ ?>
		<span id="login_top">当前用户：<a href="http://xiaoqiqiu.com/<?php echo  $_SESSION['username']; ?>"><?php echo  $_SESSION['username']; ?></a> ，<a href="javascript:;" onclick="$_Index.edit();return false;">修改资料</a> &nbsp;&nbsp;/&nbsp;&nbsp; <a href="javascript:;" onclick="$_Index.logout();return false;">退出</a>？</span>
		<?php } ?>
	</div>

	<div class="container clear" id="container">
		<?php if($data["user"] == 'acol'){ ?>
		<p>< 业余时间纯手工打造的半成品，推荐使用chrome或者高版本IE浏览。 ></p>
		<?php } ?>
		<div class="left">
			<div class="header" id="header">
				<a id="add_something" title="添加文章，图片，视频" class="add_something" href="javascript:;" onclick="return false;" <?php if($global['is_mine'] != 1){ ?> style="display:none;" <?php } ?>>
				</a>
				<span><?php echo  $data['userInfo']['desc']; ?></span>
			</div>

			<!-- <a class="hide_content" id="hide_content" href="javascript:;"> x </a> -->
			<div id="content">
				<?php foreach($data['db'] as $i=>$arr){ ?>
					<div class="circle radius" aid="<?php echo $arr['id']; ?>">
						<div class="comment-float"><em><a href="javascript:;" alt="<?php echo $arr['id']; ?>"><?php echo $arr['cmt_num']; ?></a></em></div>
						<?php if($data["is_mine"] == 1){ ?>
						<a class="close" href="javascript:;" onfocus="this.blur();" onclick="$_Add.del_article(<?php echo $arr['id']; ?>);return false;"> × </a>
						<a class="edit" href="javascript:;" onfocus="this.blur();" onclick="$_Add.edit_article(<?php echo $arr['id']; ?>);return false;"> + </a>
						<?php } ?>
						<div class="content">
							<?php echo $arr['content']; ?>
						</div>
						<div class="comment_div">
							<span class="author"> <?php echo $arr['username']; ?> 于 <?php echo $arr['time']; ?> 发表</span>
							<span class="comment"><a href="javascript:;" alt="<?php echo $arr['id']; ?>">我有想法(<?php echo $arr['cmt_num']; ?>)</a></span>
						</div>
					</div>
					<div class="left_shadow">
						<div class="right_shadow"></div>
					</div>
				<?php } ?>
			</div>
		</div>

		<div class="right" id="right_menu">
			<div class="face radius">
				<img height="150px" width="150px" src="<?php echo  $data['userInfo']['face']; ?>"/>
				<p><label id="now_user"></label></p>
			</div>
			<div class="menu_click radius" id="photoWall">
				<span>图片墙</span>
				<div class="slide_item">
					<a href="/<?php echo  $data["user"]; ?>/wall"><img src="http://xiaoqiqiu.com/view/img/wall.jpg"/></a>
				</div>
			</div>
			<?php if( !empty($data['userInfo']['weibo']) ){ ?>
			<div class="menu_click radius">
				<em class="weibo_logo">&nbsp;&nbsp;&nbsp;&nbsp;</em>新浪微博
				<div class="slide_item" style="display:none;"><?php echo  $data['userInfo']['weibo']; ?></div>
			</div>
			<?php } ?>
			<?php if( !empty($data['userInfo']['tqq']) ){ ?>
			<div class="menu_click radius">
				<em class="tqq_logo">&nbsp;&nbsp;&nbsp;&nbsp;</em>企鹅微博
				<div class="slide_item" style="display:none;"><?php echo  $data['userInfo']['tqq']; ?></div>
			</div>
			<?php } ?>
			<div class="menu_click radius">
				<em>友情链接</em>
				<div class="slide_item">
					<ul>
						<li><a href="http://www.56.com" target="_blank">56视频</a></li>
						<li><a href="http://www.xiaoqiqiu.com/milk" target="_blank">牛奶的空间</a></li>
						<li><a href="http://somoban.net/" target="_blank">海滨的搜模板</a></li>
						<li><a href="http://www.68waibo.com/" target="_blank">海滨的歪脖</a></li>
						<li><a href="http://www.langag.net/" target="_blank">烂GAG</a></li>
						<li><a href="http://blogger.readplan.com/" target="_blank">小勇的blog</a></li>
					</ul>
				</div>
			</div>
		</div>
		
		<span class="btn radius" id="page_btn" title="next page" last_page="<?php echo  $data['last_page']; ?>" onclick="$_Index.switch_div('content','next','right')" onfocus="this.blur();" style="-webkit-user-select:none;">
			<label id="now_page"><?php echo  $data['page']; ?></label>/<?php echo  $data['last_page']; ?>
		</span>
		<!-- <span class="back_btn" id="page_back" title="pre page" onclick="$_Index.switch_div('content','pre')"></span> -->
		<span class="back_btn2 radius" id="page_back" title="pre page" onclick="$_Index.switch_div('content','pre','left')"> 《 </span>
	</div>
	<div id="gotop" style="position: fixed; bottom: 50px; left: 1000px; cursor: pointer;display:none;" title="猛击我可以灰~">
		<img src="http://xiaoqiqiu.com/view/img/gotop.png" style="width:64px; height:64px;" />
	</div>

	<div class="bottom" id="bottom">
		
	</div>

	<div id="weatherContent"></div>
	
	<script type="text/javascript" src="http://xiaoqiqiu.com/view/js/index.js?v1"></script>
	<script type="text/javascript" src="http://xiaoqiqiu.com/view/js/space_ui_v2.js"></script>
	<script type="text/javascript" src="http://xiaoqiqiu.com/view/js/pop.js?v=1"></script>
	<script type="text/javascript" src="http://xiaoqiqiu.com/view/js/add.js"></script>
	<script type="text/javascript" src="http://xiaoqiqiu.com/plugin/uploadify/jquery.uploadify-3.1.min.js"></script>
	<script type="text/javascript" src="http://xiaoqiqiu.com/view/js/curtain.js"></script>
	<script type="text/javascript" src="http://xiaoqiqiu.com/view/js/weather.js"></script>
	<script type="text/javascript" src="http://xiaoqiqiu.com/view/js/unlock.js"></script>
	<script type="text/javascript" src="http://xiaoqiqiu.com/view/js/marquee.js"></script>
	<script type="text/javascript" src="http://xiaoqiqiu.com/view/js/profile.js"></script>
	<!--<script defer type="text/javascript" charset="utf-8" src="http://julying.com/lab/weather/get/jquery.weather!parentid=acol_weather&zIndex=1&move=true&autoDrop=true&jquery=false&style=blue&area=client&city=101280101"></script>-->
		</body>
</html>
