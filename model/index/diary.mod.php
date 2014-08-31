<?php
/**
*	model
**/

class Diary_mod extends Model{
	function __construct()
	{
		parent::__construct();
	}


    public function getArticle($aid, $user)
    {
        $this->initDB();

        $sql = "SELECT * FROM ab_diary WHERE username='". $user
         ."' AND id <= ". intval($aid) .' ORDER BY id DESC LIMIT 1';
        $data = $this->db->getOne($sql);

        return $data;
    }

}   //end class