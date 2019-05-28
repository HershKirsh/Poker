function prep() {
    cardElems.createCards("C");
    cardElems.createCards("D");
    cardElems.createCards("H");
    cardElems.createCards("S");
    enterFunc();
};
function addPlayer() {
    addPlayerToArray(getPlayerName());
    appendHtml();
};
function drawCards() {
    getCards();
};
function appendCards() {
    appendCardsHtml();
}
function endRound() {
    displayWinner(getTopScore(addUpScores()));
    lightReset();
}
function newRound() {
    resetView();
    activateButton();
}
function reset() {
    hardResetView();
    resetPlayers();
}