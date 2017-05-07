var startScreen;
var gameHTML;
var counter = 15;
var questionArray = ["1schnitzel", "2miso", "3injera", "4mofongo", "5ube", "6tagine", "7zaatar", "8dukkah", "9congee", "10hoisin"];

var answerArray = [["1. A thin, breaded, and fried cutlet", "2. A type of sausage", "3. A type of cheese", "4. A sandwich made with braised pork"],["1. Soy sauce", "2. Seaweed", "3. Garlic, scallion and ginger", "4. Fermented soybeans"],["1. A chickpea stew", "2. A style of braised meat", "3. A type of flatbread", "4. Raw seafood"],["1. A spice blend", "2. Fried and mashed plantains", "3. Meat cooked over an open fire", "4. A dip made out of chickpeas"],["1. Purple yam", "2. Shrimp cooked on skewers", "3. A stew made with beans", "4. Fried and mashed sweet potatoes"],["1. A spice blend", "2. Salted beef", "3. Raw seafood marinated in vinegar", "4. A dish cooked in a specific pot"],["1. A type of flatbread", "2. A spice blend", "3. Preserved citrus", "4. Seafood stew"],["1. A type of bread", "2. A sauce made from fresh herbs and oil", "3. A spice blend of herbs and nuts", "4. Meat cooked over an open fire"],["1. Pork fat", "2. A vegetable stew", "3. Rice porridge", "4. Dumplings"],["1. Chili oil", "2. A thick sauce of soybeans, spices, and garlic", "3. A type of cured meat", "4. A style of cooking over high heat"]];

var correctAnswers = ["1. A thin, breaded, and fried cutlet", "4. Fermented soybeans", "3. A type of flatbread", "2. Fried and mashed plantains", "1. Purple yam", "4. A dish cooked in a specific pot", "2. A spice blend", "3. A spice blend of herbs and nuts", "3. Rice porridge", "2. A thick sauce of soybeans, spices, and garlic"];

var correctAnsDesc = ["Schnitzel is a thin, breaded, and fried cutlet. It is an Austrian dish made with pounded cutlets of veal breaded in flour, eggs, and bread crumbs.","Miso is made out of fermented soybeans. The popular Japanese ingredient is made by combining soybeans with koji (a type of mold) and letting it ferment.","Injera is an East African sourdough flatbread. It is known for its unique, spongy texture and is served with meats and stews.","Mofongo is an Afro-Puerto Rican dish made from fried and mashed plantains. Fried plantains are mashed with olive oil, garlic, and a variety of mix-ins.","Ube is a species of purple yam popular in the Philippines. It is commonly used in desserts, ice creams, and milk teas around the world.","It is a Moroccan stew cooked in a cone-shaped pot. There are many variations of the classic dish. Get one recipe <a href='https://www.sainsburysmagazine.co.uk/recipes/mains/item/lamb-tagine' target='_blank'>here</a>.","Za'atar is a Middle Eastern spice blend used as a condiment. It is usually made with dried thyme, sesame seeds, and sumac.","Dukkah is an Egyptian spice blend of herbs and toasted nuts. There are countless recipes for the spice blend, but the most popular includes toasted nuts, cumin, coriander, and sesame seeds.","Congee is a rice porridge popular in many Asian countries. It is prepared by boiling rice in a large amount of water and topping it with all kinds of delicious ingredients.","Hoisin is a thick sauce of soybeans, spices, and garlic. It is used in stir-fry, as a glaze, and as a dipping sauce."];



var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;
// var clickSound = new Audio("sound/button-click.mp3");

$(document).ready(function() {

	function introScreen() {

		startScreenIntro = "<h4 class='text-center'>The questions will appear one at a time. You need to answer each question before the time runs out!</h4> <h4 class='text-center'>WARNING: The timer can be a lil’ stressful, so here’s some magical pizza for good luck!</h4><img class='center-block' src='assets/images/magicpizza.png'><br><h4 class='text-center'>Are you ready?</h4><br>";

		startScreenbtn = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";

		$(".mainArea").html(startScreenIntro);
		$(".mainArea").append(startScreenbtn);
	}

	introScreen();

	$("body").on("click", ".start-button", function(event){

		generateHTML();
		timerWrapper();

	}); // Closes start-button click


	$("body").on("click", ".answer", function(event){

		selectedAnswer = $(this).text();

		console.log(selectedAnswer);

		if(selectedAnswer === correctAnswers[questionCounter]) {

			clearInterval(theClock);
			generateWin();
		}
		else {
			//alert("wrong answer!");
			clearInterval(theClock);
			generateLoss();
		}
	}); // Close .answer click

	$("body").on("click", ".reset-button", function(event){
		resetGame();
	}); // Closes reset-button click

});  //  End of document ready


function generateHTML() {

	$(".canyoutxt").remove();

	gameHTML = "<div class='pacmanbg center-block'><img src='assets/images/pacmanbg.png' style='width:500px'><div class='pacman'><img src='assets/images/pacman.gif' style='width:60%'></div>" + "<div><img class='pacmanblack' src='assets/images/pacmanblack.png' style='height:30px; width:25px'></div></div>" + "<p class='text-center timer-p'>&#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; T i m e   R e m a i n i n g &#8226; &#8226; &#8226; &#8226; &#8226; <span class='timer'>15</span></p>" + "<p class='text-center'><img class='center-block questionimg' src='assets/images/" + questionArray[questionCounter] + ".jpg' style='width:50%'></p><p class='first-answer answer'>" + answerArray[questionCounter][0] + "</p><p class='answer'>"+answerArray[questionCounter][1]+"</p><p class='answer'>"+answerArray[questionCounter][2]+"</p><p class='answer'>"+answerArray[questionCounter][3]+"</p>";
		
		$(".mainArea").html(gameHTML);

	 	$(".pacman").animate({left: '420px'}, 15000, 'linear');

	 	$(".pacmanblack").animate({ height: "30px", width: "450px" }, 15000, 'linear');


}

