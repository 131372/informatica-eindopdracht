function drawCard(deck){
	deck.sort(sortByOrder);			//make sure the deck is sorted
	card=deck.pop();				//get the last card from the deck
	deck.sort(sortByOrder);			//resort the deck
	return [card,deck];				//return the card and the new deck
}

function dealCards(deck,playerCount){			//give each player the starting amount of cards
	cardCount=Math.round(36/playerCount);		//calculate how many cards each player should have
	playerHands=[];
	for(i=0;i<playerCount;i++){
		playerHand=[];
		for(i2=0;i2<cardCount;i2++){
			draw=drawCard(deck);				//draw a card from the deck
			deck=draw[1];						//update the deck after the draw
			playerHand.push(draw[0]);			//add the drawn card to the players hand
		}
		playerHands.push(playerHand);			//add the hand to the collection of hands
	}
	return [playerHands,deck];					//return each players hand and the new deck
}

function sortByOrder(a, b){				//use this function in the following way: "deck.sort(sortByOrder)" to sort the deck of cards 
	return ((a['order'] < b['order']) ? -1 : ((a['order'] > b['order']) ? 1 : 0));
}

/**
 * 
 * @param {string} name u, d, c, s, t, b
 * @param {bool} anti
 * @param {string} colour b, r, g
 * @returns {CreateQuark.card}
 */
function createQuark(name, anti, colour){
    switch(name){
        case 'u': 
            var card = {name: "u", particle: "quark", generation: 1, anti: anti, colour: colour, mass: 5, charge: 0.667, order: 0};
            break;
        case 'd': 
            var card = {name: "d", particle: "quark", generation: 1, anti: anti, colour: colour, mass: 10, charge: -0.333, order: 0};
            break;
        case 'c':
            var card = {name: "c", particle: "quark", generation: 2, anti: anti, colour: colour, mass: 1, charge: 0.667, order: 0};
            break;
        case 's':
            var card = {name: "s", particle: "quark", generation: 2, anti: anti, colour: colour, mass: 200, charge: -0.333, order: 0};
            break; 
        case 't':
            var card = {name: "t", particle: "quark", generation: 3, anti: anti, colour: colour, mass: 175, charge: 0.667, order: 0};
            break;
        case 'b':
            var card = {name: "b", particle: "quark", generation: 3, anti: anti, colour: colour, mass: 4, charge: -0.333, order: 0};
            break;
        default: 
    }
	if(anti){
		card['charge']=-card['charge'];
	}
    return card;
}

function CreateLepton(name, anti, neutrino){
    if(neutrino){
        // create neutrino
    } else{
        // create other 
    }
}

function createDeck1(){
	deck=[];
	deck.push(createQuark("u",false,"r"));
	deck.push(createQuark("u",false,"r"));
	deck.push(createQuark("u",false,"g"));
	deck.push(createQuark("u",false,"g"));
	deck.push(createQuark("u",false,"b"));
	deck.push(createQuark("d",false,"r"));
	deck.push(createQuark("d",false,"r"));
	deck.push(createQuark("d",false,"g"));
	deck.push(createQuark("d",false,"g"));
	deck.push(createQuark("d",false,"b"));
	deck.push(createQuark("s",false,"r"));
	deck.push(createQuark("s",false,"r"));
	deck.push(createQuark("s",false,"g"));
	deck.push(createQuark("s",false,"g"));
	deck.push(createQuark("s",false,"b"));
	deck.push(createQuark("c",false,"r"));
	deck.push(createQuark("c",false,"r"));
	deck.push(createQuark("c",false,"g"));
	deck.push(createQuark("c",false,"g"));
	deck.push(createQuark("c",false,"b"));
	deck.push(createQuark("b",false,"r"));
	deck.push(createQuark("b",false,"r"));
	deck.push(createQuark("b",false,"g"));
	deck.push(createQuark("b",false,"g"));
	deck.push(createQuark("b",false,"b"));
	deck.push(createQuark("t",false,"r"));
	deck.push(createQuark("t",false,"r"));
	deck.push(createQuark("t",false,"g"));
	deck.push(createQuark("t",false,"g"));
	deck.push(createQuark("t",false,"b"));
	deck.push(createQuark("u",true,"r"));
	deck.push(createQuark("u",true,"g"));
	deck.push(createQuark("u",true,"b"));
	deck.push(createQuark("u",true,"b"));
	deck.push(createQuark("d",true,"r"));
	deck.push(createQuark("d",true,"g"));
	deck.push(createQuark("d",true,"b"));
	deck.push(createQuark("d",true,"b"));
	deck.push(createQuark("s",true,"r"));
	deck.push(createQuark("s",true,"g"));
	deck.push(createQuark("s",true,"b"));
	deck.push(createQuark("s",true,"b"));
	deck.push(createQuark("c",true,"r"));
	deck.push(createQuark("c",true,"g"));
	deck.push(createQuark("c",true,"b"));
	deck.push(createQuark("c",true,"b"));
	deck.push(createQuark("t",true,"r"));
	deck.push(createQuark("t",true,"g"));
	deck.push(createQuark("t",true,"b"));
	deck.push(createQuark("t",true,"b"));
	deck.push(createQuark("b",true,"r"));
	deck.push(createQuark("b",true,"g"));
	deck.push(createQuark("b",true,"b"));
	deck.push(createQuark("b",true,"b"));
	return deck;
}

function randomDeck(deck) {
    var result = [];
    var order = 0;
    var orderNr ;
    var orderNrs = [];
    var something = false; //help met het bedenken van een goede naam
    var anotherthing = false; //help met het bedenken van een goede naam

    $.each(deck, function (index, obj) {
        while (something === false) {
            orderNr = Math.floor(Math.random() * 10000) + 1;  // genereert random nummer, ook van internet (test even haha)
            $.each(orderNrs, function (index, value) { 
                if (orderNr === value) { //als het random nummer al een keer gebruikt is
                    anotherthing = true; // dan wordt anotherthing true
                }              
            });
            
            if (anotherthing === false){ //als het random nummer niet al een keer gebruikt is
                orderNrs.push(orderNr); //dan wordt dit nummer in orderNrs (de array met de gebruikte random nummers) gepusht 
                something = true; //en wordt something true
            }
        } // als something true is, stopt deze whileloop

        obj["order"] = orderNr; //property order van de kaart met [index] wordt het random gegenereerde nummer
        something = false; //zodat de whileloop weer gaat lopen, voor de volgende kaart

    });

    result = deck.sort(function (a, b) {              // dit heb ik van internet, kan iemand dit even testen
        return (a.order < b.order ? -1 : 1);
    });
    
    return result; // dit is de random deck
}



