function checkForCombinationGameEnd(currentPlayerCombinations){
	
	uCount=0;
	dCount=0;
	$.each(currentPlayerCombinations, function(index, value){
		if(value['name']=="u" && !value['anti']){
			uCount++;
		}
		if(value['name']=="d" && !value['anti']){
			dCount++;
		}
	});
	
	if (uCount==2 && dCount==1){ 
		return true;
	}
	
	if (uCount==1 && dCount==2){
		return true;
	}
	
	return false;
}


