const htmlElems = {
    enterNameDiv: document.getElementById("enternames"),
    name: document.getElementById("name"),
    playerName: document.getElementsByClassName("playername"),
    playerCards: document.getElementsByClassName("cards"),
    scoreName: document.getElementsByClassName("nameforscore"),
    deckButton: document.getElementById("hover-card"),
    deckSpan: document.getElementById("deckspan"),
    nameForScore: document.getElementsByClassName("nameforscore"),
    playerScore: document.getElementsByClassName("playerscore"),
    popUp: document.getElementsByClassName("pop-up"),
    winnerSpan: document.getElementById("winner")
};
const viewElems = {
    placeholder: ["First Player's Name", "Second Player's Name", "Third Player's Name", "Fourth Player's Name"],
};
function enterFunc() {
    htmlElems.name.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            document.getElementById("addplayer").click();
        }
    })
};
function getPlayerName() {
    let playerName = htmlElems.name.value;
    return playerName;
};
function appendHtml() {
    if (htmlElems.name.value != "") {
        let x = modelElems.players.length;
        let i = x - 1;
        htmlElems.playerName[i].innerHTML = modelElems.players[i].name;
        htmlElems.nameForScore[i].innerHTML = modelElems.players[i].name;
        htmlElems.name.setAttribute("placeholder", viewElems.placeholder[x]);
        htmlElems.name.value = "";
        if (x == 2) {
            htmlElems.deckSpan.style.visibility = "visible";
            activateButton();
        };
        if (x == 4) {
            htmlElems.enterNameDiv.style.display = "none";
        };
    };
};
function appendCardsHtml() {
    htmlElems.enterNameDiv.style.display = "none";
    for (let x = 0; x < 5; x++) {
        (function (x) {
            setTimeout(function () {
                for (let i = 0; i < modelElems.players.length; i++) {
                    (function (i) {
                        setTimeout(function () {
                            htmlElems.playerCards[i].innerHTML +=
                                `<img src="assets/${cardElems.cards[modelElems.players[i].cards[x]].id}.jpg"
                alt="${cardElems.cards[modelElems.players[i].cards[x]].id}" class="card">`;
                        }, 400 * i);
                    })(i);
                };
            }, (modelElems.players.length * 400) * x);
        })(x);
        if (x == 4) {

            setTimeout(() => {
                endRound();
            }, modelElems.players.length * 2000);
        };
    };
}
function displayWinner(i) {
    setTimeout(() => {
        htmlElems.winnerSpan.innerHTML = `The Winner Is ${modelElems.players[i].name}`;
        htmlElems.playerScore[i].innerHTML = modelElems.players[i].score;
        htmlElems.popUp[0].style.display = "block";
    }, 500);
};
function resetView() {
    htmlElems.popUp[0].style.display = "none";
    for (let i = 0; i < modelElems.players.length; i++) {
        htmlElems.playerCards[i].innerHTML = "";
    };
};
function activateButton() {
    htmlElems.deckButton.addEventListener("click", drawCards, { once: true });
};
function hardResetView() {
    for (let i = 0; i < modelElems.players.length; i++) {
        htmlElems.playerCards[i].innerHTML = "";
        htmlElems.playerScore[i].innerHTML = "";
        htmlElems.playerName[i].innerHTML = "";
        htmlElems.nameForScore[i].innerHTML = "";
    };
    htmlElems.name.setAttribute("placeholder", "First Player's Name");
    htmlElems.deckSpan.style.visibility = "hidden";
    htmlElems.popUp[0].style.display = "none";
    htmlElems.enterNameDiv.style.display = "block";
}