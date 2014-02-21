<?php

	class Video_mod extends Model{
		public function __construct(){
			parent::__construct();
		}
		
		//	取视频列表
		public function getVideoData($page , $rows){
			$data = Http::Get('kan.56.com', 'api/nowPlayinglist.phtml?rows='. $rows .'&page='. $page);
			$data = json_decode($data,TRUE);
			$total = $data['total'];
			$data = $data['data'];
			if(empty($data))return array('total'=>$total , 'data'=>array());
			foreach ($data as $key => $value) {

				$data[$key]['img'] = $value['img'];
				$data[$key]['flvUrl'] = $value['flvUrl'];
				$data[$key]['save_time'] = strtotime($value['save_time']);
				//	取用户信息
				//$userInfo = Space::GetProfile($value['user_id']);
				//$userInfo['Photo'] = User::GetPhotoUrl($value['user_id'], FALSE);
				//$object_setting = new Setting($value['user_id']);
				//$setting = $object_setting->GetSettingFromMongoDb();
				//$userInfo['user_type'] = $setting['user_type'];
				//$data[$key]['user_info'] = $userInfo;
				
				//	取评论
				//$data[$key]['comment'] = $this->GetCommentByVid($value['id']);
				$commentData = json_decode($value['comment'] , true);//print_r($commentData);
				$commentDataWeb = array();
				//	随机取2，3条
				$commentNum = mt_rand(2,3);
				$i = 0;
				foreach($commentData['commentList'] as $val2){
					if($i >= $commentNum)break;
					//	假如评论者是游客评论
					if($val2['comment_userid'] == '56com' || $val2['type'] != 'web'){

						if($val2['type'] == 'sina'){
							$val2['commentUserInfo']['photo'] = 'http://uface.56img.com/photo/temp/60/head_2.jpg';
						}else if($val2['type'] == 'tqq'){
							$val2['commentUserInfo']['photo'] = 'http://uface.56img.com/photo/temp/60/head_5.jpg';
						}else if($val2['type'] == 'renren'){
							$val2['commentUserInfo']['photo'] = 'http://uface.56img.com/photo/temp/60/head_renren.jpg';
						}else{
							$val2['commentUserInfo']['photo'] = 'http://uface.56img.com/photo/temp/60/head_1.jpg';
						}

						if (isset($val2['upic'])) {
							$val2['commentUserInfo']['photo'] = $val2['upic'];
							if($val2['type'] == 'tqq'){
								$val2['commentUserInfo']['photo'] .= '/40';
							}
						}
						if(trim($val2['uname']) == ''){
							$val2['commentUserInfo']['nickname'] = $val2['locate'] .'网友';
						}else{
							$val2['commentUserInfo']['nickname'] = $val2['uname'];
						}
					} else {
						//	取评论用户的信息
						//$val2['commentUserInfo'] = User::GetProfile2011($val2['comment_userid'] , false);
					}
					//	消除空白符
					$val2['content'] = preg_replace("/[\s]{2,}/", "", $val2['content']);
					$commentDataWeb[$i++] = $val2;
				}
				$data[$key]['comment'] = $commentDataWeb;
				
				return $data;
			}
		}

	}	// class end