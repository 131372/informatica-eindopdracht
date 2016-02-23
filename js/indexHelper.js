//indien merge probleem revert this change
function getCard(score) {
    gameObject["points"][gameObject.currentplayer] -= 1;
    gameObject["hand"][gameObject.currentplayer].push(drawCard(gameObject["deck"]));
    updateUIAppendCards(gameObject["hand"][gameObject.currentplayer], false, "#Hand", 100, 100, "");
    updateDeck(gameObject["deck"], 100, 100, deck);
};				//supposed to be able to let you buy a card in exchange for a point


gameInProgress = false; //iedereen moet een nummer krijgen voor turnorder, deck aanmaken, kaarten uitdelen, playerAmount
realGameInProgress = false;				//set to true when the host presses start game
delay = false;							//used to delay something which would cause errors if it were executed immediately
userPlayerNumber = 1;					//the player number of the client
gameObject = {
    gameEnd: false,						//whether the game has ended
    round: 1,							//the current round
    playerNumberSet: false,				//whether each player has received their respective player number
    currentPlayer: 2,					//the player whose turn it is
    playerAmount: 3,					//the amount of players in the game
    combinations: {1: [], 2: [], 3: []},				//the combinations per player
    players: {1: "host", 2: "guest1", 3: "guest2"}, // moet dit geen array zijn, want er kunnen meer dan 3 mensen meedoen OF meerdere velden tot het maximum aantal spelers.
    hands: {1: {1: 1, 2: 2}, 2: [{name: "d", anti: false, colour: "g"}, {name: "u", anti: false, colour: "r"}, {name: "c", anti: false, colour: "b"}, {name: "d", anti: true, colour: "g"}, {name: "u", anti: true, colour: "r"}, {name: "c", anti: true, colour: "b"}], 3: {1: 1, 2: 2}},				//the hand of cards per player
    points: {1: 0, 2: 0, 3: 0},								//points per player
    currentCombinationCards: [],									//the cards that are being played for the current combination
    currentlyShowingCombinationsOf: {1: 2, 2: 1, 3: 1},				//the player whose combination is currently shown per player
    currentlyShowingCombinationKey: {1: -1, 2: -1, 3: -1},			//the key of the combination that is currently being shown per player
    deck: []				//the deck of cards from which cards will be drawn, will be created upon the start of a game
};							//gameObject is where all information is stored that is available to all players and is the only information that will be uploaded to the database (it is currently full of testing information which could theoretically be removed since it will be overwritten upon the start of the game)

$(function () {
    storage = setInterval(function () {
        if (gameInProgress) {
            if (gameObject['currentPlayer'] != userPlayerNumber) {
                $.ajax({
                    url: "getGameState.php"
                }).done(function (data) {
                    if ((JSON.parse(data))['round'] != gameObject['round'] && delay) {
                        alert("De vorige ronde is afgelopen. Een nieuwe ronde is begonnen!");
                    }
                    else if ((JSON.parse(data))['round'] != gameObject['round']) {
                        alert("De vorige ronde is afgelopen. Een nieuwe ronde is begonnen!");
                        delay = true;
                    } else if((JSON.parse(data))['gameEnd']){
                        loserEndGameNotif();
                    }
                    gameObject = JSON.parse(data);
                    updateUIAppendCards(gameObject['currentCombinationCards'], false, "#Cards", 100, 100, "Current cards played for combination");
                    updateUIAppendCards(gameObject['combinations'][userPlayerNumber], true, "#Combination", 100, 100, "Your combinations:");
                    updateUIAppendCards(gameObject['hands'][userPlayerNumber], false, "#Hand", 100, 100, "");
                    updateTurnOrder();
                });
            }
        }
    }, 1000);
});

function loserEndGameNotif(){
    pointsArray = Object.keys(gameObject.points).map(function(key){
        return gameObject.point[key];
    });
    maxPoints = Math.max.apply( null, pointsArray );
    winnerPlayerNr = getKeyByValueInObject(maxPoints, gameObject.points);
    winnerPlayer = gameObject.players[winnerPlayerNr];
    realGameInProgress = false;
    alert("Het spel is voorbij, " + winnerPlayer + "heeft gewonnen met" + maxPoints + " punten" + "!");
}

