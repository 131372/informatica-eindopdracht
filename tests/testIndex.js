
describe('isTurn', function () {
    it('checks if it is the players turn', function () {
        var username = "guest1";
        var hostName = "host";
        gameObject={
            currentPlayer:2,
            playerAmount:3,
            combinations:{},
            players:{1:"host",2:"guest1",3:"guest2"}, // moet dit geen array zijn, want er kunnen meer dan 3 mensen meedoen OF meerdere velden tot het maximum aantal spelers.
            hands:{1:{1:1,2:2},2:{1:1,2:2},3:{1:1,2:2}},
            points:{1:10,2:15,3:13}
        };   
        expect(isTurn()).toBeTruthy();
    });
});