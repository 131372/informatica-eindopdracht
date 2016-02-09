function scoreEndGame(deck, hands, currentPlayerCombinations){
    if (checkForGameEnd(deck, hands)){
        gameObject["points"][gameObject.currentplayer] += 3;  
    }
   
    if (checkForProtonNeutronGameEnd(currentPlayerCombinations)){
        gameObject["points"][gameObject.currentplayer] += 3; 
    }
}
