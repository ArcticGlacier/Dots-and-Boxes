/*Indicates whether or not a side of a square has been filled with a line or not
0 = vacant, and 1 = line drawn */
let square = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

let squares = [
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
  { ...square },
];

let completedSquares = 0;
let currentTurn = 1;
let p1Score = 0;
let p2Score = 0;
let p3Score = 0;
let winner;
let numOfPlayers;

/*Parse number of players from url */
let currentURL = window.location.href;
for (let i = 0; i < currentURL.length; i++) {
  if (currentURL[i] == "=") {
    numOfPlayers = currentURL[i + 1];
  }
}

if (numOfPlayers == 3) {
  window.addEventListener("load", renderPlayer3);
}

whoseTurn();

/*Adding event listeners */
const lines = document.getElementsByClassName("line");

for (let i = 0; i < lines.length; i++) {
  lines[i].addEventListener("mouseover", hoverLine);
  lines[i].addEventListener("mouseleave", stopHoveringLine);
}

for (let i = 0; i < lines.length; i++) {
  lines[i].addEventListener("click", drawLine);
}

const endGameBtn = document.getElementById("end");
endGameBtn.addEventListener("click", endGame);

const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", restart);

/* If three players have been selected, render third player in either game or gameover screen*/
function renderPlayer3() {
  let p3 = document.createElement("button");
  let scoreDiv = document.getElementById("score");
  p3.disabled = true;
  p3.id = "p3";
  p3.innerText = 0;
  scoreDiv.appendChild(p3);

  p3.style.outlineStyle = "solid";
  p3.style.outlineWidth = "thin";
  p3.style.outlineColor = "transparent";
  p3.style.outlineOffset = "12.5px";
}

/* A line appears when a user clicks between two nodes */
function drawLine(event) {
  event.currentTarget.style.height = "5px";
  if (currentTurn === 1) {
    event.currentTarget.style.backgroundColor = "#db92ed";
  } else if (currentTurn === 2) {
    event.currentTarget.style.backgroundColor = "#9fffee";
  } else {
    event.currentTarget.style.backgroundColor = "#fffb9f";
  }

  event.currentTarget.style.cursor = "default";
  event.currentTarget.removeEventListener("click", drawLine);
  event.currentTarget.removeEventListener("mouseover", hoverLine);
  event.currentTarget.removeEventListener("mouseleave", stopHoveringLine);
  updateDrawnLines(event.currentTarget);
}

/* When hovering between two nodes, a greyed out line appears to indicate to the user
that they will draw a line there if they click */
function hoverLine(event) {
  event.currentTarget.style.transition = "0.25s";
  event.currentTarget.style.height = "5px";
  event.currentTarget.style.backgroundColor = "#5A5A5A";
  event.currentTarget.style.cursor = "pointer";
}

/* Greyed out line that appears when hovering goes away when the user moves mouse*/
function stopHoveringLine(event) {
  event.currentTarget.style.backgroundColor = "transparent";
}

/* A ring appears around the player whose turn it is*/
function whoseTurn() {
  let playerId = "p" + currentTurn;
  let player = document.getElementById(playerId);

  player.style.outlineStyle = "solid";
  player.style.outlineWidth = "thin";
  player.style.outlineColor = "#d9d9d9";
  player.style.outlineOffset = "12.5px";
  player.style.transition = "0.75s";
}

/* removing ring from previous player to indicate its no longer their turn */
function removeTurn() {
  let playerId = "p" + currentTurn;
  let player = document.getElementById(playerId);

  player.style.outlineStyle = "solid";
  player.style.outlineWidth = "thin";
  player.style.outlineColor = "transparent";
  player.style.outlineOffset = "12.5px";
  player.style.transition = "0.75s";
}

/* Changes whose turn it is */
function changeTurn() {
  removeTurn();
  if (numOfPlayers == 3) {
    currentTurn + 1 > 3 ? (currentTurn = 1) : currentTurn++;
  } else {
    (currentTurn + 1) % 2 == 0 ? (currentTurn = 2) : (currentTurn = 1);
  }
  whoseTurn();
}

