const cardElems = {
    cards: [],
    Card: function (_id, _value, _used) {
        this.id = _id;
        this.value = _value;
        this.used = _used;
    },
    createCards: function (x) {
        for (let i = 1; i < 14; i++) {
            newCard = new cardElems.Card(i + x, i, false);
            cardElems.cards.push(newCard);
        };
    }
};
cardElems.createCards("C");
cardElems.createCards("D");
cardElems.createCards("H");
cardElems.createCards("S");
const htmlElems = {
    enterNameDiv: document.getElementById("enternames"),
    name: document.getElementById("name"),
    playerName: document.getElementsByClassName("playername"),
    playerCards: document.getElementsByClassName("cards"),
    scoreName: document.getElementsByClassName("nameforscore"),
    drawButton: document.getElementById("hover-card"),
    drawSpan: document.getElementById("deckspan"),
    nameForScore: document.getElementsByClassName("nameforscore"),
    playerScore: document.getElementsByClassName("playerscore"),
    popUp: document.getElementsByClassName("pop-up"),
    winnerSpan: document.getElementById("winner")
};
const gameElems = {
    players: [],
    Card: function (_name, _cardsValue, _score) {
        this.name = _name;
        this.cardsValue = _cardsValue;
        this.score = _score
    },
    placeholder: ["First Player's Name", "Second Player's Name", "Third Player's Name", "Fourth Player's Name"],
    drawNumber: 0
};
const gameFuncs = {
    enterFunc: (() => {
        htmlElems.name.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                document.getElementById("addplayer").click();
            }
        })
    })()
}
function addPlayer() {
    let playerName = htmlElems.name.value;
    if (playerName != "") {
        gameElems.players.push(playerName);
        htmlElems.playerName[gameElems.players.length - 1].innerHTML = playerName;
        htmlElems.nameForScore[gameElems.players.length - 1].innerHTML = playerName;
        htmlElems.name.setAttribute("placeholder", gameElems.placeholder[gameElems.players.length]);
        htmlElems.name.value = "";
        if (gameElems.players.length == 2) {
            htmlElems.drawButton.addEventListener("click", drawCards);
            htmlElems.drawSpan.style.visibility = "visible";
        };
        if (gameElems.players.length == 4) {
            htmlElems.enterNameDiv.style.display = "none";
        };
    };
};
function drawCards() {
    htmlElems.enterNameDiv.style.display = "none";
    for (let i = 0; i < gameElems.players.length; i++) {
        var cardPosition = (getRandom());
        cardElems.cards[cardPosition].used = true;
      //  cardElems.usedCards.push(cardPosition);
        htmlElems.playerCards[i].innerHTML +=
            `<img src="assets/${cardElems.cards[cardPosition].id}.jpg" 
            alt="${cardElems.cards[cardPosition].id}" class="card">`;
        gameElems.players[i].cards.push(cardPosition);
    };
    gameElems.drawNumber++;
    if (gameElems.drawNumber == 5) {
        setTimeout(() => {
            htmlElems.popUp[0].style.display = "block";
            endRound();
        }, 2000);
    };
};
function getRandom() {
    var num;
    var i = 0;
    while (i < 53) {
        num = Math.floor(Math.random() * 52);
        if (cardElems.cards[num].used) {
            continue
        } else {
            break
        }
    }
    return num;
};
function endRound() {
    let scores = [gameElems.playerCards[0].score.reduce(addUpValues), gameElems.playerCards[1].score.reduce(addUpValues)];
    if (gameElems.players.length >= 3) {
        scores.push(gameElems.playerCards[2].score.reduce(addUpValues));
    };
    if (gameElems.players.length == 4) {
        scores.push(gameElems.playerCards[3].score.reduce(addUpValues));
    };
    htmlElems.drawButton.removeEventListener("click", drawCards);
    let i = getTopScore(scores);
    gameElems.drawNumber = 0;
    htmlElems.winnerSpan.innerHTML = `The Winner Is ${gameElems.players[i]} with a value of ${scores[i]}`;
    gameElems.playersScore[i]++;
    htmlElems.playerScore[i].innerHTML = gameElems.playersScore[i];
    gameElems.playerCards = [{ score: [] }, { score: [] }, { score: [] }, { score: [] }];
};
function addUpValues(total, num) {
    return total + num;
}
function getTopScore(array) {
    let highest = 0;
    let highestIndex;
    for (let i = 0; i < array.length; i++) {
        if (array[i] > highest) {
            highest = array[i];
            highestIndex = i;
        }
    } return highestIndex;
};
function newRound() {
    gameElems.usedCards = [];
    htmlElems.popUp[0].style.display = "none";
    htmlElems.drawButton.addEventListener("click", drawCards);
    for (let i = 0; i < gameElems.players.length; i++) {
        htmlElems.playerCards[i].innerHTML = "";
    };
};
function reset() {
    for (let i = 0; i < gameElems.players.length; i++) {
        htmlElems.playerCards[i].innerHTML = "";
        htmlElems.playerScore[i].innerHTML = "";
        htmlElems.playerName[i].innerHTML = "";
        htmlElems.nameForScore[i].innerHTML = "";
    };
    htmlElems.name.setAttribute("placeholder", "First Player's Name");
    htmlElems.popUp[0].style.display = "none";
    htmlElems.enterNameDiv.style.display = "block";
    gameElems.players = [];
    gameElems.usedCards = [];
    gameElems.drawNumber = 0;
    gameElems.playersScore = [0, 0, 0, 0];
};
//  if (gameElems.drawNumber > 0) {
        //document.getElementById("cards" + (i)).lastElementChild.setAttribute("class", "card");
        // }