function updateHand(){
	
}

function updateCombination(){

}

function updateTurnOrder(){
	$html="Beurten<br>";
	first=true;
	for(i=gameObject['currentPlayer'];i<=gameObject['playerAmount'];i++){
		//if(first){
		//	$html+="Aan het spelen:";
		//	first=false;
		//}
		$html+=gameObject['players'][i]+", "+gameObject['points'][i]+"pt, "+Object.keys(gameObject['hands'][i]).length+"kaarten<br>";
	}
	for(i=1;i<gameObject['currentPlayer'];i++){
		$html+=gameObject['players'][i]+", "+gameObject['points'][i]+"pt, "+Object.keys(gameObject['hands'][i]).length+"kaarten<br>";
	}
	$("#TurnOrder").html($html);
}