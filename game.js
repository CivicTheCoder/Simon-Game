var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function (e) { 

    var firstkey = e.key;

    if(firstkey == "a" || firstkey =="A"){
       
        if(!started){
   
            $("h1").text("level "+level);
            
            nextSequence();
            
            started = true;
        }
    }
});


$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){

        console.log("success");

        if(gamePattern.length===userClickedPattern.length){
    
            setTimeout(() => { nextSequence(); }, 1000);

        } 

    }else{
        
        console.log("fail");
        
        $("body").addClass("game-over");

        playSound("wrong");    
        
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
    
        $("h1").text("Game Over, Press Any key to Restart");

        startOver();
    }
}

function nextSequence() {
    
    userClickedPattern=[];

    level++;
    
    $("h1").text("level "+level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
    
    animatePress(randomChosenColor);

}

function playSound(name) {

    var buttonSound = new Audio("sounds/" + name + ".mp3");

    buttonSound.play();
}

function animatePress(currentColor) {

    $("#"+currentColor).addClass("pressed");

        setTimeout(function () {
            
            $("#"+currentColor).removeClass("pressed");
            
        },100);
}

function startOver() {

    level = 0;

    gamePattern=[];

    started=false;

}


  
