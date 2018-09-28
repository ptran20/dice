/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

var dice_img = document.querySelector(".dice");


init();



//when ROLL button is clicked
document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        //random number
        var randomNum = Math.floor(Math.random() * 6) + 1;
        //display result

        dice_img.style.display = "block";

        dice_img.src = "dice-" + randomNum + ".png";
        //update the round score if the rolled num was not 1

        if (randomNum !== 1) {
            roundScore += randomNum;
            document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
        } else {
            //next player--switch to other players when 1 is hit
            nextPlayer();
        }
    }


});

//when HOLD button is pressed
document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        //add current score to the scores array using bracket notation 
        scores[activePlayer] += roundScore;


        //update UI
        //if it is the first player, will be the first element of the array
        //second player, second element of the array
        document.getElementById("score-" + activePlayer).innerHTML = scores[activePlayer];

        //check if player won the game
        if (scores[activePlayer] >= 20) {
            document.getElementById("name-" + activePlayer).textContent = "Winner";
            dice_img.style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            //switch player
            nextPlayer();
        }
    }

});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").innerHTML = 0;
    document.getElementById("current-1").innerHTML = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    dice_img.style.display = "none";

}

//when NEWGAME button is hit
document.querySelector(".btn-new").addEventListener("click", init);


//initializing the game 
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}
