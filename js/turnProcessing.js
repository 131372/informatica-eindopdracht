function checkForGameEnd(deck,hands){
	var emptyHand = false;
        if(deck.length==0){
		return true;
	}
	$.each(hands, function(index, value){
		if(value.length==0){
			emptyHand = true;
		}
	});
	if(emptyHand){
		return true;
	}
	return false;
}