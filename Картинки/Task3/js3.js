let timeStorage = localStorage;
let time;

if (timeStorage.getItem("time") != null) {
	time = parseInt(timeStorage.getItem("time"));
} else {
	time = 300;
	timeStorage.setItem("time", time);
}
let firstCard =null;
let secondCard =null;


let cards =[
{
	name:"me",
	img:"мое фото",
	id: 1,
},
{
	name:"a2",
	img:"https://cdn.discordapp.com/emojis/980107475963490344.webp?size=96&quality=lossless",
	id: 2
},
{
	name:"a3",
	img:"https://cdn.discordapp.com/emojis/1077446592812040292.webp?size=96&quality=lossless",
	id: 3
},
{
	name:"a4",
	img:"https://cdn.discordapp.com/emojis/791436715872223242.webp?size=96&quality=lossless",
	id: 4
},
{
	name:"a5",
	img:"https://cdn.discordapp.com/emojis/1065490713955008582.webp?size=96&quality=lossless",
	id: 5
},
{
	name:"a6",
	img:"https://cdn.discordapp.com/emojis/997975240426668072.webp?size=96&quality=lossless",
	id: 6
},
{
	name:"a7",
	img:"https://cdn.discordapp.com/emojis/1016735228598951996.webp?size=96&quality=lossless",
	id: 7
},
{
	name:"a8",
	img:"https://cdn.discordapp.com/emojis/950492784631095306.webp?size=96&quality=lossless",
	id: 8
},
{
	name:"a9",
	img:"https://cdn.discordapp.com/emojis/866537738865737729.gif?size=96&quality=lossless",
	id: 9
},
{
	name:"a10",
	img:"https://cdn.discordapp.com/emojis/870248827934883860.webp?size=96&quality=lossless",
	id: 10
},
{
	name:"a11",
	img:"https://cdn.discordapp.com/emojis/818437658823884821.gif?size=96&quality=lossless",
	id: 11
},
{
	name:"a12",
	img:"https://cdn.discordapp.com/emojis/997975322559529080.webp?size=96&quality=lossless",
	id: 12
}

];
let progress = 0;

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
	
		});
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
	
		});
	$("#rules").slideUp();
	$(".slideRules").click(function(){
		$("#rules").slideToggle();
	});
	$("#start").click(function(){
		$("#start").css('display', 'none');
		$(".gameboard").css('display', 'grid');
		fillBoard();
		$('.card').on('click', cardClicked);
		startTime();
	});
	
});

function shuffle(array){
	let counter = array.length;
	let temp;
	let index;
   while (counter > 0) {
	index = Math.floor(Math.random() * counter);
	counter--;
	temp = array[counter];
	array[counter] = array[index];
	array[index] = temp;
	}
	return array;
}
function fillBoard() {
	let board = shuffle([...cards, ...cards]);
	for(let i = 0; i < board.length; i++){
		let cardHtml = `<div class="card" data-id="${board[i].id}">
			<div class="front">press me</div>
			<div class="back"><img src="${board[i].img}" alt="${board[i].name}"></div>
		</div>`;
		$('.gameboard').append(cardHtml);
	}
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
function cardClicked(event) {
	if(secondCard || $(this).hasClass('matched')){
		return
	}
	if(!firstCard){
		firstCard = $(this);
		firstCard.addClass('flip');
		return
	}
	if(firstCard){
		secondCard = $(this);
		secondCard.addClass('flip');
		if(firstCard.attr('data-id') == secondCard.attr('data-id')){
			firstCard.addClass('matched');
			secondCard.addClass('matched');
			firstCard = null;
			secondCard = null;
			progress++;
			$('.progress').val(progress).trigger('change');
			if(progress==12) {
				win();
			}
			return
		}
		else {
			setTimeout(function(){
				firstCard.removeClass('flip');
				secondCard.removeClass('flip');
				firstCard = null;
				secondCard = null;
			},600);
		}
	}
}
function win(){
	$(".gameboard").css({
		'display' : 'none'
	});
	$("#win").css({
		'display' : 'flex'
	});
	localStorage.removeItem("time");
}