function generateLossDueToTimeOut() {
	unansweredCount++;
	gameHTML = "<div class='pacmanbg center-block'><img src='assets/images/pacmanbg.png' style='width:500px'><div class='pacman'><img src='assets/images/pacman.gif' style='width:60%'></div>" + "<div><img class='pacmanblack' src='assets/images/pacmanblack.png' style='height:30px; width:25px'></div></div>" + "<p class='text-center timer-p'>&#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; T i m e   R e m a i n i n g &#8226; &#8226; &#8226; &#8226; &#8226; <span class='timer'>" + counter + "</span></p>" + "<p class='correctans'><img class='center-block' src='assets/images/" + questionArray[questionCounter] + "correct.jpg'  style='width:50%'></p><div class='panel panel-primary anspanel'><div class='panel-heading'><h3 class='panel-title'>You ran out of time!</h3></div> <div class='panel-body'>The correct answer is: <strong>" + correctAnswers[questionCounter] + "</strong></div><div class='panel-body'>" + correctAnsDesc[questionCounter] +"</div></div></div>";

	$(".mainArea").html(gameHTML);
		setTimeout(wait, 9000);  
	}

	function generateWin() {
		correctCount++;
		gameHTML = "<div class='pacmanbg center-block'><img src='assets/images/pacmanbg.png' style='width:500px'><div class='pacman'><img src='assets/images/pacman.gif' style='width:60%'></div>" + "<div><img class='pacmanblack' src='assets/images/pacmanblack.png' style='height:30px; width:25px'></div></div>" + "<p class='text-center timer-p'>&#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; T i m e   R e m a i n i n g &#8226; &#8226; &#8226; &#8226; &#8226; <span class='timer'>" + counter + "</span></p>" + "<p class='correctans'><img class='center-block' src='assets/images/" + questionArray[questionCounter] + "correct.jpg'  style='width:50%'></p>"+"<div class='panel panel-success anspanel'><div class='panel-heading'><h3 class='panel-title'>Correct!</h3></div> <div class='panel-body'>The answer is: <strong>" + correctAnswers[questionCounter] + "</strong></div><div class='panel-body'>" + correctAnsDesc[questionCounter] +"</div></div></div>";

		$(".mainArea").html(gameHTML);
		setTimeout(wait, 9000);  

	}

	function generateLoss() {
		incorrectCount++;
		gameHTML = "<div class='pacmanbg center-block'><img src='assets/images/pacmanbg.png' style='width:500px'><div class='pacman'><img src='assets/images/pacman.gif' style='width:60%'></div>" + "<div><img class='pacmanblack' src='assets/images/pacmanblack.png' style='height:30px; width:25px'></div></div>" + "<p class='text-center timer-p'>&#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; T i m e   R e m a i n i n g &#8226; &#8226; &#8226; &#8226; &#8226; <span class='timer'>" + counter + "</span></p>" + "<p class='correctans'><img class='center-block' src='assets/images/" + questionArray[questionCounter] + "correct.jpg'  style='width:50%'></p>" +"<div class='panel panel-primary anspanel'><div class='panel-heading'><h3 class='panel-title'>Wrong!</h3></div> <div class='panel-body'>The correct answer is: <strong>" + correctAnswers[questionCounter] + "</strong></div><div class='panel-body'>" + correctAnsDesc[questionCounter] +"</div></div></div>";

		$(".mainArea").html(gameHTML);
		setTimeout(wait, 9000); 
	}


	function timerWrapper() {
		theClock = setInterval(fifteenSeconds, 1000);
		function fifteenSeconds() {
			if (counter === 0) {
				clearInterval(theClock);
				generateLossDueToTimeOut();
			}
			if (counter > 0) {
				counter--;
			}
			$(".timer").html(counter);
		}
	}

	function wait() {
		if (questionCounter < 9) {
		questionCounter++;
		generateHTML();
		counter = 15;
		timerWrapper();
		}
		else {
			finalScreen();
		}
	}

function finalScreen() {
	gameHTML = "<p class='text-center'>All done, here's how you did!</p>" + "<p class='summary-correct text-center'>Correct Answers: " + correctCount + "</p>" + "<p class='text-center'>Wrong Answers: " + incorrectCount + "</p>" + "<p class='text-center'>Unanswered: " + unansweredCount + "</p>";

	$(".mainArea").html(gameHTML);

	if (correctCount === 10){
		$(".mainArea").append("<h3 class='text-center'>You got 10 out of 10 right! You're a global foodie!</h3><img class='center-block' src='assets/images/1010.gif'><br>");
	}

	else if (correctCount>=5){
		$(".mainArea").append("<h3 class='text-center'>You got " + correctCount + " out of 10 right! You're not a total global foodie, but you know your stuff!</h3> <img class='center-block' src='assets/images/510.gif'><br>");
	}

	else{
		$(".mainArea").append("<h3 class='text-center'>You got " + correctCount + " out of 10 right! You're not a total global foodie, but you know your stuff!</h3> <img class='center-block' src='assets/images/110.gif'><br>");	
	}

	$(".mainArea").append("<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>");
	
}

function resetGame() {
	questionCounter = 0;
	correctCount = 0;
	incorrectCount = 0;
	unansweredCount = 0;
	counter = 15;
	generateHTML();
	timerWrapper();
}


