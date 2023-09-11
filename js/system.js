$(document).ready(function() {
	$(document).on('click', '.nav1 .button', function() {
		$('.nav1 .button').removeClass('selectorNav1')
		$(this).addClass('selectorNav1')
	});
	$(document).on('click', '.nav1Brd .button', function() {
		$('.nav1Brd .button').removeClass('selectorNav1Brd')
		$(this).addClass('selectorNav1Brd')
	});
	$(document).on('click', '#visMode', function() {
		$('html').toggleClass('darkmode')
	});
	$(document).on('keyup', '.text1cBrd', function() {
		if ($(this).val() != '') {
			$(this).removeClass('text1Brd_right_red')
			$(this).addClass('text1Brd_right_green')
		} else {
			$(this).removeClass('text1Brd_right_green')
			$(this).addClass('text1Brd_right_red')
		}
	});
	$(document).on('keyup', '.text1cAll', function() {
		if ($(this).val() != '') {
			$(this).removeClass('text1All_right_red')
			$(this).addClass('text1All_right_green')
		} else {
			$(this).removeClass('text1All_right_green')
			$(this).addClass('text1All_right_red')
		}
	});
	$(document).on('keyup', '.text2cBrd', function() {
		if ($(this).val() != '') {
			$(this).removeClass('text2Brd_right_red')
			$(this).addClass('text2Brd_right_green')
		} else {
			$(this).removeClass('text2Brd_right_green')
			$(this).addClass('text2Brd_right_red')
		}
	});
	$(document).on('keyup', '.text2cAll', function() {
		if ($(this).val() != '') {
			$(this).removeClass('text2All_right_red')
			$(this).addClass('text2All_right_green')
		} else {
			$(this).removeClass('text2All_right_green')
			$(this).addClass('text2All_right_red')
		}
	});
	$(document).on('keyup', '.search1 input[type="text"]', function() {
		if ($(this).val() != '') {
			$('.search1 input[type="submit"]').addClass('search1resSubmit')
			$('.search1 input[type="text"]').addClass('search1resText')
			$('.results1').removeClass('out')
			$('.results1').addClass('in')
		} else {
			$('.search1 input[type="submit"]').removeClass('search1resSubmit')
			$('.search1 input[type="text"]').removeClass('search1resText')
			$('.results1').addClass('out')
			$('.results1').removeClass('in')
		}
	});
	$('.username').focus(function(event) {
		if ($(this).val() == "") {
			$('.usernameLabel').toggleClass('down');
			$('.usernameLabel').toggleClass('up');
		}
	});
	$('.username').focusout(function(event) {
		if ($(this).val() == "") {
			$('.usernameLabel').toggleClass('down');
			$('.usernameLabel').toggleClass('up');
		}
	});
	$('.password').focus(function(event) {
		if ($(this).val() == "") {
			$('.passwordLabel').toggleClass('down');
			$('.passwordLabel').toggleClass('up');
		}
	});
	$('.password').focusout(function(event) {
		if ($(this).val() == "") {
			$('.passwordLabel').toggleClass('down');
			$('.passwordLabel').toggleClass('up');
		}
	});
});