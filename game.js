var userClickedPattern = [];
var gamePattern = [];
var colors = ["green", "red", "violet", "yellow", "blue", "orange"];
var score = 0;
started = false;
var level = 0;
//start over function
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    score = 0;

}

// implemented using Chat gpt is for high score

// Function to retrieve the high score from local storage
function getHighScore() {
    var highScore = localStorage.getItem("simonHighScore");
    return highScore ? parseInt(highScore) : 0;
  }
  
  // Function to update the high score in local storage
  function updateHighScore(score) {
    localStorage.setItem("simonHighScore", score.toString());
  }
  
  // Function to compare the current score with the high score and update if necessary
  function updateAndDisplayHighScore(currentScore) {
    var highScore = getHighScore();
    
    if (currentScore > highScore) {
      highScore = currentScore;
      updateHighScore(highScore);
    }
    
    $(".high-score").text("High Score ="+ highScore);
  }
  


// when the game starts 

$(document).keypress(function () {
    if (!started) {                                                  //need to look forward to key press game starting
        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
        $(".score").text("Score ="+score);
    }
});


//program that plays sound on user click
function playSound(name) {
    switch (name) {
        case "green":
            var green = new Audio('./sounds/green.mp3');
            green.play();
            break;
        case "red":
            var red = new Audio('./sounds/red.mp3');
            red.play();
            break;
        case "violet":
            var violet = new Audio('./sounds/violet.mp3');
            violet.play();
            break;
        case "yellow":
            var yellow = new Audio('./sounds/yellow.mp3');
            yellow.play();
            break;
        case "blue":
            var blue = new Audio('./sounds/blue.mp3');
            blue.play();
            break;
        case "orange":
            var orange = new Audio('./sounds/orange.mp3');
            orange.play();
            break;
        default:
            break;
    }
}

//to animate the buttons on the input of the user

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

// program for next sequence in the game that gives the next colour with a flash  

function nextsequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var n = Math.floor(Math.random() * 6);
    var randomChosenColour = colors[n];
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);


}

//program that registers users click and push it in an array and aswell plays a sound of its respective colour
$(".btn").on("click", handler);
function handler() {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    return userClickedPattern;
}

//program that checks answer 
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
            
            setTimeout(function () {
                nextsequence();
            }, 1000);
            score+=10;
            $(".score").text("Score ="+score);
            updateAndDisplayHighScore(score);

        }
    }
    else {

        // if user gets the answer wrong  then the css and animation
        var wrong = new Audio('./sounds/wrong.mp3');
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);
        $("#level-title").text("Game Over, Press Any Key to Restart ");
        startOver();
       
    }
}

