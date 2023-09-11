<?php

class Account {
	public function db_user() {
		return (new MongoDB\Client)->flous_db->user;
	}
  public function accountUpdate($newData) {

		$tC = new Account;
		$newUsername = $newData[0]['value'];
		$newPassword = $newData[1]['value'];
		$tC->db_user()->updateOne(['_id' => new MongoDB\BSON\ObjectID($_SESSION['db_ident'])], ['$set' => ['user' => $newUsername]]);
		$tC->db_user()->updateOne(['_id' => new MongoDB\BSON\ObjectID($_SESSION['db_ident'])], ['$set' => ['pass' => $newPassword]]);
		$_SESSION['user'] =	$newUsername;
		$_SESSION['pass'] = $newPassword;
    return $newUsername.':'.$newPassword;
  }
	public function getPath() {
		return __DIR__."/account.tpl";
	}
	public function getData() {
		$loggeddata = [
			'name' => $_SESSION['user'],
			'pass' => $_SESSION['pass']
		];
		return $loggeddata;
	}
}