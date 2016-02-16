function isTurn() {
    console.log(gameObject["players"]);
    console.log(gameObject['currentPlayer']);
    console.log(gameObject['players'][gameObject['currentPlayer']]);

    name = gameObject['players'][gameObject['currentPlayer']];
    console.log(name, username, hostName);
    if (name == username || name == hostName) {
        return true;
    }
    return false;
}

function checkForGameEnd(deck, hands) {
    var emptyHand = false;
    if (deck.length == 0) {
        return true;
    }
    $.each(hands, function (index, value) {
        if (value.length == 0) {
            emptyHand = true;
        }
    });
    if (emptyHand) {
        return true;
    }
    return false;
}

function checkForProtonNeutronGameEnd(currentPlayerCombinations) {
    uCount = 0;
    dCount = 0;
    $.each(currentPlayerCombinations, function (index, value) {
        $.each(value, function (index, value) {
            if (value['name'] == "u" && !value['anti']) {
                uCount++;
            }
            if (value['name'] == "d" && !value['anti']) {
                dCount++;
            }
        });
    });
    if (uCount == 2 && dCount == 1) {
        return true;
    }

    if (uCount == 1 && dCount == 2) {
        return true;
    }
    return false;
}

/**
 * creates a new deck and shuffles it. Deals the cards to the players
 * @returns {undefined}
 */

function removeCombinations() {
    for(var i = 1; i <= Object.keys(gameObject.combinations).length; i++){
        gameObject["combinations"][String(i)] = [];
    }
}
        
function newGameStart() {
    // reset turnorder!!!
    for (i=1; i < playerAmount + 1; i++){
        gameObject.hands["i"]= [];
    }
    removeCombinations();    
    cardsDeal = dealCards(randomDeck(createDeck1()), gameObject['playerAmount']);
    gameObject['deck'] = cardsDeal[1];
    for(var i = 0; i < gameObject['playerAmount']; i++){
        gameObject['hands'][String(i+1)] = cardsDeal[0][i];
    }
    //stuur naar database!!
}