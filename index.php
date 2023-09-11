<?php
error_reporting(E_ALL);
ini_set("display_errors", 5);

require 'vendor/autoload.php';
require 'renderer.php';
require 'modules/login/login.php';
require 'modules/basic/basic.php';
require 'modules/apa/apa.php';
require 'modules/srv/srv.php';
require 'modules/account/account.php';


$url = explode('/', $_SERVER['REQUEST_URI']);
$r = new Renderer;
$main = new Main;
$login = new Login;
$apa = new APA;
$srv = new SRV;
$account = new Account;
$data = null;

if (!isset($_SESSION)) {
	session_set_cookie_params(21600,"/");
	session_start();
}
class Main {
	public function db_user() {
		return (new MongoDB\Client)->flous_db->user;
	}
	public function main() {
		
	}
	public function cmp_css() {
		require_once('vendor/leafo/lessphp/lessc.inc.php');
		$less = new lessc;
		$less->compileFile($_SERVER["DOCUMENT_ROOT"]."/less/style.less");
		$less->checkedCompile($_SERVER["DOCUMENT_ROOT"]."/less/style.less", $_SERVER["DOCUMENT_ROOT"]."/css/style.css");
	}
	public function getPath() {
		return __DIR__."/index.tpl";
	}
	public function getData() {
		$loggeddata = [

		];
		return $loggeddata;
	}
	public function basic($c) {
		$r = new Renderer;
		$basic = new Basic;
		return $r->r($basic->getPath(), $basic->getData($c));
	}
	public function apa() {
		$r = new Renderer;
		$apa = new APA;
		return $r->r($apa->getPath(), $apa->getData($_SESSION['attr'][0]));
	}
}

if (isset($url[1])) {
	if ($url[1] == '') {
		if (!isset($_SESSION['UL'])) {
			$data = $r->r($login->getPath(), $login->getData());
		} else {
			$data = $main->basic($main->apa());
		}
	} else if ($url[1] == 'srv') {
		$data = $main->basic($r->r($srv->getPath(), $srv->getData()));
		// echo "asd";
	} else if ($url[1] == 'settings') {
		$data = $main->basic($r->r($account->getPath(), $account->getData()));
	} else if ($url[1] != '') {
		$data = $main->basic($apa->conf_acc($url[1]));
	} 
}
if (isset($_POST)) {
	$ret_html = true;
	if (isset($_POST['liVerf'])) {
		$var = $login->tryData($_POST['liName'], $_POST['liPass']);
		if ($var) {
			$data = $main->basic($main->apa());
		} else {
			// ERROR WARNING
		}
	} else if (isset($_POST['logout'])) {
		session_destroy();
		header("Location: /");
	} else if (isset($_POST['postid'])) {
		$ret_html = false;
		if ($_POST['postid'] == 1001) {
			echo $apa->conf_Content($_POST['attr']);
		} else if ($_POST['postid'] == 1002) {
			$res = $apa->newInsert($_POST['dataSend']);
			$main->db_user()->updateOne(['_id' => new MongoDB\BSON\ObjectID($_SESSION['db_ident'])], ['$set' => (array)['attr_stats' => $_SESSION['attr_stats']]]);
			echo $apa->conf_Content($_POST['dataSend']['attr']);
		} else if ($_POST['postid'] == 1003) {
			$res = $apa->update_acc($_POST['dataUpdate']);
			echo $apa->conf_acc($url[1]);
		} else if ($_POST['postid'] == 1004) {
			$res = $apa->delete_acc($_POST['gi']);
			$main->db_user()->updateOne(['_id' => new MongoDB\BSON\ObjectID($_SESSION['db_ident'])], ['$set' => ['attr_stats' => (array)[$res[1] => $res[0]]]]);
			$_SESSION['attr_stats'][$res[1]] = $res[0];
			echo $res;
		} else if ($_POST['postid'] == 1005) {
			$ret = '';
			if ($_POST['seedKey'] == 0) {
				$ret = '<div class="attrList">';
				foreach ($_SESSION['attr'] as $key => $value) {
					$ret.= '<div class="attrGr"><button class="attrS">'.$value.'</button><button type="button" attr="'.$value.'" class="deleteAttr shadowHover">X</button></div>';
				}
				$ret.= '</div>';
			}
			echo $ret;
		} else if ($_POST['postid'] == 1006) {
			$var = $apa->del_attr($_POST['attrDel']);
			$main->db_user()->updateOne(['_id' => new MongoDB\BSON\ObjectID($_SESSION['db_ident'])], ['$set' => ['attr' => $_SESSION['attr']]]);
			echo $apa->conf_Nav();
		} else if ($_POST['postid'] == 1007) {
			$apa->add_attr($_POST['newAttrName']);
			$main->db_user()->updateOne(['_id' => new MongoDB\BSON\ObjectID($_SESSION['db_ident'])], ['$set' => ['attr' => $_SESSION['attr']]]);
			$main->db_user()->updateOne(['_id' => new MongoDB\BSON\ObjectID($_SESSION['db_ident'])], ['$set' => ['attr_stats' => (array)$_SESSION['attr_stats']]]);
			echo $apa->conf_Nav();
		} else if ($_POST['postid'] == 1008) {
			echo $apa->get2faVH((string)$_SESSION['db_ident'], $_POST['gid']);
		} else if ($_POST['postid'] == 1009) {
			echo $apa->get2faVHGoogle((string)$_SESSION['db_ident'], $_POST['gid']);
		} else if ($_POST['postid'] == 3001) {
			$account->accountUpdate($_POST['exp']); 
			echo $r->r($account->getPath(), $account->getData());
		}
	}	else if (isset($_POST['postsrv'])) {
		$ret_html = false;

		if ($_POST['postsrv'] == 2001) {
			echo $srv->run_cmd($_POST['cmd']);
		}
	}
	if ($ret_html) {
		echo $data;
		echo $r->r($main->getPath(), $main->getData(""));
	}
}
$main->cmp_css();