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

function cardGraphic (card){
    var graphicName = card['particle'] + card['name'] + card['anti'] + card['colour'];
    return {graphic: graphicName + ".svg", id: graphicName};
}

function updateUnfinishedCombination(cardsInUnfinished){
    var path = "images/";
    $("#Cards").empty();
    $("#Cards").append("<p>Current cards played for combination</p></br>");
    for(var i = 0; i < cardsInUnfinished.length; i++){
        var cardGraphic = cardGraphic(cardsInUnfinished[i]);
        $("#Cards").append("<img id='" + cardGraphic['graphic'] +"' " + "class='TBD' " + "src='" + path + cardGraphic[0] + "' " + ">");
    } 
}