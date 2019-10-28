$(document).ready(function () {
var options = [
	{
		question: "Which phrase does the Evil Queen in Snow White actually say?", 
		choice: ['Mirror, mirror, on the wall — who is the fairest of them all?', 'Magic mirror, on the wall — who is the fairest one of all?', 'Mirror, mirror, on the wall — who is the fairest one of all?', 'Magic mirror, on the wall — who is the fairest of them all?'],
		answer: 1,
		photo: "assets/images/evilqueen.gif"
	 },
	 {
	 	question: "How many years does the Genie say he has been trapped in the lamp?", 
		choice: ['100 years', '500 Years', '1,000 Years', '10,000 Years'],
		answer: 3,
		photo: "assets/images/genie.gif"
	 }, 
	 {
	 	question: "What is Boo's real name in Monster's Inc.?", 
		choice: ['Suzy', 'Sally', 'Mary', 'Cindy'],
		answer: 2,
		photo: "assets/images/boo.gif"
	}, 
	{
		question: 'In which city is the 2007 Disney film Ratatouille based?', 
		choice: ['New York City', 'San Francisco', 'Paris', 'London'],
		answer: 2,
		photo: "assets/images/rat.gif"
	}, 
	{
		question: 'Which glass slipper did Cinderella leave behind?', 
		choice: ['Left', 'Right'],
		answer: 0,
		photo: "assets/images/cinderella.gif"
	}, 
	{
		question: 'Which Disney Princess has a star on the Hollywood Walk of Fame?', 
		choice: ['Cinderella', 'Snow White', 'Jasmine', 'Belle'],
		answer: 1,
		photo: "assets/images/snowwhite.gif"
	}, 
	{
		question: 'Which Disney Princess has a raccoon as a sidekick?', 
		choice: ['Belle', 'Jasmine', 'Pocahontas', 'Tiana'],
		answer: 2,
		photo: "assets/images/raccoon.gif"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answer").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#question").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answer").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answer").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answer").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answer").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answer").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#question").empty();
		$("#question").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answer").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answer").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answer").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answer").empty();
	$("#question").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})