function getGame() {
    $.ajax({
        url: "getGameState.php"
    }).done(function (data) {
        //console.log(data);
        gameObject = JSON.parse(data);
        //console.log(gameObject);
        //updateUIAppendCards(gameObject['currentCombinationCards'],false,"#Cards",100,100,"Current cards played for combination");
        //updateUIAppendCards(gameObject['combinations'][userPlayerNumber],true,"#Combination",100,100,"Your combinations:");
        //updateUIAppendCards(gameObject['hands'][userPlayerNumber],false,"#Hand",100,100,"");
    });
}

//console.log(gameObject["players"]);
function isTurn() {
    name = gameObject['players'][gameObject['currentPlayer']];
    if (name == username || name == hostName) {
        return true;
    }
    return false;
}

$(function () {
    storage = setInterval(function () {
        if (gameInProgress) {
            //if(gameObject['turn']==gameObject['player']){
            $.ajax({
                url: "getGameState.php"
            }).done(function (data) {
                //console.log(data);
                //gameObject=JSON.parse(data);
            });
            //}
        }
    }, 1000);
});

function getKeyByValueInObject(value, object) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (object[prop] == value) {
                return prop;
            }
        }
    }
}

$(function () {
    hostName = $("#hostName").html();
    username = $("#username").html();			//get the host or username (can be empty if none exist)
    gameId = $("#gameId").html();				//get the game ID	(can be empty if none exist)
    if (hostName != "" || username != "") {
        $("#createGame").css("display", "none");
        $("#username2").css("display", "none");
        $("#games").css("display", "none");
        $("#wait").css("display", "block");
    } //if the user is currently a host or a guest show the proper interface
    findStart = setInterval(function () {
        if (!realGameInProgress && gameId != "") {
            $.ajax({
                url: "getOngoingGame.php",
                method: "POST",
                data: {"gameId": gameId}
            }).done(function (data) {
                //console.log(data);
                if (data == 1) { // (1)
                    gameInProgress = true;
                    realGameInProgress = true;
                    displayActiveGame();
                } else if (data == 0) { // might remove (1) and this one.
                    realGameInProgress = false;
                } else {
                    //console.log('gameojbjejekej');
                    realGameInProgress = true;
                    gameInProgress = true;
                    gameObject = JSON.parse(data);
                    if (gameObject['gameInProgress']) {
                        displayActiveGame();
                        userPlayerNumber = getKeyByValueInObject(username, gameObject.players);
                        //console.log(userPlayerNumber);
                    }
                }
            });
        }
    }, 1000);
})

$(function () {
    hostName = $("#hostName").html();
    username = $("#username").html();			//get the host or username (can be empty if none exist)
    gameId = $("#gameId").html();				//get the game ID	(can be empty if none exist)
    if (hostName != "" || username != "") {
        $("#createGame").css("display", "none");
        $("#username2").css("display", "none");
        $("#games").css("display", "none");
        $("#wait").css("display", "block");
    }					//if the user is currently a host or a guest show the proper interface
});

function uploadGameData() {
    //console.log("upload");
    //console.log(gameObject);
    $.ajax({
        url: "uploadGameState.php",
        method: "POST",
        data: {"gameObject": JSON.stringify(gameObject)}
    }).done(function (data) {
        //console.log(data);
    });
}

function createGame() {
    $.ajax({
        url: "startGame.php",
        method: "POST",
        data: {"gameName": $("input[name=gameName]").val(), "gameType": $("input[name=gameType]:radio:checked").val(), "hostName": $("input[name=username]").val()}
    }).done(function (data) {			//after putting the new game in the database...
        if (data == "gameName") {
            alert("spelnaam is al in gebruik");
        }
        else if (data == "hostName") {
            alert("gebruikersnaam is al in gebruik");
        }					//show proper error messages if necessary
        else {
            $("#createGame").css("display", "none");
            $("#username2").css("display", "none");
            $("#games").css("display", "none");
            $("#wait").css("display", "block");				//hide and show the proper interfaces
            hostName = $("input[name=username]").val();
            gameId = data;							//store the host name and the game id
        }

    });
}

