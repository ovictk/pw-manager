<html class="darkmode">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>FLOUS | <?= $name ?></title>
</head>
<body>
	<form method="post">
		<div class="nav2">
			<div class="burger"><span id="1"></span><span id="2"></span><span id="3"></span></div>
			<div class="buttons">
				<a href="/"><div class="linksCategorys selectorNav2">APA</div></a>
				<div class="userAcc"><span><?= $fNameLetter ?></span></div>
				<div class="dropDown fadeOut">
					<p id="dDHead"><?= $name ?></p>
					<a href="/settings"><div id="set">Settings</div></a>
					<input type="submit" id="logout" name="logout" value="logout">
				</div>
			</div>
		</div>
	</form>
	<div>
		<?= $c ?>
	</div>
	<div class="msg msgClose typeMsg typeMsgAnimation">
		<div id="typeMsgContent">
			<b><span class="typeMsgText">
				Error
			</span></b>
			<span class="closeMsg">
				<svg viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
			</span>
		</div>
	</div>
</body>
</html>