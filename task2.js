//Time controll/---------------------------------

let timeStorage = localStorage;
let time;

if (timeStorage.getItem("time") != null) {
	time = parseInt(timeStorage.getItem("time"));
} else {
	time = 300;
	timeStorage.setItem("time", time);
}

//------------------------------------------------



let answer = [
	["гаррі поттер", "гарри поттер","harry potter"],
	["губка боб","sponge bob", "spongebob", "губка боб квадратные штаны", "губка боб квадратні штани"],
	["пірати", "пірати карибского моря", "капитан джек горобець", "пираты","пираты карибского моря", "капитан джек воробей", "pirates of the caribbean"],
	["сімпсони", "симпсоны","simpsons", "the simpsons"],
	["зоряні війни", "звездные войны","star wars", "имперский марш", "імперский марш"],
	["lion king","the lion king", "король лев", "симба", "сімба"],
	["frozen","холодное сердце", "холодне серце", "эльза", "ельза"],
	["shrek","шрек"],
	["shrek","шрек"],
	["rocky","рокки", "роккі"],
	["индиана джонс","indiana jones"],
	["один вдома", "один дома","home alone"],
	["термінатор", "терминатор","terminator"],
	["назад у майбутнє", "назад в будущее", "back to the future", "марти макфлай"],
	["мисливці за привидами", "охотники за привидениями","ghost busters"]
];

let was = [];

let progress = 0;

let num = Math.floor(1 + Math.random() * 15);

$(document).ready(function () {
	$(".progress").knob({
		'min': 0, 
		'max': 10,
		'angleOffset': -60,
		'angleArc': 120,
		'readOnly': true,
		'width' : '100%',
		'thickness': 0.2,
		'lineCap': 'round',
		'displayInput' : false,
		'bgColor' : '#cecae3',
		'fgColor' : '#3b1b5b'
	});
	$(".time").knob({
		'min': 0, 
		'max': 300,
		'angleOffset': 0,
		'angleArc': 360,
		'readOnly': true,
		'width' : '100%',
		'thickness': 0.2,
		'lineCap': 'butt',
		'displayInput' : false,
		'bgColor' : '#cecae3',
		'fgColor' : '#3b1b5b'
	});

	$(".slideRules").click(function () {
		$("#rules").slideToggle();
	});

	$("#start").click(function () {
		$("#start").css('display', 'none');
		$(".sound").css('display', 'block');
		startRebus(num);
		startTime();
	});


	$("#btnTask").click(function() {
		if (answer[num-1].indexOf($("#inputTask").val().toLowerCase()) != -1) {
			alertify.success("Right answer!");
			$("#inputTask").val("");
			progress++;
			$(".progress").val(progress).trigger('change');
			was.push(num);
			console.log(was);

			if (progress < 10) {
				do {
					num = Math.floor(1 + Math.random() * 15);
				} while (was.includes(num));
				// console.log(num);
				startRebus(num);
			} else {
				$(".sound, #btnTask, #inputTask").css({
					'display' : 'none'
				});
				$("#nextTask").css({
					'display' : 'flex'
				});
				localStorage.removeItem("time");
			}
		} else {
			alertify.error("Wrong answer. Try again!");
		}
	});
});


function startRebus (arg) {
	$("#melody").attr("src",`https://dropmefiles.top/ua/d/v3XV2P6KZH/e3f13b88bedd3f0c9346814b957bb0f9/213c28a3c03f9635b9092bfc0ede6947`);
}

function startTime () {
	setInterval(function () {
		time = parseInt(localStorage.getItem("time")) - 1;
		$(".time").val(time).trigger('change');
		if (time == 0) {
			alertify.error("Time is out!");
			setTimeout(() => window.open("../Task1/task1.html", "_self", false), 2000);
			localStorage.removeItem("time");
		} else if (time > 0) {
			localStorage.setItem("time", time);
		}
	}, 1000);
}