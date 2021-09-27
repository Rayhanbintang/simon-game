let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    setTimeout(function(){
      nextSequence();
    }, 500)
    started = true;
  }
})

$(".btn").click(function() {
  let userColor = $(this).attr("id");
  playSound(userColor);
  animateButton(userColor);

  userPattern.push(userColor);
  console.log(userPattern);
  checkAnswer()
  // console.log(userPattern)
})

function checkAnswer(){
  if (JSON.stringify(userPattern)==JSON.stringify(gamePattern.slice(0, userPattern.length))){
    if (userPattern.length === gamePattern.length)
      setTimeout(function() {
        userPattern = [];
        nextSequence();
      }, 1000);

  } else {
    startOver();
  }
  // nextSequence();
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateButton(color) {
  $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4)

  level++;
  $("#level-title").text("level " + level);

  playSound(buttonColours[randomNumber]);
  animateButton(buttonColours[randomNumber]);

  gamePattern.push(buttonColours[randomNumber]);
  console.log(gamePattern);
  return randomNumber
}

function startOver() {
  $("#level-title").text("Game Over, Press A key to start again");
  $("body").addClass("game-over")
  setTimeout(function(){
    $("body").removeClass("game-over")
  }, 200)
  playSound("wrong");
  gamePattern = [];
  level = 0;
  started = false;

}
