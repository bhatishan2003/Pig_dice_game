'use strict';
// Selecting elements by id
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//Beginning Steps

function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling Dice

btnRoll.addEventListener('click', function () {
    if (playing) {
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        // Check for 1 (switch player)
        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //Switch Player
            switchPlayer()
            // toggle --> add class if not there or remove if there 
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // Add Current score to score of active player
        scores[activePlayer] += currentScore; //eg scores[1] = scores[1] + currentScore
        console.log(scores[activePlayer]);
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score >= 100
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add('hidden');
            // Finish Game
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch Player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);