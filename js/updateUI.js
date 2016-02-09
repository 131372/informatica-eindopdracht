function updateUIAppendCards(cards, combination, element, height, width, message, htmlclass, idPrefix){ // latter three are optional, if combination read cards as combinations
	htmlclass = (typeof htmlclass === 'undefined') ? "" : htmlclass; 
    message = (typeof message === 'undefined') ? "" : message; // not sure if I should control message here for certain cases.
    idPrefix = ""//(typeof idPrefix === 'undefined') ? $(element).not('#') : idPrefix; // should write a test for this
    height = height + ""; // should write a test for this.
    width = width + "";
    var path = "images/";
	if(element=="#Cards2"){
		element="#Cards";
		$(element).empty();
		$(element).append("<p>" + message + "</p></br>");
		element="#Cards2";
	}
	if(element=="#Combination2"){
		element="#Combination";
		$(element).empty();
		$(element).append("<p>" + message + "</p></br>");
		element="#Combination2";
	}
	else{
		$(element).empty();
		$(element).append("<p>" + message + "</p></br>");
	}
    for(var i = 0; i < cards.length; i++){
        if(combination){
            var cardGraphic = cardGraphic2(cards[i][0]); 
            cardGraphic["id"] = ""; // recognize the combination by id.
            for(var j = 0; j < cards[i].length; j++){
                if(j === 0){
                    cardGraphic["id"] += cards[i][0]['particle'] + cards[i][0]['name'] + cards[i][0]['anti'] + cards[i][0]['colour']; // cards represented in the same way as the pictures.
                } else {
                    cardGraphic["id"] += "," + cards[i][0]['particle'] + cards[i][0]['name'] + cards[i][0]['anti'] + cards[i][0]['colour']; // comma seperate the entities.
                }
            }
        } else {
            var cardGraphic = cardGraphic2(cards[i]);
        }
		if(element=="#Hand"){
			handCardAppend(idPrefix,cardGraphic,htmlclass,path,height,width,i);
		}
		else if(element=="#Cards"){
			cardsCardAppend(idPrefix,cardGraphic,htmlclass,path,height,width,i);
		}
		else if(element=="#Cards2"){
			element="#Cards";
			$(element).append("<img id='" + idPrefix + cardGraphic['graphic'] +"' " + 
                "class='" + htmlclass +  "' " + 
                "src='" + path + cardGraphic['graphic'] + "' " + 
                "height='" + height + "' " + 
                "width='" + width + "' " + 
                ">"
			);
			element="#Cards2";
		}
		else if(element=="#Combination"){
			combinationCardAppend(idPrefix,cardGraphic,htmlclass,path,height,width,i);
		}
		else if(element=="#Combination2"){
			element="#Combination";
			$(element).append("<img id='" + idPrefix + cardGraphic['graphic'] +"' " + 
                "class='" + htmlclass +  "' " + 
                "src='" + path + cardGraphic['graphic'] + "' " + 
                "height='" + height + "' " + 
                "width='" + width + "' " + 
				"draggable='true'"+
				"ondragstart='dragStartCombination(event,"+i+")'" +
                ">"
			);
			element="#Combination2";
		}
		else if(element=="#OtherCombinations"){
			otherCombinationsCardAppend(idPrefix,cardGraphic,htmlclass,path,height,width,i);
		}
		else{
			$(element).append("<img id='" + idPrefix + cardGraphic['graphic'] +"' " + 
                "class='" + htmlclass +  "' " + 
                "src='" + path + cardGraphic['graphic'] + "' " + 
                "height='" + height + "' " + 
                "width='" + width + "' " + 
                ">"
			);
		}							//not finished yet, need an if statement for each specific element I believe
    } 
}

function handCardAppend(idPrefix,cardGraphic,htmlclass,path,height,width,i){
	$("#Hand").append("<img id='" + idPrefix + cardGraphic['graphic'] +"' " + 
		"class='" + htmlclass +  "' " + 
		"src='" + path + cardGraphic['graphic'] + "' " + 
		"height='" + height + "' " + 
		"width='" + width + "' " + 
		"draggable='true' ondragstart='dragStartHand(event,"+i+")'" +
		">"
	);
};

function cardsCardAppend(idPrefix,cardGraphic,htmlclass,path,height,width,i){
	$("#Cards").append("<img id='" + idPrefix + cardGraphic['graphic'] +"' " + 
		"class='" + htmlclass +  "' " + 
		"src='" + path + cardGraphic['graphic'] + "' " + 
		"height='" + height + "' " + 
		"width='" + width + "' " + 
		"draggable='true' ondragstart='dragStartCards(event,"+i+")'" +
		">"
	);
};

function combinationCardAppend(idPrefix,cardGraphic,htmlclass,path,height,width,i){
	$("#Combination").append("<img id='" + idPrefix + cardGraphic['graphic'] +"' " + 
		"class='" + htmlclass +  "' " + 
		"src='" + path + cardGraphic['graphic'] + "' " + 
		"height='" + height + "' " + 
		"width='" + width + "' " + 
		"onclick='toggleShowOwnCombination("+i+")'" +
		">"
	);
}

function otherCombinationsCardAppend(idPrefix,cardGraphic,htmlclass,path,height,width,i){
	$("#OtherCombinations").append("<img id='" + idPrefix + cardGraphic['graphic'] +"' " + 
		"class='" + htmlclass +  "' " + 
		"src='" + path + cardGraphic['graphic'] + "' " + 
		"height='" + height + "' " + 
		"width='" + width + "' " + 
		"onclick='toggleShowCombination("+i+")'" +
		">"
	);
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

function cardGraphic2(card){
    var graphicName = card['name'] + String(card['anti']) + card['colour'];
    return {graphic: graphicName + ".svg", id: graphicName};
}

function updateDeck(cards, height, width, deck){
    var deckCount = deck.length;
    var message = "Deck</br> \n\
                   Cards remaining: " + deckCount;
    updateUIAppendCards(cards, false, "#Deck", height, width, message);
}
