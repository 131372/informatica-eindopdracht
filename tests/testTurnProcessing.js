/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

describe('checkForGameEnd', function () {
    it('ends the game when deck is empty', function () {
        var fullHands = Array(Array("1","2"));
        var emptyDeck = Array();
        expect(checkForGameEnd(emptyDeck,fullHands)).toBeTruthy();
    });
    
    it('ends the game when a hand is empty', function () {
        var emptyHands = Array(Array(), Array("1", "2"));
        var fullDeck = Array("1","2");
        expect(checkForGameEnd(fullDeck,emptyHands)).toBeTruthy();
    });
    
    it('doesnt end the game when deck and hands are not empty', function () {
        var fullHands = Array(Array("1","2"),Array("3","4"));
        var fullDeck = Array("1","2");
        var r = checkForGameEnd(fullDeck,fullHands);
        console.log(r);
        expect(r).toBeFalsy();
    });
});


