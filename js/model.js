const cardElems = {
    cards: [],
    Card: function (_id, _value, _used) {
        this.id = _id;
        this.value = _value;
        this.used = _used;
    },
    createCards: function (x) {
        for (let i = 1; i < 14; i++) {
            let newCard = new cardElems.Card(i + x, i, false);
            cardElems.cards.push(newCard);
        };
    }
};
const modelElems = {
    players: [],
    Player: function (_name, _cards, _score) {
        this.name = _name;
        this.cards = _cards;
        this.score = _score
    },
    drawNumber: 0,
    usedCards: []
};
function addPlayerToArray(playerName) {
    if (playerName != "") {
        let newPlayer = new modelElems.Player(playerName, [], 0);
        modelElems.players.push(newPlayer);
    };
};
function getCards() {
    for (let i = 0; i < modelElems.players.length; i++) {
        var cardPosition = (getRandom());
        cardElems.cards[cardPosition].used = true;
        modelElems.players[i].cards.push(cardPosition);
        modelElems.usedCards.push(cardPosition);
    };
    modelElems.drawNumber++;
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
function addUpScores() {
    let scores = [];
    for (let i = 0; i < modelElems.players.length; i++) {
        let total = 0;
        modelElems.players[i].cards.forEach(pos => {
            total += cardElems.cards[pos].value;
        })
        scores.push(total);
    }
    return scores;
};
function getTopScore(array) {
    let highest = 0;
    let highestIndex;
    for (let i = 0; i < array.length; i++) {
        if (array[i] > highest) {
            highest = array[i];
            highestIndex = i;
        }
    }
    modelElems.players[highestIndex].score++;
    return highestIndex;
};
function lightReset() {
    modelElems.usedCards.forEach(card => {
        cardElems.cards[card].used = false;
    });
    modelElems.players.forEach(player => {
        player.cards = [];
    });
    modelElems.usedCards = [];
    modelElems.drawNumber = 0
};
function resetPlayers() {
    modelElems.players = [];
}