var level = 1;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var count = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    $('#'+randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $('h1').text("Level "+level);
    level +++ 1;
}

$('.btn').on('click', function() {
    var userChosenColour = $(this).attr('id');
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userChosenColour);
});

function playSound(fooName) {
    var audio = new Audio('sounds/'+fooName+'.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $('#'+currentColor).toggleClass('pressed');
    setTimeout(function() {
        $('#'+currentColor).toggleClass('pressed');
    }, 10);
}

$(document).on('click', function() {
    if (level === 1)
        nextSequence();
});

$(document).on('keypress', function() {
    if (level === 1)
        nextSequence();
});

function checkAnswer(userChosenColour) {
    if (userClickedPattern[count] === gamePattern[count]) {
            if (userClickedPattern.length !== gamePattern.length) {
                count++;
            }
            else {
                userClickedPattern = [];
                count = 0;
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
    }       
    else {
    gamePattern = [];
    userClickedPattern = [];
    count = 0;
    $('h1').text('Game Over, Press Any Key to Restart');
    $('body').toggleClass('game-over');
    setTimeout(() => {
        $('body').toggleClass('game-over');
    }, 200);
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    setTimeout(() => {
        level = 1;
    }, 200);
    }
}