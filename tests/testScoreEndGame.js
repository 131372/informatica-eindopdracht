describe("score for ending game", function () {
    beforeEach(function () {
        //deck = ...
        //hands  ..
        //currenPlayerCombinations
        var gameObject = {
            points: [],
            currentplayer: "ikke"
        };

        //oldValue = gameObject["points"][gameObject.currentplayer] ;
        oldValue = gameObject["points"][gameObject.currentplayer];

    });
    it("should return false", function () {
        function checkForGameEnd(v1, v2) {
            return true;
        }
        function checkForProtonNeutronGameEnd(x) {
            return false;
        }
        expect(checkForProtonNeutronGameEnd(1)).toBeFalsy();
        //scoreEndGame(deck, hands, currentPlayerCombinations);
        //expect(gameObject["points"][gameObject.currentplayer]).toEqual(oldValue + 3);
    });

});

/*
 if (checkForGameEnd(deck, hands)){
 gameObject["points"][gameObject.currentplayer] += 3;  
 }
 
 if (checkForProtonNeutronGameEnd(currentPlayerCombinations)){
 gameObject["points"][gameObject.currentplayer] += 3; 
 }
 }
 */