function destroyGame() {			//destroy the game you're hosting or leave the game in which you are a guest
    if (hostName != "") {
        $.ajax({
            url: "destroyGame.php"
        }).done(function (data) {			//after deleting the game in the database...
            $("#createGame").css("display", "block");
            $("#username2").css("display", "block");
            $("#games").css("display", "block");
            $("#wait").css("display", "none");
        });				//show and hide the proper interfaces
        hostName = "";				//remove the stored host name
    }
    else {
        $.ajax({
            url: "leaveGame.php"
        }).done(function (data) {			//after leaving the game in the database...
            $("#createGame").css("display", "block");
            $("#username2").css("display", "block");
            $("#games").css("display", "block");
            $("#wait").css("display", "none");
        });					//show and hide the proper interfaces
        username = "";
        gameId = "";				//remove the stored username and gameId
    }
}

gameList = [];				//used to store all the games visually so as to be able to delete them if they get removed from the database
guests = [];

storage = setInterval(function () {
    $.ajax({
        url: "callDatabase.php"
    }).done(function (data) {			//after receiving all games from the database...
        data = jQuery.parseJSON(data);		//decode the data
        currentGameList = [];					//used to store all games currently in the database so as to be able to remove all games that are no longer in the database
        jQuery.each(data, function (index, item) {
            currentGameList.push(item["id"]);				//add this game to all games currently in the database
            guests = item["guests"].split(",");

            if (guests[0] != "") {
                playerCount = (guests.length) + 1;
            }
            else {
                playerCount = 1;
            }					//determine how many players are in the game (including the host)
            if (item['hostName'] == hostName) { //if you're the host... of some game.
                $("#playerCount").html(playerCount);				//show player count
                playerHTML = "";
                for (i = 0; i < playerCount - 1; i++) {
                    playerHTML += guests[i] + "<button onclick='kick(\"" + guests[i] + "\")'>kick</button></br>";
                }
                $("#players").html("spelers:</br>" + item['hostName'] + "</br>" + playerHTML);			//show all players and add a kick button to each one of them
            }
            else if (gameId == item['id']) {				//if the user is a guest
                if (jQuery.inArray(username, guests) != -1) {			//if the user has not been kicked from the game...
                    $("#playerCount").html(playerCount);			//show the player count
                    playerHTML = "";
                    for (i = 0; i < playerCount - 1; i++) {
                        playerHTML += guests[i] + "</br>"
                    }
                    $("#players").html("spelers:</br>" + item['hostName'] + "</br>" + playerHTML);				//show all players
                }
                else {				//if the user has been kicked
                    alert("je bent gekicked");
                    $.ajax({
                        url: "kick.php"
                    }).done(function (data) {

                    });//still need to add ajax to remove sessions
                    hostName = "";
                    username = "";
                    gameId = "";				//reset stored data
                    $("#createGame").css("display", "block");
                    $("#username2").css("display", "block");
                    $("#games").css("display", "block");
                    $("#wait").css("display", "none");				//show and hide all the proper interfaces
                }
            }
            if ($("#gameInstance" + item["id"]).length == 0) {			//if the game (option to select) is not yet visually present...
                $("#games").append($("<div id='gameInstance" + item['id'] + "'>")
                        .append("<span id='gameName" + item['id'] + "'>" + item['gameName']
                                + "</span></br><span id='hostName" + item['id'] + "'>" + item['hostName']
                                + "</span></br><span id='playerCount" + item['id'] + "'>" + playerCount
                                + "</span></br><button onclick='join(" + item['id'] + ")'>join</button></br></br>"));		//create the game in the lobby
                if ($.inArray(item["id"], gameList) == -1) {
                    gameList.push(item["id"]);
                }				//add the game to all games that were visually present at some point if it isn't there already
            }
            else {
                $("#gameName" + item["id"]).html(item['gameName']);
                $("#hostName" + item["id"]).html(item['hostName']);
                $("#playerCount" + item["id"]).html(playerCount);
            }					//update the game information     , why no item['id'] in the update?             
            if (item['hostName'] == hostName) {
                //if (playerCount >= 3) {
                $("#startGame").css("display", "block");
                //}
            }				//display start game button if enough players are present
        });
        $.each(gameList, function (key, value) {
            if ($.inArray(value, currentGameList) == -1) {
                $("#gameInstance" + value).remove();
                gameList.splice(key, 1);
            }
        });				//for each game that was created at some point remove it visually and remove it from memory (second part is untested)
    });
}, 50); // due to global variable guests and playerCount

