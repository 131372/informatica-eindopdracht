function playCombination(cards){
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
		return "alllowed";
	}
	else{
		return "colours_dont_cancel";
	}
}