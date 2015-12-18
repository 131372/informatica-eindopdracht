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