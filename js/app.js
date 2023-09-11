var attr = '.EMail';
var tempAttr = '';
var brugerEnabled = false;
var BOClose = '.navApa button' 
var timer = null
var msgType = ''

$(document).ready(function () {
	$(document).on('click', '.button', function () { 
		var attrS = $(this).attr('attr')
		$.ajax({
			url: '/',
			type: 'POST',
			dataType: 'html',
			data: {postid: 1001, attr: attrS},
		})
		.done(function(data) {
			$(attr).replaceWith(data)
			conf_attr(attrS)
		})
	});
	$(document).on('focus', '.accDataI', function () { 
		$(this).toggleClass('selc')
	});
	$(document).on('focusout', '.accDataI', function () { 
		$(this).toggleClass('selc')
	});
	$(document).on('click', '.mng', function () { 
		$('#addAccount').addClass('off')
		$('#attr_mng').removeClass('off')
		overlayToggle();
		$.ajax({
			url: '/',
			type: 'POST',
			dataType: 'html',
			data: {postid: 1005, seedKey: 0},
		})
		.done(function(data) {
			$('.attrList').replaceWith(data)
		})
	});
	$(document).on('click', '.add', function () { 
		$('#addAccount').removeClass('off')
		$('#attr_mng').addClass('off')
		overlayToggle();
	});
	$(document).on('click', '.exit', function () { 
		overlayToggle();
	});
	$(document).on('click', '.overlay', function () { 
		overlayToggle();
	});
	$(document).on('click', '#pwGen', function () {
		genPass('#passwordI');
	})
	$(document).on('click', '#dateGen', function () {
		dayToday('#dateI');
	})
	$(document).on('click', '#nameGen', function () {
		genName('#nameI');
	}) 
	$(document).on('click', '.deleteAttr', function () {
		$.ajax({
			url: '/',
			type: 'POST',
			dataType: 'html',
			data: {postid: 1006, attrDel: $(this).attr('attr')},
		})
		.done(function(data) {
			$('.navApa').replaceWith(data)
		})
		overlayToggle();
	})
	$(document).on('click', '.addAttrNew', function () {
		var name = $('#newAttrName').val()
		if (name != '') {
			$.ajax({
				url: '/',
				type: 'POST',
				dataType: 'html',
				data: {postid: 1007, newAttrName: name},
			})
			.done(function(data) {
				$('.navApa').replaceWith(data)
			})
		}
		overlayToggle();
	})
	$(document).on('click', '.send', function (event) {
		event.preventDefault()
		if (
			$('#emailI').val() != '' &&
			$('#passwordI').val() != '' &&
			$('#groupI').val() != ''
		) {
			const formData = $('#insAcc').serializeArray()
			var xData = {}
			for (var i = 0; i < formData.length; i++) {
				xData[formData[i]['name']] = formData[i]['value']
			}
			if (xData['c_date'] == '') {
				xData['c_date'] = giveActDay()
			}
			xData['u_date'] = giveActDay()
			xData['attr'] = attr.substring(1, attr.length)
			$.ajax({
				url: '/',
				type: 'POST',
				dataType: 'html',
				data: {postid: 1002, dataSend: xData},
			})
			.done(function(data) {
				$(attr).replaceWith(data)
				overlayToggle()
				clear_form()
			})
		}
	})
	$(document).on('click', '.updateAcc', function (event){
		event.preventDefault()
		const updateData = $('#accData').serializeArray()
		var urlSet = $('#accData').attr('uid')
		$.ajax({
			url: urlSet,
			type: 'POST',
			dataType: 'html',
			data: {postid: 1003, dataUpdate: updateData},
		})
		.done(function(data) {
			$('#accData').replaceWith(data);
			openMsg('Updated', 'success')
		})
		.always(function() {
			
		})
	})
	$(document).on('click', '.deleteAcc', function (event){
		event.preventDefault()
		var urlSet = $('#accData').attr('uid')
		$.ajax({
			url: '',
			type: 'POST',
			dataType: 'html',
			data: {postid: 1004, gi: urlSet},
		})
		.done(function(data) {
			openMsg('This account has been deleted', 'info')
			
		})
	})
	$(document).on('click', '.cmdLS', function (event){
		$.ajax({
			url: '',
			type: 'POST',
			dataType: 'html',
			data: {postsrv: 2001, cmd: $(this).attr('cmd')},
		})
		.done(function(data) {
			console.log(data)
		})
	})
	$(document).on('click', '.userAcc', function (){
		$('.dropDown').toggleClass('fadeOut')
		$('.dropDown').toggleClass('fadeIn')
	})
	$(document).on('click', '#submAD', function (e){
		e.preventDefault()
		if ($('#userName').val() != '' && $('#userPass').val() != '') {
			var updateData = $('#userData').serializeArray()
			$.ajax({
				url: '/',
				type: 'POST',
				dataType: 'html',
				data: {postid: 3001, exp: updateData}
			})
			.done(function(data) {
				$('.accountData').replaceWith(data)
			})
		}
	})
	$(document).on('click', '.tfa', function () {
		cpyTFA($(this))
	})
	$(document).on('click', '.googletfa', function () {
		cpyTFA($(this))
	})
	$(document).on('click', '#addnF', function () {
		var newAttrNameAdd = $('#nFname').val()
		var newAttrType = $('#nFtype').val()
		if (newAttrNameAdd != '') {
			if ($('#nFtype').val() == 'textarea') {
				$('#iFAA').append('<tr class="addedTag"><td class="dataType">' + newAttrNameAdd + ':</td><td class="dataValue"><textarea name="' + newAttrNameAdd + '"></textarea></td></tr>')
			} else {
				$('#iFAA').append('<tr class="addedTag"><td class="dataType">' + newAttrNameAdd + ':</td><td class="dataValue"><input class="accDataI" name="' + newAttrNameAdd + '" type="' + newAttrType + '"></td></tr>')
			}
		} else {
			if ($('#nFtype').val() == 'tfasteam') {
				$('#iFAA').append('<tr class="addedTag"><td class="dataType">steam (Google):</td><td class="dataValue"><input class="accDataI" name="steam_tfa_key" type="text"></td></tr>')
			} else if ($('#nFtype').val() == 'tfagoogle') {
				$('#iFAA').append('<tr class="addedTag"><td class="dataType">key (Google):</td><td class="dataValue"><input class="accDataI" name="google_tfa_key" type="text"></td></tr>')
			}
		}
		$('#nFname').val('')
	})
	$(document).on('click', '.quickCopy', function () {
		var toCopy = $('.item' + $(this).attr('item') + ' #' + $(this).attr('sec')).html()
		var $temp = $("<input/>")
		$('body').append($temp)
		$temp.val(toCopy).select()
		document.execCommand('copy')
		$temp.remove()
	})
	$(document).on('click', '.accountDataCopy', function () {
		var toCopy = $(this).attr('data-clipboard')
		var $temp = $("<input/>")
		$('body').append($temp)
		$temp.val(toCopy).select()
		document.execCommand('copy')
		$temp.remove()
	})
	if ($('#auth').length) {
		tfaSync()
		GoogletfaSync()
	}
	$(document).on('click', '.burgerBasic', function () {
		if (brugerEnabled) {
			closeBurger()
		} else {
			$('.navApa').fadeIn()
			$('.burgerBasic').addClass('burgerOpen')
			$('.burgerBasic').removeClass('burger')
			brugerEnabled = true
		}
	})
	$(document).on('click', '.accountDataCopy', function () {
		var toCopy = $(this).attr('data-clipboard')
		var $temp = $("<input/>")
		$('body').append($temp)
		$temp.val(toCopy).select()
		document.execCommand('copy')
		$temp.remove()
	})
	$(document).on('click', BOClose, function () {
		if (brugerEnabled) {
			closeBurger()
		}
	})
  $(document).on('click', '.closeMsg', function () {
    closeMsg()
  })
})
function openMsg($info, $type) {
  clearTimeout(timer)
  closeMsg()
  setTimeout( function () {
    $('.msg').removeClass(msgType)
    $('.msg').addClass($type)
    $('.msg').addClass('msgOpen')
    $('.msg').removeClass('msgClose')
    $('.typeMsg').removeClass('typeMsgAnimation')
    setTimeout(function () {
      $('.typeMsg').addClass('typeMsgAnimation')
    }, 100)
    $('.typeMsgText').html($info)
    msgType = $type
    timer = setTimeout(function () {
      closeMsg()
    }, 10000)
  }, 200)
}
function closeMsg() {
  $('.msg').removeClass('msgOpen')
  $('.msg').addClass('msgClose')
}
function closeBurger() {
	$('.navApa').fadeOut()
	$('.burgerBasic').removeClass('burgerOpen')
	$('.burgerBasic').addClass('burger')
	brugerEnabled = false
}
function tfaSync() {
	setInterval(function () {
    $.ajax({
			url: '',
			type: 'POST',
			dataType: 'html',
			data: {postid: 1008, gid: $('#accData').attr('uid')},
		})
		.done(function(data) {
			if ($('.tfa').html() != data) {
				$('#auth').removeClass('timer30')
				$('.tfa').html(data)
				setTimeout(function () {
					$('#auth').addClass('timer30')
				},100)
				$('.tfa').attr('data-clipboard-text', data)
			}
		})
  }, 1000);
}
function GoogletfaSync() {
	setInterval(function () {
    $.ajax({
			url: '',
			type: 'POST',
			dataType: 'html',
			data: {postid: 1009, gid: $('#accData').attr('uid')},
		})
		.done(function(data) {
			if ($('.googletfa').html() != data) {
				$('#authGoogle').removeClass('timer30')
				$('.googletfa').html(data)
				setTimeout(function () {
					$('#authGoogle').addClass('timer30')
				},100)
				$('.googletfa').attr('data-clipboard-text', data)
			}
		})
  }, 1000);
}
function cpyTFA($id) {
	value = $($id).attr('data-clipboard-text')
	var $temp = $("<input/>")
	$('body').append($temp)
	$temp.val(value).select()
	document.execCommand('copy')
	$temp.remove()
}
function overlayToggle() {
	$('.overlay').toggleClass('out')
	$('.overlayContent').toggleClass('out')
	clear_form()
}
function clear_form() {
	$('.olCtBody form input').val('')
	$('.olCtBody form textarea').val('')
	$('#newAttrName').val('')
	$('.olCtBody form .addedTag').remove('')
}
function conf_attr($name) {
	attr = '.' + $name;
}
function dayToday($item) {
  $($item).val(giveActDay())
}
function giveActDay() {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	today = yyyy + '-' + mm + '-' + dd;
	return today
}
function genPass($item) {
  var ps = '';
  $alphB = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
          "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
          "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
          "_", "!", "-", "$", "=", "#", "."
           ];
  for (var i = 0; i < 20; i++) {
      ps += $alphB[Math.floor(Math.random() * 69)];
  }
  $($item).val(ps)
}
function genName($item) {
	$names = ["Christopher", "Jessica", "Matthew", "Jennifer", "Joshua", "Amanda", "Daniel", "David", "James", "Robert", "John", "Joseph", "Andrew", "Ryan", "Brandon", "Jason", "Justin", "Sarah", "William", "Jonathan", "Stephanie", "Brian", "Nicole", "Michael", "Nicholas", "Anthony", "Heather", "Ashley", "Eric", "Elizabeth", "Adam", "Megan", "Melissa", "Kevin", "Steven", "Thomas", "Timothy", "Christina", "Kyle", "Rachel", "Laura", "Lauren", "Amber", "Brittany", "Danielle", "Richard", "Kimberly", "Jeffrey", "Amy", "Crystal", "Michelle", "Tiffany", "Jeremy", "Benjamin", "Mark", "Emily", "Aaron", "Charles", "Rebecca", "Jacob", "Stephen", "Patrick", "Sean", "Erin", "Zachary", "Jamie", "Kelly", "Samantha", "Nathan", "Sara", "Dustin", "Paul", "Angela", "Tyler", "Scott", "Katherine", "Andrea", "Gregory", "Erica", "Mary", "Travis", "Lisa", "Kenneth", "Bryan", "Lindsey", "Kristen", "Jose", "Alexander", "Jesse", "Katie", "Lindsay", "Shannon", "Vanessa", "Courtney", "Christine", "Alicia", "Cody", "Allison", "Bradley", "Samuel", "Shawn", "April", "Derek", "Kathryn", "Kristin", "Chad", "Jenna", "Tara", "Maria", "Krystal", "Jared", "Anna", "Edward", "Julie", "Peter", "Holly", "Marcus", "Kristina", "Natalie", "Jordan", "Victoria", "Jacqueline", "Corey", "Keith", "Monica", "Juan", "Donald", "Cassandra", "Meghan", "Joel", "Shane", "Phillip", "Patricia", "Brett", "Ronald", "Catherine", "George", "Antonio", "Cynthia", "Stacy", "Kathleen", "Raymond", "Carlos", "Brandi", "Douglas", "Nathaniel", "Ian", "Craig", "Brandy", "Alex", "Valerie", "Veronica", "Cory", "Whitney", "Gary", "Derrick", "Philip", "Luis", "Diana", "Chelsea", "Leslie", "Caitlin", "Leah", "Natasha", "Erika", "Casey", "Latoya", "Erik", "Dana", "Victor", "Brent", "Dominique", "Frank", "Brittney", "Evan", "Gabriel", "Julia", "Candice", "Karen", "Melanie", "Adrian", "Stacey", "Margaret", "Sheena", "Wesley", "Vincent", "Alexandra", "Katrina", "Bethany", "Nichole", "Larry", "Jeffery", "Curtis", "Carrie", "Todd", "Blake", "Christian", "Randy", "Dennis", "Alison", "Trevor", "Seth", "Kara", "Joanna", "Rachael", "Luke", "Felicia", "Brooke", "Austin", "Candace", "Jasmine", "Jesus", "Alan", "Susan", "Sandra", "Tracy", "Kayla", "Nancy", "Tina", "Krystle", "Russell", "Jeremiah", "Carl", "Miguel", "Tony", "Alexis", "Gina", "Jillian", "Pamela", "Mitchell", "Hannah", "Renee", "Denise", "Molly", "Jerry", "Misty", "Mario", "Johnathan", "Jaclyn", "Brenda", "Terry", "Lacey", "Shaun", "Devin", "Heidi", "Troy", "Lucas", "Desiree", "Jorge", "Andre", "Morgan", "Drew", "Sabrina", "Miranda", "Alyssa", "Alisha", "Teresa", "Johnny", "Meagan", "Allen", "Krista", "Marc", "Tabitha", "Lance", "Ricardo", "Martin", "Chase", "Theresa", "Melinda", "Monique", "Tanya", "Linda", "Kristopher", "Bobby", "Caleb", "Ashlee", "Kelli", "Henry", "Garrett", "Mallory", "Jill", "Jonathon", "Kristy", "Anne", "Francisco", "Danny", "Robin", "Lee", "Tamara", "Manuel", "Meredith", "Colleen", "Lawrence", "Christy", "Ricky", "Randall", "Marissa", "Ross", "Mathew", "Jimmy", "Abigail", "Kendra", "Carolyn", "Billy", "Deanna", "Jenny", "Jon", "Albert", "Taylor", "Lori", "Rebekah", "Cameron", "Ebony", "Wendy", "Angel", "Micheal", "Kristi", "Caroline", "Colin", "Dawn", "Kari", "Clayton", "Arthur", "Roger", "Roberto", "Priscilla", "Darren", "Kelsey", "Clinton", "Walter", "Louis", "Barbara", "Isaac", "Cassie", "Grant", "Cristina", "Tonya", "Rodney", "Bridget", "Joe", "Cindy", "Oscar", "Willie", "Maurice", "Jaime", "Angelica", "Sharon", "Julian", "Jack", "Jay", "Calvin", "Marie", "Hector", "Kate", "Adrienne", "Tasha", "Michele", "Ana", "Stefanie", "Cara", "Alejandro", "Ruben", "Gerald", "Audrey", "Kristine", "Ann", "Shana", "Javier", "Katelyn", "Brianna", "Bruce", "Deborah", "Claudia", "Carla", "Wayne", "Roy", "Virginia", "Haley", "Brendan", "Janelle", "Jacquelyn", "Beth", "Edwin", "Dylan", "Dominic", "Latasha", "Darrell", "Geoffrey", "Savannah", "Reginald", "Carly", "Fernando", "Ashleigh", "Aimee", "Regina", "Mandy", "Sergio", "Rafael", "Pedro", "Janet", "Kaitlin", "Frederick", "Cheryl", "Autumn", "Tyrone", "Martha", "Omar", "Lydia", "Jerome", "Theodore", "Abby", "Neil", "Shawna", "Sierra", "Nina", "Tammy", "Nikki", "Terrance", "Donna", "Claire", "Cole", "Trisha", "Bonnie", "Diane", "Summer", "Carmen", "Mayra", "Jermaine", "Eddie", "Micah", "Marvin", "Levi", "Emmanuel", "Brad", "Taryn", "Toni", "Jessie", "Evelyn", "Darryl", "Ronnie", "Joy", "Adriana", "Ruth", "Mindy", "Spencer", "Noah", "Raul", "Suzanne", "Sophia", "Dale", "Jodi", "Christie", "Raquel", "Naomi", "Kellie", "Ernest", "Jake", "Grace", "Tristan", "Shanna", "Hilary", "Eduardo", "Ivan", "Hillary", "Yolanda", "Alberto", "Andres", "Olivia", "Armando", "Paula", "Amelia", "Sheila", "Rosa", "Robyn", "Kurt", "Dane", "Glenn", "Nicolas", "Gloria", "Eugene", "Logan", "Steve", "Ramon", "Bryce", "Tommy", "Preston", "Keri", "Devon", "Alana", "Marisa", "Melody", "Rose", "Barry", "Marco", "Karl", "Daisy", "Leonard", "Randi", "Maggie", "Charlotte" ];
	var name = '';
  for (var i = 0; i < 2; i++) {
		name += $names[Math.floor(Math.random() * 499)] + ' ';
  }
  $($item).val(name)
}
