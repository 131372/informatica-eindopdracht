function updateUIAppendCards(cards, element, message, htmlclass, idPrefix){ // latter three are optional
    htmlclass = (typeof htmlclass === 'undefined') ? "" : htmlclass; 
    message = (typeof message === 'undefined') ? "" : message; // not sure if I should control message here for certain cases.
    idPrefix = (typeof idPrefix === 'undefined') ? "" : idPrefix;
    var path = "images/";
    $(element).empty();
    $(element).append("<p>" + message + "</p></br>");
    for(var i = 0; i < cards.length; i++){
        var cardGraphic = cardGraphic(cards[i]);
        $(element).append("<img id='" + idPrefix + cardGraphic['graphic'] +"' " + "class='" + htmlclass +  "' " + "src='" + path + cardGraphic[0] + "' " + ">");
    } 
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
