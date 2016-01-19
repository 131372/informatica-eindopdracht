function allowCombination(cards){
	if(cards.length!=2 && cards.length!=3){
		return "incorrect_amount_of_cards";
	}				//no combinations can be played which are not either 2 or 3 cards
	colours={r:0,g:0,b:0};
	//annihilate2=false;
	$.each(cards, function(index, card){
		/*annihilate=false;
		$.each(cards, function(index2, card2){
			if(index!=index2){
				if(card['name']==card2['name'] && card['anti']!=card2['anti']){
					annihilate=true;
				}
			}
		});
		if(annihilate){
			annihilate2=true;
		}*/
		if(card['anti']){
			colours[card['colour']]--;
		}
		else{
			colours[card['colour']]++;
		}				//add up colours properly
	});
	/*if(annihilate2){
		return "particles_would_annihilate";
	}*/
	//after I created the checking for annihilation part, I realised it is actually allowed to play such combinations, weird as it may be
	if(colours['r']==colours['g'] && colours['g']==colours['b']){
		return "allowed";
	}
	else{
		return "colours_dont_cancel";
	}
}

function playCombination(combination,currentPlayerHand,currentPlayerCombinations){
	switch(allowCombination(combination)){
		case "allowed":
			gameObject['combinations'][currentPlayer].push(combination);
			updateHand();
			updateCombination();
			//currentPlayerCombinations.push(combination);
			//return array(currentPlayerHand,currentPlayerCombinations);
			break;
		case "incorrect_amount_of_cards":
			//code to update UI
			//$.each(combination, function(index, card){
			//	currentPlayerHand.push(card);
			//});
			//return array(currentPlayerHand,currentPlayerCombinations);
			break;
		case "colours_dont_cancel":
			//code to update UI
			//$.each(combination, function(index, card){
			//	currentPlayerHand.push(card);
			//});
			//return array(currentPlayerHand,currentPlayerCombinations);
			break;
	}
}					//function is to be used when pressing the play combination button. the current player's hand should be set to the first value of the returned array, while the current player's combination should be set to the second value