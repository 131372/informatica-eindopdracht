
describe('scoreEachTurn', function () {
    it('calculates the points during the game', function () {
        var card1 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "blue", mass: 5, charge: 0.667, order: 0};
        var card2 = {name: "u", particle: "quark", generation: 1, anti: false, colour: "red", mass: 5, charge: 0.667, order: 0};
        var card3 = {name: "d", particle: "quark", generation: 1, anti: false, colour: "green", mass: 10, charge: -0.333, order: 0};

        gameObject = {
            players: {1: "host", 2: "guest1", 3: "guest2"},
            combinations: {1: Array(Array(card1, card2, card3)), 2: Array(Array(card1, card2, card3)), 3: Array(Array(card1, card2, card3))},
            points: {1: 4, 2: 0, 3: 0}
        };

        scoreEachTurn();

        $.each(gameObject.players, function (player, name) {
            expect(gameObject.points[player]).toEqual(4);
        });
    });
});
