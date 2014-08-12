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
        $diary_id = $_GET[1];
        
        Visit::setVisitData($data['user']);

        $this->load->tpl('index/diary' , $data);
    }

}