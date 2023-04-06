let progress=0;
let was=[];
let answer=["Кодеры","Vast rp","Наборные","Лёшка","Шарик"];
let num=Math.floor(1+Math.random()*5);
$(document).ready(function(){
	$(".progress").knob({
		'min':0,
		'max':5,
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
	$("#rules").slideUp();
	$(".slideRules").click(function(){
		$("#rules").slideToggle();
	});
	start_rebus(num);
	$("#btnTask1").click(function(){
		if ($("#inputTask1").val()==`${answer[num-1]}`) {
			alertify.success("Правильно молодец !")
			$("#inputTask1").val("");
			progress++;
			$(".progress").val(progress).trigger('change');
			was.push(num);
			if (progress<5) {
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
	$("#picture").attr("src",`img/${arg}.jpg`);
}