function join(id) {
    username = $("input[name=username]").val();
    $.ajax({
        url: "joinGame.php",
        method: "POST",
        data: {"username": username, "gameId": id}
    }).done(function (data) {
        if (data == "fail") {
            alert("gebruikersnaam is al in gebruik");
        }
        else {
            gameId = data;
            $("#createGame").css("display", "none");
            $("#username2").css("display", "none");
            $("#games").css("display", "none");
            $("#wait").css("display", "block");
        }
    });
}

function kick(player) {
    //console.log(gameId);
    $.ajax({
        url: "kickPlayer.php",
        method: "POST",
        data: {"player": player, "gameId": gameId}
    }).done(function (data) {
        //console.log(data);
    });
}

function endTurn() {
    if (gameObject['currentPlayer'] == userPlayerNumber && gameObject['currentCombinationCards'].length==0) {
        if (gameEnd(gameObject.deck, gameObject.hands)) {//last param wing.
            if (canStartNewRound()) {
                newGameStart();
            } else {
                gameObject.gameEnd = true;
                realGameInProgress = false;
                alert("Gefeliciteerd, je hebt gewonnen!");
                // remove game from db and return the players to the lobby.
            }
        } else {
            if (gameObject['currentPlayer'] != gameObject['playerAmount']) {
                gameObject['currentPlayer']++;
            }
            else {
                gameObject['currentPlayer'] = 1;
            }
			temp=drawCard(gameObject['deck']);
			gameObject['deck']=temp[1];
			gameObject['hands'][gameObject['currentPlayer']].push(temp[0]);
			stealAllowed=true;
        }
        updateTurnOrder();
        uploadGameData();
    }
	console.log(gameObject['deck'].length);
}				//end your turn, which means the current player changes and the new current player draws a card and is allowed to steal again. Also if the game round is supposed to end it does

function displayActiveGame() {
    $("#wait").css("display", "none");
    $("#createGame").css("display", "none");
    $("#username2").css("display", "none");
    $("#games").css("display", "none"); // did I forget any of them?
    $("#mainGame").css("display", "block");
}

function startGame() {
    gameInProgress = true; // same variable as used in create game/room though?
    realGameInProgress = true;
    $("#startGame").css("display", "none");
    gameObject['gameInProgress'] = true;
    $.ajax({
        // send data
        url: "gameStart.php",
        method: "POST",
        data: {"gameObject": gameObject, "gameId": gameId} // parse necesary?
    }).done(function (data) {
        //console.log(data);
        gameObject["players"]["1"] = hostName;
        for (var i = 0; i < guests.length; i++) {
            gameObject["players"][String(i + 2)] = guests[i]; // will a new key value pair be created like this?
        }
        gameObject['playerAmount'] = (guests.length) + 1;
        cardsDeal = dealCards(randomDeck(createDeck1()), gameObject['playerAmount']);
        gameObject['deck'] = cardsDeal[1];
        for (var i = 0; i < gameObject['playerAmount']; i++) {
            gameObject['hands'][String(i + 1)] = cardsDeal[0][i];
        }
        gameObject.round = 1;
        gameObject.currentPlayer = 1; // This one needs to be taken out of gameObject but what's the deal with currentplayer?
        userPlayerNumber = 1;
        //console.log(gameObject)
        uploadGameData();
        displayActiveGame();
        //console.log(gameObject);
        updateUIAppendCards(gameObject['hands'][gameObject['currentPlayer']], false, "#Hand", 100, 100, "");
		updateTurnOrder();
    });
}

