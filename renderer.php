<?php

class Renderer {
	public function r($path, $data) {
		extract($data, EXTR_SKIP);
		ob_start();
		require_once $path;
		$content = ob_get_clean();
		return $content;
	}
}