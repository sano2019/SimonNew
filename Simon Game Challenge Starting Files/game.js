const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameState = "stopped";
let level = 0;

$(document).keypress(function(){
  if(gameState == "stopped") {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
  nextSequence();
  gameState = "started";
  $("h1").html(`Level ${level}`);
  }
})

function nextSequence() {
  level++;
  $("h1").html(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  let sound = new Audio(`sounds/${name}.mp3`);
  sound.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function() {
      $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

$(".btn").click(function(e) {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
})

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if(userClickedPattern.length == gamePattern.length) {
        setTimeout(function(){
          nextSequence();
        }, 1000);
        userClickedPattern = [];
      }
    }
  else {
    gameOver();
  }
}

function gameOver() {
  let gameOver = new Audio("sounds/wrong.mp3");
  gameOver.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").html("Game Over, Press Any Key to Restart");
  gameState = "stopped";
}
