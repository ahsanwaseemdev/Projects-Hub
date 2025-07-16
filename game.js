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

button.addEventListener("click", function () {
  const guess = Number(input.value);
  if (!guess || guess < 1 || guess > 20) {
    message.textContent = "❌ Please enter a number between 1 and 20!";
  } else {
    if (currscore < 1) {
      message.textContent = "💥 You lost the game!";
      input.disabled = true;
      button.disabled = true;
    } else {
      if (guess < secretNumber) {
        message.textContent = "📉 Too low!";
        guessmsg.textContent = "Wrong Number";
        currscore--;
        score.textContent = currscore;
      } else if (guess > secretNumber) {
        message.textContent = "📈 Too high!";
        guessmsg.textContent = "Wrong Number";
        currscore--;
        score.textContent = currscore;
      } else {
        message.textContent = "🏆 Winner!";
        guessmsg.textContent = `${secretNumber} is Correct`;
        body.style.backgroundColor = "#0b2447";
        color1.style.backgroundColor = "#0b2447";
        color2.style.backgroundColor = "#0b2447";
        input.disabled = true;
        button.disabled = true;
        if (currscore > highscore) {
          highscore = currscore;
          Highscore.textContent = highscore;
        }
      }
    }
  }
});

againbtn.addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  currscore = 20;
  score.textContent = currscore;
  guessmsg.innerHTML = "Guess My Number!";
  message.innerHTML = "Choose option.........";
  input.disabled = false;
  button.disabled = false;
  input.value = "";
  body.style.backgroundColor = "#0b0c10";
  color1.style.backgroundColor = "#0b2447";
  color2.style.backgroundColor = "#19376d";
});
