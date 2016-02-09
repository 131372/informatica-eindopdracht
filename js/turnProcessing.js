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
function newGameStart() {
    // remove stuff
    var deck1 = createDeck1();
    var randomDeck1 = randomDeck(deck1);
    gameObject.deck = randomDeck1;
    dealCards(deck, gameObject.playerAmount);
    // reset turnorder
    for (i=1; i < playerAmount + 1; i++){
    gameObject.hands["i"]= [];
}

function count(object) {
combinations = gameObject.combinations;
if (Object.keys) { 
        return Object.keys(object).length;
    }
    }
 return count(combinations);
}