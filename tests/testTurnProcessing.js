/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

describe('isTurn', function () {
   
    it('checks if it is the players turn', function () {
        var username = "guest1";
        var hostName = "host";
        gameObject={
            currentPlayer:2,
            players:{1:"host",2:"guest1",3:"guest2"}// moet dit geen array zijn, want er kunnen meer dan 3 mensen meedoen OF meerdere velden tot het maximum aantal spelers. 
        };   
        expect(isTurn()).toBeTruthy();
    });
});

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

describe ('checkForProtonNeutronGameEnd', function(){
    it ('ends the game when the combination forms a proton', function (){
        var card1 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "blue", mass: 5, charge: 0.667, order: 0};
        var card2 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "red", mass: 5, charge: 0.667, order: 0};
        var card3 = {name: "d", particle: "quark", generation: 1, anti: false, colour: "green", mass: 10, charge: -0.333, order: 0};
        var combinations = Array(Array(card1, card2, card3)); 
        var s = checkForProtonNeutronGameEnd(combinations);
        console.log(s);
        expect(s).toBeTruthy();     
    });
    
    it ('ends the game when the combination forms a neutron', function (){
        var card1 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "blue", mass: 5, charge: 0.667, order: 0};
        var card2 = {name: "d", particle: "quark", generation: 1, anti: false, colour: "red", mass: 10, charge: -0.333, order: 0};
        var card3 = {name: "d", particle: "quark", generation: 1, anti: false, colour: "green", mass: 10, charge: -0.333, order: 0};
        var combinations = Array(Array(card1, card2, card3)); 
        var s = checkForProtonNeutronGameEnd(combinations);
        console.log(s);
        expect(s).toBeTruthy();     
    });
    
    it ('doesnt end the game when neither a proton or a neutron is formed', function (){
        var card1 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "blue", mass: 5, charge: 0.667, order: 0};
        var card2 = {name: "s", particle: "quark", generation: 2, anti: false, colour: "red", mass: 200, charge: -0.333, order: 0};
        var card3 = {name: "d", particle: "quark", generation: 1, anti: false, colour: "green", mass: 10, charge: -0.333, order: 0};
        var combinations = Array(Array(card1, card2, card3)); 
        var s = checkForProtonNeutronGameEnd(combinations);
        console.log(s);
        expect(s).toBeFalsy();     
    });
    
    });


