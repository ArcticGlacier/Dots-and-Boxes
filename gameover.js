let currentURL = window.location.href;

const regEx = /(\d{1})-(\d{1})-(\d{1,2})-(\d{1,2})-(\d{1,2})/g;

let scores;
scores = currentURL.split("=").pop();
const matches = [...scores.matchAll(regEx)];

const numOfPlayers = matches[0][1];
const winner = matches[0][2];
const p1Score = matches[0][3];
const p2Score = matches[0][4];
const p3Score = matches[0][5];

window.addEventListener("load", declareWinner);

if (numOfPlayers == 3) {
  renderPlayer3();
}

drawScores();
drawWinnerRing();

function declareWinner() {
  let heading;
  if (winner != 4) {
    heading = document.createTextNode("PLAYER " + winner + " WINS!");
  } else {
    if (p1Score == p2Score && p2Score != p3Score) {
      heading = document.createTextNode("PLAYERS 1 & 2 TIE GAME!");
    } else if (p1Score == p3Score && p3Score != p2Score) {
      heading = document.createTextNode("PLAYERS 1 & 3 TIE GAME!");
    } else if (p2Score == p3Score && p3Score != p1Score) {
      pheading = document.createTextNode("PLAYERS 2 & 3 TIE GAME!");
    } else {
      heading = document.createTextNode("TIE GAME!");
    }
  }
  let parent = document.getElementById("win");
  parent.appendChild(heading);
}

function drawScores() {
  let player1 = document.getElementById("p1");
  player1.innerText = p1Score;

  let player2 = document.getElementById("p2");
  player2.innerText = p2Score;

  if (numOfPlayers == 3) {
    let player3 = document.getElementById("p3");
    player3.innerText = p3Score;
  }
}

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

function drawWinnerRing() {
  // If there is a draw between 2 or more players then draw ring around those dots
  if (winner == 4) {
    let player1 = document.getElementById("p1");
    let player2 = document.getElementById("p2");
    let player3;
    drawRing(player1);
    drawRing(player2);
    if (numOfPlayers == 3 && p1Score == p2Score && p2Score == p3Score) {
      player3 = document.getElementById("p3");
      drawRing(player3);
    } else if (numOfPlayers == 3 && p1Score == p2Score) {
      player3.style.outlineColor = "transparent";
    } else if (numOfPlayers == 3 && p1Score == p3Score) {
      player2.style.outlineColor = "transparent";
    } else if (numOfPlayers == 3 && p2Score == p3Score) {
      player1.style.outlineColor = "transparent";
    }
  } else {
    let playerId = "p" + winner;
    let player = document.getElementById(playerId);
    drawRing(player);
  }
}

function drawRing(player) {
  player.style.outlineStyle = "solid";
  player.style.outlineWidth = "thin";
  player.style.outlineColor = "#d9d9d9";
  player.style.outlineOffset = "12.5px";
}
