/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

describe('playCombination', function () {
    
    it('returns cards in currentHand when there are not enough cards', function () {
        var combination = Array("1");
        var newArr = Array(Array("1"), []);
        var currentHand = [];
        var currentCombinations = [];
        var r = playCombination(combination, currentHand, currentCombinations);
        console.log(r, newArr);
        expect(r.length).toBe(2);
        expect(r[0]).toEqual(newArr[0]);
        expect(r[1]).toEqual(newArr[1]);
    });
    
    it('returns cards in currentHand when there are too much cards', function () {
        var combination = Array("1","2","3","4");  
        var newArr = [["1","2","3","4"], []];
        var currentHand = [];
        var currentCombinations = [];
        var r = playCombination(combination, currentHand, currentCombinations);
        expect(r.length).toBe(2);
        expect(r[0]).toEqual(newArr[0]);
        expect(r[1]).toEqual(newArr[1]);
    });
    
    it('returns cards when the colours dont match', function () {
        var combination = Array("1","2","3","4");  
        var currentHand = [];
        var currentCombinations = [];
        var r = playCombination(combination, currentHand, currentCombinations);
    });
    
    it('plays combination in case of allowed', function () {
        //expect().toEqual(3);
    });
    
});
