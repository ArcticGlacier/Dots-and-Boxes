window.addEventListener("load", renderPlayer3);

let currentTurn = 1;
whoseTurn(currentTurn);

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
}

/* A line appears when a user clicks between two nodes */
function drawLine(event) {
  event.currentTarget.style.height = "5px";
  event.currentTarget.style.backgroundColor = "blue";
  event.currentTarget.style.cursor = "default";
  event.currentTarget.removeEventListener("click", drawLine);
  event.currentTarget.removeEventListener("mouseover", hoverLine);
  event.currentTarget.removeEventListener("mouseleave", stopHoveringLine);
  changeTurn();
  whoseTurn(currentTurn);
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
function whoseTurn(turn) {
  let playerId = "p" + turn;
  let player = document.getElementById(playerId);

  player.style.outlineStyle = "solid";
  player.style.outlineWidth = "thin";
  player.style.outlineColor = "#d9d9d9";
  player.style.outlineOffset = "12.5px";
}

/* Changes whose turn it is */
function changeTurn() {
  currentTurn++;
  if (currentTurn > 3) {
    currentTurn = 1;
  }
}
