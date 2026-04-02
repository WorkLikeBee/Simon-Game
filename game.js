var gamePattern = [];

var buttonColor = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var startTrigger = true;

var level = 0;

$("body").keypress(function(event){
    if(event.key === 'a' && startTrigger){

        $("h1").html("Level " + level);
        nextSequence();
        startTrigger = false;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(this);
    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("h1").html("Level " + level);

    var ranNum = Math.floor(Math.random()*4);

    var randomColor = buttonColor[ranNum];

    gamePattern.push(randomColor);
    $("#"+randomColor).fadeOut(100).fadeIn(100);

    playSound(randomColor);
}

function playSound(name){
    var audio = new Audio('./sounds/' + name +'.mp3');
    audio.play();
}

function animatePress(clickedElem){
    $(clickedElem).addClass("pressed");
    setTimeout(function(){
        $(clickedElem).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound('wrong');
        $("h1").html("<em>Game Over, Press A to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        // $("body").keypress(function(event){
        //     if(event.key == 'a'){
        //         startAgain();
        //     }
        // })
        startAgain();
    }
    
}

function startAgain(){
    level = 0;
    gamePattern =[]
    startTrigger = true;
}