/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

describe('playCombination', function () {
    
    it('returns cards in currentHand when there are not enough cards', function () {
        $combination=array("1");
        $newArray = array(array("1","2","3","4"), array());
        expect(playCombination($combination, $currentHand, $currentCombinations)).toMatch($newArray);
    });
    
    it('returns cards in currentHand when there are too much cards', function () {
        $combination=array("1","2","3","4");  
        $newArray = array(array("1","2","3","4"), array());
        expect(playCombination($combination, $currentHand, $currentCombinations)).toMatch($newArray);
    });
    
    it('returns cards when the colours dont match', function () {
        //expect().toEqual(3);
    });
    
    it('plays combination in case of allowed', function () {
        //expect().toEqual(3);
    });
    
});
