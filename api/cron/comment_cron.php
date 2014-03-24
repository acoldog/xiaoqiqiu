<?php
	/**
	 * 跑文章评论数cron脚本
	 * @author acol <[email]>
	 * 2012-12-26
	 */
	include_once '../../config/config.inc.php';

	$db = new Db();
	$cron_num = 10;			//	一次跑几条
	$limit_time = 20;		//	限制脚本执行时间

	$start_time = getmicrotime();
	//	从cron表取任务起始id
	$sql = 'SELECT oid FROM cmt_cron ORDER BY oid DESC LIMIT 1';
	$res = $db->getOne($sql);
	if($res){
		$cron_id = $res['oid'];
	}else{
		$cron_id = 0;
	}
	//	从comment表取数据
	$sql = 'SELECT id,diary_id FROM ab_comment WHERE id>'. $cron_id .' ORDER BY id ASC LIMIT '. $cron_num;
	$res = $db->getAll($sql);
	if($res){
		$num = 0;
		$oid = 0;
		foreach($res as $val){
			if($val['diary_id'] > 0){
				$u_sql = 'Update ab_diary SET cmt_num = cmt_num+1 WHERE id='. $val['diary_id'];
				$res2 = $db->query($u_sql);
				$num++;
				$oid = $val['id'];
			}
			$waste_time = getmicrotime() - $start_time;
			if($waste_time > $limit_time){
				break;
			}
		}
		//	更新oid
		if($num > 0){
			if($num < $cron_num)$plan = 0;
			else
				$plan = 1;
			$data_arr = array(
				'oid'		=>$oid,
				'plan'		=>$plan,
				'time'		=>date('Y-m-d H:i:s' , time())
			);
			$res3 = $db->insert($data_arr , 'cmt_cron');
		}
		echo '<br />耗费时间：'. $waste_time;
		echo '<br />导了几条评论：'. $num;
		exit;
	}else{
		echo '<br />当前没有新的评论数据可以跑！';
		exit;
	}



	//	获取系统时间，精确到毫秒
	function getmicrotime(){ 
	    list($usec, $sec) = explode(" ",microtime()); 
	    return ((float)$usec + (float)$sec); 
	}