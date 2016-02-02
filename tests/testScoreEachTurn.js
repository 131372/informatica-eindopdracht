
describe('scoreEachTurn', function () {
    it('calculates the points during the game', function () {
        
        gameObject = {
            combinations: {1: [], 2: [], 3: []},
            points: {1: 10, 2: 15, 3: 13}   
        };
        
        s = scoreEachTurn();
        expect(s).toEqual(3);
    });
});


