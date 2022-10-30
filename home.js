let numOfPlayers = 2;

let player3 = document.getElementById("possiblePlayer3");
player3.addEventListener("click", addPlayer);
player3.addEventListener("mouseover", hoverPlayer);
player3.addEventListener("mouseleave", stopHoverPlayer);

/* Changes styling for player three circle on the home page */
function changePlayerInnerText(player3) {
  if (player3.innerText === "P3") {
    player3.style.fontSize = "17px";
    player3.style.fontWeight = "700";
  } else if (player3.innerText === "+") {
    player3.style.fontSize = "30px";
    player3.style.fontWeight = "400";
  } else if (player3.innerText === "-") {
    player3.style.fontSize = "30px";
    player3.style.fontWeight = "400";
  }
}

/* Adds a third player when the user clicks on the "+" button on the home screen. Alternatively reduces players to two from three
if the player reclicks that same button. */
function addPlayer() {
  numOfPlayers == 2 ? numOfPlayers++ : numOfPlayers--;
  let player3 = document.getElementById("possiblePlayer3");
  if (numOfPlayers == 3) {
    player3.innerText = "P3";
    changePlayerInnerText(player3);
  } else if (numOfPlayers == 2) {
    player3.innerText = "+";
    changePlayerInnerText(player3);
  }
}

/* If player 3 has been selected, and the user hovers over the player 3 button a minus sign appears indicating they 
can get rid of player 3 if they only want 2 players. */
function hoverPlayer() {
  let player3 = document.getElementById("possiblePlayer3");
  if (numOfPlayers == 3) {
    player3.innerText = "-";
    changePlayerInnerText(player3);
  }
}

/* If player 3 has been selected and the user stops hovering over that button the text changes from a minus sign
back to "P3" */
function stopHoverPlayer() {
  let player3 = document.getElementById("possiblePlayer3");
  if (numOfPlayers == 3) {
    player3.innerText = "P3";
    changePlayerInnerText(player3);
  }
}
