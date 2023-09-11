<?php

class Basic {
  
	public function getPath() {
		return __DIR__."/basic.tpl";
	}
	public function getData($c) {
		// echo '<pre>';
		// print_r($_SESSION);
		// echo '</pre>';
		$data = [
			'name' => $_SESSION['user'],
			'fNameLetter' => substr($_SESSION['user'], 0, 1),
			'c' => $c
		];
		return $data;
	}
}