$(function () {
    updateUIAppendCards(gameObject['hands'][gameObject['currentPlayer']], false, "#Hand", 100, 100, "");
});

fromCards = false;
fromHand = false;
fromCombination = false;
stealAllowed = true;

function dropInCards(ev) {
	if(gameObject['currentPlayer']==userPlayerNumber){
		if (fromHand) {
			fromCards = false;
			fromHand = false;
			fromCombination = false;
			ev.preventDefault();
			var data = ev.dataTransfer.getData("text");
			gameObject['currentCombinationCards'].push(gameObject['hands'][gameObject['currentPlayer']][data]);
			gameObject['hands'][gameObject['currentPlayer']].splice(data, 1);
			updateUIAppendCards(gameObject['hands'][gameObject['currentPlayer']], false, "#Hand", 100, 100, "");
			updateUIAppendCards(gameObject['currentCombinationCards'], false, "#Cards", 100, 100, "Current cards played for combination");
		}
		else if (fromCombination && stealAllowed) {
			ev.preventDefault();
			stealAllowed = false;
			fromCards = false;
			fromHand = false;
			fromCombination = false;
			stealMemory = {};
			$.extend(true, stealMemory, gameObject);
			//console.log(gameObject);
			//console.log(stealMemory);
			var data = ev.dataTransfer.getData("text");
			gameObject['currentCombinationCards'].push(gameObject['combinations'][gameObject['currentlyShowingCombinationsOf'][userPlayerNumber]][gameObject['currentlyShowingCombinationKey'][userPlayerNumber]][data]);
			$.each(gameObject['combinations'][gameObject['currentlyShowingCombinationsOf'][userPlayerNumber]][gameObject['currentlyShowingCombinationKey'][userPlayerNumber]], function (index, value) {
				if (index != data) {
					gameObject['hands'][gameObject['currentPlayer']].push(value);
				}
			});
			gameObject['combinations'][gameObject['currentlyShowingCombinationsOf'][userPlayerNumber]].splice(gameObject['currentlyShowingCombinationKey'][userPlayerNumber], 1);
			scoreEachTurn();
			updateTurnOrder();
			updateUIAppendCards(gameObject['hands'][gameObject['currentPlayer']], false, "#Hand", 100, 100, "");
			updateUIAppendCards(gameObject['currentCombinationCards'], false, "#Cards", 100, 100, "Current cards played for combination");
			updateUIAppendCards(gameObject['combinations'][gameObject["currentPlayer"]], true, "#Combination", 100, 100, "Your combinations:");
			updateUIAppendCards(gameObject['combinations'][gameObject['currentlyShowingCombinationsOf'][userPlayerNumber]], true, "#OtherCombinations", 100, 100, "Player " + gameObject['currentlyShowingCombinationsOf'][userPlayerNumber] + "'s combinations:");
		}
		uploadGameData();
	}
	else{
		fromCards = false;
		fromHand = false;
		fromCombination = false;
	}
}

function dropInHand(ev) {
    if (fromCards && gameObject['currentPlayer']==userPlayerNumber) {
        fromCards = false;
        fromHand = false;
        fromCombination = false;
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        gameObject['hands'][gameObject['currentPlayer']].push(gameObject['currentCombinationCards'][data]);
        gameObject['currentCombinationCards'].splice(data, 1);
        updateUIAppendCards(gameObject['hands'][gameObject['currentPlayer']], false, "#Hand", 100, 100, "");
        updateUIAppendCards(gameObject['currentCombinationCards'], false, "#Cards", 100, 100, "Current cards played for combination");
		uploadGameData();
    }
	else{
		fromCards = false;
		fromHand = false;
        fromCombination = false;
	}
}					//drop a card in your hand, meaning it gets moved from the currentCombinationCards into your hand if the card you started dragging came from currentCombinationCards

