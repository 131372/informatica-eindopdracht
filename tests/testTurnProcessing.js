/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

describe('checkForGameEnd', function () {
    it('ends the game when deck is empty', function () {
        $fullHands = array(array("1","2"));
        $emptyDeck = array();
        expect(checkForGameEnd($emptyDeck,$fullHands)).toBeTruthy();
    });
    
    it('ends the game when a hand is empty', function () {
        $emptyHands = array(array(), array("1", "2"));
        $fullDeck = array("1","2");
        expect(checkForGameEnd($fullDeck,$emptyHands)).toBeTruthy();
    });
    
    it('doesnt end the game when deck and hands are not empty', function () {
        $fullHands = array(array("1","2"));
        $fullDeck = array("1","2");
        expect(checkForGameEnd($fullDeck,$fullHands)).toBeFalsy();
    });
});


