let input = document.querySelector(".input");
let message = document.querySelector(".correct");
let button = document.querySelector(".checkbtn");
let guessmsg = document.querySelector(".guesshead");
let body = document.querySelector("body");
let color1 = document.querySelector(".upperdiv");
let color2 = document.querySelector(".middlediv");
let againbtn = document.querySelector(".againbtn");
let score = document.querySelector(".mainscore");
let Highscore = document.querySelector(".Highscore");

let currscore = 20;
let highscore = 0;
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// Function to change background colors
function updatestyle(color) {
  body.style.backgroundColor = color;
  color1.style.backgroundColor = color;
  color2.style.backgroundColor = color;
}

// Function for wrong guesses
let wrong = (msg) => {
  message.textContent = msg;
  guessmsg.textContent = "Wrong Number";
  currscore--;
  score.textContent = currscore;
  updatestyle("red");
};

// Function to update high score
function newhigh() {
  if (currscore > highscore) {
    highscore = currscore;
    Highscore.textContent = highscore;
  }
}

// Main button logic
button.addEventListener("click", function () {
  let guess = Number(input.value);

  if (!guess || guess < 1 || guess > 20) {
    message.textContent = "❌ Please enter a number between 1 and 20!";
  } else if (guess === secretNumber) {
    message.textContent = "🏆 Winner!";
    guessmsg.textContent = `${secretNumber} is Correct`;
    updatestyle("green");
    input.disabled = true;
    button.disabled = true;
    newhigh();
  } else {
    guess < secretNumber ? wrong("📉 Too low!") : wrong("📈 Too high!");

    if (currscore < 1) {
      message.textContent = "💥 You lost the game!";
      input.disabled = true;
      button.disabled = true;
    }
  }
});

// Reset game
againbtn.addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  currscore = 20;
  score.textContent = currscore;
  guessmsg.innerHTML = "Guess My Number!";
  message.innerHTML = "Choose option.........";
  input.disabled = false;
  button.disabled = false;
  input.value = "";
  updatestyle("#0b0c10"); // Reset to default color
});
