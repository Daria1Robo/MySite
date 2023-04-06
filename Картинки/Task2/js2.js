let timeStorage = localStorage;
let time;

if (timeStorage.getItem("time") != null) {
	time = parseInt(timeStorage.getItem("time"));
} else {
	time = 300;
	timeStorage.setItem("time", time);
}
let progress=0;
let was=[];
let answer=[
["да я люблю"],
["доброго вечора"],
["быть против"],
["амбатакам"],
["тутуту","хз"],
["под сирен вой","блатная"],
["энгри бердс","тутутуту"],
["семья","мать сдохла","Семья","Мазелов"],
["шашлык","шашлычочек"],
["thug shake","брендон"],
];
let num=Math.floor(1+Math.random()*10);
$(document).ready(function(){
	$(".progress").knob({
		'min':0,
		'max':10,
		'angleOffset':-60,
		'angleArc':120,
		'readOnly':true,
		'width':'100%',
		'thickness':0.2,
		'lineCap':'round',
		'displayInput':false,
		'bgColor':'black',
		'fgColor':'green'
	
		})
		$(".time").knob({
		'min':0,
		'max':300,
		'angleOffset':0,
		'angleArc':360,
		'readOnly':true,
		'width':'100%',
		'thickness':0.2,
		'lineCap':'butt',
		'displayInput':false,
		'bgColor':'black',
		'fgColor':'green'
	
		})
	$("#rules").slideUp();
	$(".slideRules").click(function(){
		$("#rules").slideToggle();
	});
	$("#start").click(function(){
		$("#start").css('display','none');
		$(".sound").css('display','block');
		start_rebus(num);
		startTime();
	});
	$("#btnTask1").click(function(){
		if (answer[num-1].indexOf($("#inputTask1").val().toLowerCase()) != -1) {
			alertify.success("Правильно молодец !")
			$("#inputTask1").val("");
			progress++;
			$(".progress").val(progress).trigger('change');
			was.push(num);
			if (progress<10) {
				do{
					num=Math.floor(1+Math.random()*5);
				} while(was.includes(num));
				start_rebus(num);
			}else{
				$(".img,#btnTask1,#inputTask1").css({
					'display':'none'
				});
				$(".nextTask").css({
					'display':'flex'
				});
			}
		}
		else{
			alertify.error("Не правильно НУ ТЫ И ИДИОТ");
		}
	});
});
function start_rebus(arg){
	$("#melody").attr("src",`Audio/${arg}.mp3`);
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
