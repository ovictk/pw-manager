<?php

class SRV {
	public function getPath() {
		return __DIR__."/srv.tpl";
	}
	public function getData() {
		$data = [

		];
		return $data;
	}
  public function run_cmd($cmd) {
    return exec($cmd);
  }
}