/* Updates which square's sides were filled based on line drawn */
function updateDrawnLines(line) {
  let lineType = line.classList[1];

  let squareNum = line.parentElement.classList[1];
  let firstSquare = squares[squareNum - 1];

  let squareNum2;
  let secondSquare;

  if (
    lineType == "top" &&
    (squareNum == "1" ||
      squareNum == "2" ||
      squareNum == "3" ||
      squareNum == "4")
  ) {
    squares[squareNum - 1].top = 1;
  } else if (lineType == "left" && squareNum % 4 == 1) {
    squares[squareNum - 1].left = 1;
  } else if (lineType == "bottom") {
    squares[squareNum - 1].bottom = 1;
  } else if (lineType == "right") {
    squares[squareNum - 1].right = 1;
  } else if (lineType == "left") {
    squares[squareNum - 1].left = 1;
    squares[squareNum - 2].right = 1;
    secondSquare = squares[squareNum - 2]; // get the square to the left of current square
    squareNum2 = squareNum - 1;
  } else if (lineType == "top") {
    squares[squareNum - 1].top = 1;
    squares[squareNum - 5].bottom = 1;
    secondSquare = squares[squareNum - 5]; // get square above current square
    squareNum2 = squareNum - 4;
  }
  let boxCompleted = isBoxComplete(
    firstSquare,
    squareNum,
    secondSquare,
    squareNum2
  );
  if (!boxCompleted) {
    changeTurn();
  } else {
    if (completedSquares == 16) {
      endGame();
      window.location.href = `./gameover.html?winner=${numOfPlayers}-${winner}-${p1Score}-${p2Score}-${p3Score}`;
    }
  }
}

/*Checks if a square has been completed. Sometimes a single line can complete 2 squares.
Colors the square if its been completed based on the player's color.*/
function isBoxComplete(square1, id1, square2, id2) {
  let boxComplete = false;
  if (
    square1.top != 0 &&
    square1.left != 0 &&
    square1.right != 0 &&
    square1.bottom != 0
  ) {
    completedSquares++;
    colorBox(id1);
    updateScore();
    boxComplete = true;
  }
  if (
    square2 != null &&
    square2.top != 0 &&
    square2.left != 0 &&
    square2.right != 0 &&
    square2.bottom != 0
  ) {
    completedSquares++;
    colorBox(id2);
    updateScore();
    boxComplete = true;
  }
  return boxComplete;
}

/* Updates the players score if they completed a box*/
function updateScore() {
  let player = "p" + currentTurn;
  let playerScore = document.getElementById(player);

  if (currentTurn == 1) {
    p1Score++;
    playerScore.innerText = p1Score;
  } else if (currentTurn == 2) {
    p2Score++;
    playerScore.innerText = p2Score;
  } else if (currentTurn == 3) {
    p3Score++;
    playerScore.innerText = p3Score;
  }
}

/* Colors corresponding box that has been flled with color of player who filled it*/
function colorBox(boxId) {
  let box = document.getElementsByClassName(boxId);
  box[0].style.transition = "0.5s";
  if (currentTurn == 1) {
    box[0].style.backgroundColor = "rgb(219, 146, 237,0.5)";
  } else if (currentTurn == 2) {
    box[0].style.backgroundColor = "rgb(159, 255, 238,0.5)";
  } else if (currentTurn == 3) {
    box[0].style.backgroundColor = "rgb(255, 251, 159,0.5)";
  }
}

/*Calculates winner if the game ends */
function endGame() {
  if (p1Score > p2Score && p1Score > p3Score) {
    winner = "1";
  } else if (p2Score > p1Score && p2Score > p3Score) {
    winner = "2";
  } else if (p3Score > p1Score && p3Score > p2Score) {
    winner = "3";
  } else {
    winner = "4";
  }
  endGameBtn.value = `${numOfPlayers}-${winner}-${p1Score}-${p2Score}-${p3Score}`;
}

/*Reset all variables and clear the board if the restart button has been clicked */
function restart() {
  clearScores();
  clearLines();
  clearBoxes();
  resetSquares();
}

/*Reset scores to 0 */
function clearScores() {
  let p1 = document.getElementById("p1");
  let p2 = document.getElementById("p2");

  p1.innerText = 0;
  p2.innerText = 0;

  if (numOfPlayers == 3) {
    let p3 = document.getElementById("p3");
    p3.innerText = 0;
  }

  removeTurn();

  currentTurn = 1;
  p1Score = 0;
  p2Score = 0;
  p3Score = 0;

  whoseTurn();
}

/*Erase lines on the board */
function clearLines() {
  let lines = document.getElementsByClassName("line");
  for (let i = 0; i < lines.length; i++) {
    lines[i].style.backgroundColor = "transparent";
    lines[i].style.transition = "0.5s";
    lines[i].addEventListener("click", drawLine);
    lines[i].addEventListener("mouseover", hoverLine);
    lines[i].addEventListener("mouseleave", stopHoveringLine);
  }
}

/*Erase filled in boxes on the board */
function clearBoxes() {
  for (let i = 0; i < 16; i++) {
    let box = document.getElementsByClassName(i + 1);
    box[0].style.backgroundColor = "transparent";
    box[0].style.transition = "0.5s";
  }
}

/*Resets filled line values for each square */
function resetSquares() {
  completedSquares = 0;

  squares = [
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
    { ...square },
  ];
}
