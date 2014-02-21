<?php
/*
*	将长篇文章按字数分割成数组，用于分页显示
*	20100823 杰伦提供
*/

	class Article2array
	{
		public $content;

		public function __construct($article , $num)
		{
			$len = mb_strlen($article, 'GBK');

			if ($num >= $len)
			{
				$this->content = rtrim($article);
			}
			else  //文字大于$num则分页
			{
				$this->content = array();
				$iLoop = ceil($len / $num);
				for ($i = 0; $i < $iLoop; $i++)
				{
					$sTmpCont = mb_substr($article , $i * $num , $num, 'GBK');
					$sTmpCont = rtrim($sTmpCont);
					$this->content[$i] = str_replace(' ', '&#160;', $sTmpCont);
				}
			}
		}
	}
	
