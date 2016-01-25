function scoreEndGame(deck, hands, currentPlayerCombinations){
        var username = "Salma";
        //var username = $_SESSION['username'];
    
    if (checkForGameEnd(deck, hands)){
        var score = score + 3;
        return score;
        
    }
   
    if (checkForProtonNeutronGameEnd(currentPlayerCombinations)){
        var score = score + 3;
        return score;
    }
}