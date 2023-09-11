<?php
// |ID|
// |ID|
// |ID|

require 'steam2fa.php';
require 'google2fa.php';

class APA {
	public function apaDB() {
		return (new MongoDB\Client)->flous_db->apa;
	}
	public function getPath() {
		return __DIR__."/apa.tpl";
	}
	public function getData($attr) {
		$apa = new APA;
		$data = [
			'links' => $apa->conf_Nav(),
			'content' => $apa->conf_Content($attr)
		];
		return $data;
	}
	public function conf_Nav() {
		$res = '<div class="navApa">';
		for ($i = 0; $i < sizeof($_SESSION['attr']); $i++) {
			$res.= '<button class="button" attr="'.$_SESSION['attr'][$i].'">'.$_SESSION['attr'][$i].'</button>';
		}
		$res.= '<button class="mng">MANAGE</button></div>';
		return $res;
	}
	public function conf_acc($gid) {
		// echo '<pre>';
		// print_r($_SESSION['attr_stats']);
		// echo '</pre>';
		$APA = new APA;
		$data = $APA->apaDB()->findOne(['owner' => (string)$_SESSION['db_ident'], 'global_ident' => $gid], []);
		$la = '';
		$date = '';
		$notes = '';
		$res = '<form autocomplete="off" method="post" id="accData" uid="'.$gid.'"><div class="apa_acc"><div><a href="/" name="backAPA"><button type="button" class="def shadowHover backAPA">back</button></a>';
		if ($data != null) {
			if (isset($data['steam_tfa_key'])) {
				$res.= '<span id="auth" class="timer30">';
				$res.= '	<span class="tfa" data-type="attribute" data-attr-name="data-clipboard-text" data-model="couponCode" data-clipboard-text="'.$APA->getSteam2fa($data['steam_tfa_key']).'">'.$APA->getSteam2fa($data['steam_tfa_key']).'</span>';
				$res.= '</span>';
			}	elseif (isset($data['google_tfa_key'])) {
				$res.= '<span id="authGoogle" class="timer30">';
				$res.= '	<span class="googletfa" data-type="attribute" data-attr-name="data-clipboard-text" data-model="couponCode" data-clipboard-text="'.$APA->getGoogle2fa($data['google_tfa_key']).'">'.$APA->getGoogle2fa($data['google_tfa_key']).'</span>';
				$res.= '</span>';
			}
			$res.= '</div>';
			$res.= '<table>';
			foreach ($data as $key => $value) {
				if ($key != '_id' && $key != 'global_ident' && $key != 'attr' && $key != 'owner' && $key != 'steam_tfa' && $key != 'steam_tfa_key' && $key != 'linked_acc') {
					if ($key == 'linked_acc') {
						$la = '<tr><td>'.$key.'</td><td class="itemData"><ul>';
						foreach ((array)$value as $k => $v) {
							$la.= '<li>'.$v.'</li>';
						}
						$la.= '</ul></td></tr>';
					} elseif ($key == 'c_date' || $key == 'u_date') {
						$date.= '<tr><td>'.$key.'</td><td class="itemData"><input class="formatAcc" type="date" value="'.$value.'" name="'.$key.'" disabled></td></tr>';
					} elseif ($key == 'notes') {
						$notes = '<tr><td>'.$key.'</td><td class="itemData"><textarea class="formatAcc" name="'.$key.'">'.$value.'</textarea></td></tr>';
					} else {
						$res.= '<tr><td>'.$key.': </td><td class="itemData"><input class="formatAcc addedCopy" type="text" name="'.$key.'" value="'.$value.'"><button type="button" class="accountDataCopy" data-clipboard="'.$value.'">copy</button></td></tr>';
					}
				}
			}
			$res.= $la;
			$res.= $date;
			$res.= $notes;
			$res.= '</table><div><input type="submit" class="updateAcc def shadowHover" name="updateAcc" value="update"><input type="submit" class="deleteAcc def shadowHover" name="deleteAcc" value="delete"></div></form>';
		} else {
			$res.= 'This query gone wrong</div>';
		}
		$res.= '</div>';
		// $res.= '<script src="./extensions/steamAuth/tfaUpdate.js"></script>';
		return $res;
	}
	public function update_acc($arr) {
		$APA = new APA;
		$gid = substr($_SERVER['REQUEST_URI'], 1, strlen($_SERVER['REQUEST_URI']));
		foreach ($arr as $fst => $arr) {
			$attr = '';
			$val = '';
			for ($i = 0; $i < sizeof($arr); $i++) {
				$attr = $arr['name'];
				$val = $arr['value'];
				$data = $APA->apaDB()->updateOne(['global_ident' => $gid], ['$set' => [$attr => $val]]);
			}
		}
		$data = $APA->apaDB()->updateOne(['global_ident' => $gid], ['$set' => ['u_date' => date('Y-m-d')]]);
	}
	public function delete_acc($gi) {
		$APA = new APA;
		$acc = $APA->apaDB()->findOne(['global_ident' => $gi]);
		$acc_db_id = (string)$acc['_id'];
		$acc_attr = $acc['attr'];
		$pos = null;
		foreach ($_SESSION['attr_stats'] as $key => $value) {
			$attr = explode('_', $value);
			if ($attr[0] == $acc_attr) {
				$pos = $key;
				$ids = explode('|ID|', $attr[2]);
				foreach ($ids as $keyIn => $svdId) {
					if ($svdId == $acc_db_id) {
						$ids[$keyIn] = null;
					}
				}
				$newIds = '';
				foreach ($ids as $key => $value) {
					if ($value != null) {
						$newIds.= $value.'|ID|';
					}
				}
				$attrConfN = $acc_attr.'_'.--$attr[1].'_'.$newIds;
			}
		}
		$APA->apaDB()->deleteOne(['global_ident' => $gi], ['limit' => 1]);
		return [0 => $attrConfN, 1 => $pos];
	}
	public function conf_Content($attr) {
		$apa = new APA;
		$attr_size = null;
		$var = false;
		$ids = [];
		for ($n = 0; $n < sizeof($_SESSION['attr_stats']) && !$var; $n++) {
			$arr = explode('_', (string)$_SESSION['attr_stats'][$n]);
			if ($arr[0] == $attr) {
				$var = true;
				$attr_size = $arr[1];
				if ($attr_size > 0) {
					$ids = explode('|ID|', $arr[2]);
				}
			}
		}
		$res = '<div class="sectionContent '.$attr.'">';
		$res.= '	<div class="header">';
		$res.= '		<div class="headerTitle"><p>'.$attr.'</p><button class="def add">ADD</button></div>';
		$res.= '		<div class="headerAct"></div>';
		$res.= '	</div>';
		$res.= '	<div class="items">';
		if (sizeof($ids) > 0) {
			for ($i = 0; $i < sizeof($ids) - 1; $i++) {
				$item = $apa->apaDB()->findOne(['_id' => new MongoDB\BSON\ObjectID($ids[$i])], []);
				$res.= '		<div class="item item'.$i.'">';
				$res.= '			<div class="groupData">Group: '.$item['group'].'</div>';
				$res.= '			<table><tr><td>EMail: </td><td class="itemData" id="email">'.$item['email'].'</td><td><button class="quickCopy" sec="email" item="'.$i.'">COPY</button></td></tr><tr><td>Name: </td><td class="itemData" id="name">'.$item['name'].'</td><td><button class="quickCopy" sec="name" item="'.$i.'">COPY</button></td></tr><tr><td>Password:</td><td class="itemData" id="pass">'.$item['password'].'</td><td><button class="quickCopy" sec="pass" item="'.$i.'" >COPY</button></td></tr></table>';
				$res.= '			<div class="interact"><a href="/'.$item['global_ident'].'"><button gi="" class="def viewData">view</button></a></div>';
				$res.= '		</div>';
			}
		} else {
			$res.= '		<div class="item">';
			$res.= '			<div class="groupData">no entries so far</div>';
			$res.= '		</div>';
		}
		$res.= '	</div>';
		$res.= '</div>';
		return $res;
	}
	public function newInsert($data) {
		$apa = new APA;
		$var = true;
		$gi_num = null;
		$sess_idm = null;
		$AS_3 = null;
		for ($i = 0; $i < sizeof($_SESSION['attr_stats']) && $var; $i++) {
			$int_gi_num = explode('_', $_SESSION['attr_stats'][$i]);
			if ($int_gi_num[0] == $data['attr']) {
				$AS_3 = $int_gi_num[2];
				$var = false;
				$sess_idm = $i;
				$gi_num = $int_gi_num[1]++;
			}
		}
		$gi = strtolower($data['attr']).'_'.$gi_num++;
		$data['global_ident'] = $gi;
		$data['linked_acc'] = [];
		$data['owner'] = (string)$_SESSION['db_ident'];
		$apa->apaDB()->insertOne($data);
		$iAcc_id = (string)$apa->apaDB()->findOne($data)['_id'];
		$_SESSION['attr_stats'][$sess_idm] = $data['attr'].'_'.$gi_num.'_'.$AS_3.$iAcc_id.'|ID|';
		return $sess_idm;
	}
	public function del_attr($attr) {
		$var = 0;
		foreach ($_SESSION['attr'] as $key => $value) {
			if ($value == $attr) {
				array_splice($_SESSION['attr'], $key, 1);
				$var = $key;
			}
		}
		return $key;
	}
	public function add_attr($attr) {
		$exist = false;
		foreach ($_SESSION['attr'] as $key => $value) {
			if ($value == $attr) {
				$exist = true;
			} 
		}
		if (!$exist) {
			$_SESSION['attr'][] = $attr;
			$_SESSION['attr_stats'][] = $attr.'_0_';
		}
	}
	public function getSteam2fa($ssk) {
		$SteamAuth = new SteamAuth;
		return $SteamAuth->GenerateSteamGuardCode($ssk);
	}
	public function getGoogle2fa($InitalizationKey) {
		$GoogleAuth = new Google2FA;
		$TimeStamp = $GoogleAuth->get_timestamp();
		$secretkey = $GoogleAuth->base32_decode($InitalizationKey);
		$otp = $GoogleAuth->oath_hotp($secretkey, $TimeStamp);
		$result = $GoogleAuth->verify_key($InitalizationKey, "123456");
		return $otp;
	}
	public function get2faVH($userHost, $gid) {
		$APA = new APA;
		$data = $APA->apaDB()->findOne(['owner' => $userHost, 'global_ident' => $gid], []);
		$SteamAuth = new SteamAuth;
		return $SteamAuth->GenerateSteamGuardCode($data['steam_tfa_key']);
	}
	public function get2faVHGoogle($userHost, $gid) {
		$APA = new APA;
		$data = $APA->apaDB()->findOne(['owner' => $userHost, 'global_ident' => $gid], []);
		$key = $data['google_tfa_key'];
		$GoogleAuth = new Google2FA;
		$TimeStamp = $GoogleAuth->get_timestamp();
		$secretkey = $GoogleAuth->base32_decode($key);
		$otp = $GoogleAuth->oath_hotp($secretkey, $TimeStamp);
		$result = $GoogleAuth->verify_key($key, "123456");
		return $otp;
	}
}