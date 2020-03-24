/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer;

init();

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; // Player1 is 0 and player2 is 1

  document.querySelector(".dice").style.display = "none";
  // style is a method for changing the size
  // dice is a class of our dice
  // style.display-> display is the property which we are setting to none
  // this uses inline css

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player1";
  document.getElementById("name-1").textContent = "Player2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}

document.querySelector(".btn-roll").addEventListener("click", function() {
  // 1. Random no.
  var dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the result

  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";
  // src is a img attrbute and dice- is the initial name follwed by number appread on dice
  // so here if 1 turn up then 'dice-'+1+'.png' so this will show dice-1.png

  // 3. update the round score IF rolled number was not 1

  if (dice !== 1) {
    // Add Score
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
});

// eventListener takes two args
// 1st:- event like click, hover, dbclick, etc
// 2nd:- function or task to be performed
// we can fist define a function and call it or just put a anonmyous function there itself.

// ----------------------------------------------------

// for the HOLD button
document.querySelector(".btn-hold").addEventListener("click", function() {
  // Add current score to global score
  scores[activePlayer] += roundScore;

  // Update the UI
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  // Check if player won the game

  if (scores[activePlayer] >= 30) {
    // calling winner
    document.querySelector("#name-" + activePlayer).innerHTML = "WINNER!";

    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    // Next player
    nextPlayer();
  }
});

function nextPlayer() {
  // Next Player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // set current to zero
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;

  //document.querySelector(".player-0-panel").classList.remove("active");
  // this will revoe the active class from player1
  //document.querySelector(".player-1-panel").classList.add("active");
  // add the active clas to player-2

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

// ----------------------------------------------------
// For NEW GAME (button New)
document.querySelector(".btn-new").addEventListener("click", init);
// init()-> to set everything at zero and starts the game
// we cannot put () bcz we want it to be called only when someone clicks on it.

// ---------------------------------------------------

//dice = Math.floor(Math.random() * 6) + 1;
// Math.floor round off the number to the lower one eg: 4.6=4
// Math.random generates a decimal value between 0 and 1
// the combination wil give value friom 0-5 so adding 1 each time to make it 1-6

// ----------------------------------------------------

//document.querySelector("#current-" + activePlayer).textContent = dice;
// textContent-> to change the text of a particular place
// this will just give us the content
// but if we wanna insert some HTML then we need to use
// innerHTML

// document.querySelector("#current-" + activePlayer).innerHTML =
//   "<em>" + dice + "<em>";

// -----------------------------------------------------

//var x = document.querySelector("#score-0").textContent;
// for get/read the value using textContent and storing to x
