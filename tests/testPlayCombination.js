/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

describe('playCombination', function () {
    
    it('returns cards in currentHand when there are not enough cards', function () {
        var combination = Array("1");
        var currentHand = [];
        var currentCombinations = [];
        var s = playCombination(combination, currentHand, currentCombinations);
        
        var newArray = Array(Array("1"),[]);
        console.log(s, newArray);
        expect(s.length).toBe(2);
        expect(s[0]).toEqual(newArray[0]);
        expect(s[1]).toEqual(newArray[1]);
    });
    
    it('returns cards in currentHand when there are too much cards', function () {
        var combination = Array("1","2","3","4");  
        var currentHand = [];
        var currentCombinations = [];
        var s = playCombination(combination, currentHand, currentCombinations);
        
        var newArray = Array(Array("1","2","3","4"),[]);
        expect(s.length).toBe(2);
        expect(s[0]).toEqual(newArray[0]);
        expect(s[1]).toEqual(newArray[1]);
    });
    
    it('returns cards when the colours dont match in case of a baryon', function () {
        var card1 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "blue", mass: 5, charge: 0.667, order: 0};
        var card2 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "blue", mass: 5, charge: 0.667, order: 0};
        var card3 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "blue", mass: 5, charge: 0.667, order: 0};
        var combination = Array(card1, card2, card3);  
        var currentHand = [];
        var currentCombinations = [];
        var s = playCombination(combination, currentHand, currentCombinations);
        
        var newArray = Array(Array(card1, card2, card3),[]);
        console.log(s, newArray);
        expect(s[0]).toEqual(newArray[0]);
        expect(s[1]).toEqual(newArray[1]);
    });
    
    it('returns cards when the colours dont match in case of a meson', function () {
        var card1 = {name: "u", particle: "quark", generation: 1, anti: true, colour: "red", mass: 5, charge: -0.667, order: 0};
        var card2 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "blue", mass: 5, charge: 0.667, order: 0};
        var combination = Array(card1, card2);  
        var currentHand = [];
        var currentCombinations = [];
        var s = playCombination(combination, currentHand, currentCombinations);
        
        var newArray = Array(Array(card1, card2),[]);
        console.log(s, newArray);
        expect(s[0]).toEqual(newArray[0]);
        expect(s[1]).toEqual(newArray[1]);
    });
    
    it('plays combination in case of allowed in case of a baryon', function () {
        var card1 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "blue", mass: 5, charge: 0.667, order: 0};
        var card2 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "red", mass: 5, charge: 0.667, order: 0};
        var card3 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "green", mass: 5, charge: 0.667, order: 0};
        var combination = Array(card1, card2, card3);  
        var currentHand = [];
        var currentCombinations = [];
        var s = playCombination(combination, currentHand, currentCombinations);
        
        var newArray = Array([],Array(Array(card1, card2, card3)));
        console.log(s, newArray);
        expect(s[0]).toEqual(newArray[0]);
        expect(s[1]).toEqual(newArray[1]);
        
    });
    
     it('plays combination in case of allowed in case of a meson', function () {
        var card1 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "blue", mass: 5, charge: 0.667, order: 0};
        var card2 = {name: "u", particle: "quark", generation: 1, anti: true, colour: "blue", mass: 5, charge: -0.667, order: 0};
        var combination = Array(card1, card2);  
        var currentHand = [];
        var currentCombinations = [];
        var s = playCombination(combination, currentHand, currentCombinations);
        
        var newArray = Array([],Array(Array(card1, card2)));
        console.log(s, newArray);
        expect(s[0]).toEqual(newArray[0]);
        expect(s[1]).toEqual(newArray[1]);
        
    });
    
});
