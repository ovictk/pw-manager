<?php

class Login {
	public function db_user() {
		// $manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
		return (new MongoDB\Client)->flous_db->user;
	}
	public function tryData($user, $pass) {
		$login = new Login;
		$data = $login->db_user()->findOne(['user' => $user, 'pass' => $pass], []);
		if ($data != null) {
			$_SESSION['db_ident'] = $data['_id'];
			$_SESSION['UL'] = true;
			$_SESSION['user'] = $data['user'];
			$_SESSION['pass'] = $data['pass'];
			$_SESSION['A_color'] = $data['color'];
			$_SESSION['attr'] = (array)$data['attr'];
			$_SESSION['total_acc'] = $data['total_acc'];
			$_SESSION['attr_stats'] = (array)$data['attr_stats'];
			return true;
		} else {
			return false;
		}
	}
	public function getPath() {
		return __DIR__."/login.tpl";
	}
	public function getData() {
		$loggeddata = [

		];
		return $loggeddata;
	}
}