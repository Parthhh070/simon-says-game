let gameseq = [];
let userseq = [];
let highscore = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
  }
  levelUp();
});

function levelUp() {
  userseq = [];
  level++;
  h3.innerText = `level ${level}`;

  let random = Math.floor(Math.random() * 3);
  let randomcolor = btns[random];
  let randbtn = document.querySelector(`.${randomcolor}`);
  gameseq.push(randomcolor);
  gameFlash(randbtn);
  console.log(gameseq);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    setTimeout(function () {
      if (gameseq.length == userseq.length) {
        levelUp();
        high();
      }
    }, 1000);
  } else {
    h3.innerHTML = `gameover! your score was <b>${
      level
    } <b>press any key to restart`;

    gameover();
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userseq.push(userColor);
  checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".box");

for (button of allBtns) {
  button.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}

function gameover() {
  let body = document.querySelector("body");
  body.classList.add("over");
  setTimeout(() => {
    body.classList.remove("over");
  }, 1500);
}

function high() {
  if (level > highscore) {
    highscore = level;
  }
  h2.innerText = `highscore : ${highscore}`;
}
