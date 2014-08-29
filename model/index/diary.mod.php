<?php
/**
*	model
**/

class Diary_mod extends Model{
	function __construct()
	{
		parent::__construct();
	}


    public function getArticle($aid)
    {
        $this->initDB();

        $sql = 'SELECT * FROM ab_diary WHERE id='. intval($aid);
        $data = $this->db->getOne($sql);

        return $data;
    }

}   //end class