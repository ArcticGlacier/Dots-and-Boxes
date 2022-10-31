window.addEventListener("load", renderPlayer3);

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

let numOfCompletedSquares = 0;
let currentTurn = 1;
let p1Score = 0;
let p2Score = 0;
let p3Score = 0;
whoseTurn();

const lines = document.getElementsByClassName("line");

for (let i = 0; i < lines.length; i++) {
  lines[i].addEventListener("mouseover", hoverLine);
  lines[i].addEventListener("mouseleave", stopHoveringLine);
}

for (let i = 0; i < lines.length; i++) {
  lines[i].addEventListener("click", drawLine);
}
/* If three players have been selected, render third player in either game or gameover screen*/
function renderPlayer3() {
  let p3 = document.createElement("button");
  let scoreDiv = document.getElementById("score");
  p3.disabled = true;
  p3.id = "p3";
  p3.innerText = "0";
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
  currentTurn++;
  if (currentTurn > 3) {
    currentTurn = 1;
  }
  whoseTurn();
}

/* Updates which square's sides were filled based on line drawn */
function updateDrawnLines(line) {
  let lineType = line.classList[1];
  let squareNum = line.parentElement.classList[1];
  let firstSquare = squares[squareNum - 1];
  let secondSquare = squares[squareNum - 1];

  if (
    lineType == "top" &&
    (squareNum == "1" ||
      squareNum == "2" ||
      squareNum == "3" ||
      squareNum == "4")
  ) {
    squares[squareNum - 1].top = 1;
  } else if (
    lineType == "left" &&
    (squareNum == "1" ||
      squareNum == "5" ||
      squareNum == "9" ||
      squareNum == "13")
  ) {
    squares[squareNum - 1].left = 1;
  } else if (lineType == "bottom") {
    squares[squareNum - 1].bottom = 1;
  } else if (lineType == "right") {
    squares[squareNum - 1].right = 1;
  } else if (lineType == "left") {
    squares[squareNum - 1].left = 1;
    squares[squareNum - 2].right = 1;
    secondSquare = squares[squareNum - 2];
  } else if (lineType == "top") {
    squares[squareNum - 1].top = 1;
    squares[squareNum - 5].bottom = 1;
    secondSquare = squares[squareNum - 5];
  }
  let boxCompleted = isBoxComplete(firstSquare, secondSquare);
  if (!boxCompleted) {
    changeTurn();
  }
}

/*Checks if a square has been completed*/
function isBoxComplete(square1, square2) {
  if (
    square1.top != 0 &&
    square1.left != 0 &&
    square1.right != 0 &&
    square1.bottom != 0
  ) {
    updateScore();
    return true;
  } else if (
    square2.top != 0 &&
    square2.left != 0 &&
    square2.right != 0 &&
    square2.bottom != 0
  ) {
    updateScore();
    return true;
  }
  return false;
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

function colorBox(boxId) {
  let box = document.getElementsByClassName(boxId);
  if (currentTurn == 1) {
    box.style.backgroundColor = "#db92ed";
  } else if (currentTurn == 2) {
    box.style.backgroundColor = "#9fffee";
  } else if (currentTurn == 3) {
    box.style.backgroundColor = "#fffb9f";
  }
}
