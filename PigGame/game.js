"use strict";
//selecting Elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

//intial conditions
let playing;

let currentscore;
let activeplayer;
let scores;

const intial = function () {
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  currentscore = 0;
  activeplayer = 0;
  scores = [0, 0];

  document.querySelector(`#current--0`).textContent = currentscore;
  document.querySelector(`#current--1`).textContent = currentscore;
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
};

intial();

const switchplayer = function () {
  currentscore = 0;
  document.querySelector(`#current--${activeplayer}`).textContent =
    currentscore;
  activeplayer = activeplayer == 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    let dice = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    if (dice !== 1) {
      currentscore += dice;
      document.querySelector(`#current--${activeplayer}`).textContent =
        currentscore;
    } else {
      switchplayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //add current score to active player
    scores[activeplayer] += currentscore;
    // check if players score is >=100
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    if (scores[activeplayer] >= 50) {
      playing = false;
      diceEl.classList.add("hidden");
      //finish the game
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    } else {
      //switch to the next player
      switchplayer();
    }
  }
});

btnNew.addEventListener("click", intial);
