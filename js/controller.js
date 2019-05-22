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
    appendCardsHtml();
};
function endRound() {
    displayWinner(getTopScore(addUpScores()));
    lightReset();
    deactivateButton();
}
function newRound() {
    resetView();
    reactivateButton();
}
function reset() {
    hardResetView();
    resetPlayers();
}