function dragStartHand(ev, cardNumber) {
    ev.dataTransfer.setData("text", cardNumber);
    fromHand = true;
    fromCards = false;
    fromCombination = false;
}

function dragStartCards(ev, cardNumber) {
    ev.dataTransfer.setData("text", cardNumber);
    fromCards = true;
    fromHand = false;
    fromCombination = false;
}

function dragStartCombination(ev, cardNumber) {
    ev.dataTransfer.setData("text", cardNumber);
    fromCards = false;
    fromHand = false;
    fromCombination = true;
}

function allowDrop(ev) {
    ev.preventDefault();
}

showingOwnCombination = false;
showingCombination = false;

function toggleShowOwnCombination(i) {
    //console.log(showingOwnCombination);
    //console.log(i);
    //console.log(showingOwnCombination != i);
    if (showingOwnCombination === false || showingOwnCombination !== i && showingOwnCombination !== false) {
        //console.log("?");
        showingOwnCombination = i;
        updateUIAppendCards(gameObject['combinations'][userPlayerNumber][i], false, "#Cards2", 100, 100, "Combination:");
        //console.log(showingOwnCombination);
        //console.log(i);
        //console.log(showingOwnCombination!=i);
    }
    else if (showingOwnCombination === false || showingOwnCombination !== i && showingOwnCombination !== false) {
        //console.log("?");
        showingOwnCombination = i;
        updateUIAppendCards(gameObject['combinations'][userPlayerNumber][i], false, "#Cards2", 100, 100, "Combination:");

    }
    else {
        showingOwnCombination = false;
        updateUIAppendCards(gameObject['currentCombinationCards'], false, "#Cards", 100, 100, "Current cards played for combination");
    }	
}					//toggle the showing of one of your own combinations

function showCombinations(player) {
    updateUIAppendCards(gameObject['combinations'][player], true, "#OtherCombinations", 100, 100, "Player " + player + "'s combinations:");
    gameObject['currentlyShowingCombinationsOf'][userPlayerNumber] = player;
}				//show the combinations of a specific player



function toggleShowCombination(combination) {
    //console.log(userPlayerNumber);
    if (showingCombination) {
        if (gameObject['currentlyShowingCombinationKey'][userPlayerNumber] == combination) {
            showingCombination = false;
            updateUIAppendCards(gameObject['combinations'][userPlayerNumber], true, "#Combination", 100, 100, "Your combinations:");
            gameObject['currentlyShowingCombinationKey'][userPlayerNumber] = -1;
        }
        else {
            gameObject['currentlyShowingCombinationKey'][userPlayerNumber] = combination;
            updateUIAppendCards(gameObject['combinations'][gameObject['currentlyShowingCombinationsOf'][userPlayerNumber]][combination], false, "#Combination2", 100, 100, "Combination:");
        }
    }
    else {
        showingCombination = true;
        gameObject['currentlyShowingCombinationKey'][userPlayerNumber] = combination;
        updateUIAppendCards(gameObject['combinations'][gameObject['currentlyShowingCombinationsOf'][userPlayerNumber]][combination], false, "#Combination2", 100, 100, "Combination:");
    }
}					//toggle showing a combination of another player

function undoSteal() {
    //console.log(stealMemory);
    if (stealMemory != "") {
        stealAllowed = true;
        gameObject = stealMemory;
        stealMemory = "";
        updateUIAppendCards(gameObject['hands'][gameObject['currentPlayer']], false, "#Hand", 100, 100, "");
        updateUIAppendCards(gameObject['currentCombinationCards'], false, "#Cards", 100, 100, "Current cards played for combination");
        updateUIAppendCards(gameObject['combinations'][gameObject["currentPlayer"]], true, "#Combination", 100, 100, "Your combinations:");
        updateUIAppendCards(gameObject['combinations'][gameObject['currentlyShowingCombinationsOf'][userPlayerNumber]], true, "#OtherCombinations", 100, 100, "Player " + gameObject['currentlyShowingCombinationsOf'][userPlayerNumber] + "'s combinations:");
    }
}				//undo a steal you made, meaning that the entire gameObject is reverted back to the state it was in just before the steal

