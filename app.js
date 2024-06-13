let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-game");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const game = document.querySelector(".game");
const gameheading = document.querySelector("h1");

const indicator = Math.round(Math.random());
let turn0 = Boolean(indicator); //player X
console.log(turn0);
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const newGame = () => {
  enableBoxes();
  msgContainer.classList.add("hide");
  game.classList.remove("hide");
  gameheading.classList.remove("hide");
  resetbtn.classList.remove("hide");
};
const resetGame = () => {
  location.reload();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
};
const showTie = () => {
  msg.innerText = `It's a Tie!!!! \n You may restart the game by clicking bellow button`;
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  let winnerFound = false;
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        disableBoxes();
        game.classList.add("hide");
        gameheading.classList.add("hide");
        resetbtn.classList.add("hide");
        winnerFound = true;
      }
    }
  }

  if (!winnerFound) {
    checkTie();
  }
};

const checkTie = () => {
  let allFilled = true;
  boxes.forEach((box) => {
    if (box.innerText === "") {
      allFilled = false;
    }
  });

  if (allFilled) {
    showTie();
    disableBoxes();
    game.classList.add("hide");
    gameheading.classList.add("hide");
    resetbtn.classList.add("hide");
  }
};

newGameBtn.addEventListener("click", newGame);
resetbtn.addEventListener("click", resetGame);
