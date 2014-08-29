<?php

/**
*   controller
*/
class Diary_ctl extends Controller{
    function __construct(){
        parent::__construct(__CLASS__);
    }
    function __destruct(){
        parent::__destruct();

        global $global;
        //导入模板
        $load = new Load();
        $data['user'] = $global['user'];
        $data['is_mine'] = $global['is_mine'];
        $diary_id = $_GET[1];

        $article = $this->mod->getArticle($diary_id);//var_dump($article);exit;
        $data['username'] = $article['username'];
        $data['time'] = date('Y-m-d H:i:s', $article['time']);
        $data['article'] = $article['content'];
        unset($article);
        
        Visit::setVisitData($data['user']);

        $this->load->tpl('index/diary' , $data);
    }

}