var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


var buttonColors = ["red", "blue", "green", "yellow"];


$("body").keydown(function(){
    if(!started){
        $("h1").text("level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("."+randomChosenColor).addClass("pressed");
    setTimeout(function(){
        $("."+randomChosenColor).removeClass("pressed");
    }, 300);

    playSound(randomChosenColour);
   
};

function playSound(userChosenColour){
    var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
            nextSequence();
            }, 1000);

        }
    }
      else{
        $("body").addClass("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        startOver();

    }
}
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}