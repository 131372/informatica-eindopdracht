beforeEach(function () {
  jasmine.addMatchers({
    quarkDefaults: function () {
      return {
        compare: function (actual, expected) {
          var q = actual;
          var e = expected

          return {
            pass:
                   q.particle == "quark" 
                && q.generation == e.generation
                && q.mass == e.mass            
                && q.charge == e.charge
                && q.order == 0
             
          };
        }
      };
    }
  });
});
describe("cardInteraction", function() {
    beforeEach(function() {
    ;
  });
});
describe("create Quark", function() {
     it("should create default quarks", function() {
        var u = createQuark('u', true, 'r');
        console.log(u)
        expect(u).quarkDefaults({generation:1, mass:5, charge:0.667});
    });
    it("should create up quark", function() {
        var u = createQuark('u', false, 'r');
        expect(u.name).toBe("u");
        expect(u.anti).toBeFalsy();
        expect(u.colour).toBe("r");
    });
    it("should create ANTI up quark", function() {
        var u = createQuark('u', true, 'r');
        expect(u.name).toBe("u");
        expect(u.anti).toBeTruthy();
        expect(u.colour).toBe("r");
        expect(u.charge).toBe(-0.667);
    });    
})
describe("deck Handling", function() {
    var deck = [];
    beforeEach(function() {
        deck = [];        
	deck.push(createQuark("u",false,"red"));
	deck.push(createQuark("u",false,"red"));
	deck.push(createQuark("u",false,"green"));
	deck.push(createQuark("u",false,"green"));
	deck.push(createQuark("u",false,"blue"));
	deck.push(createQuark("d",false,"red"));
    });
    it("should have same size after random", function() {
        expect(deck.length).toBe(6);
        randomDeck(deck);
        expect(deck.length).toBe(6);
    });
     
    /*
    it("should have be random", function() {
        // make copy of deck
        var cDeck = [];
        $.each(deck, function(i, v) {
            cDeck.push(v)
        })    
        for(i = 1; i < 30; i++) {
           randomDeck(deck);
        }
        expect(deck.length).toBe(6);
        expect(deck).not.toBeEqual(cDeck);        
    });
    it("should be able to draw a card", function() {
        randomDeck(deck);
        var originalLength = deck.length;
        var r = drawCard(deck);
        expect(deck.length).toBe(originalLength - 1)
        expect(r[1].length).toBe(originalLength - 1)
        
    })
    */
   
});
describe("initial deck 1", function() {
    var d ;
    beforeEach(function() {
        d = createDeck1();
    });
    it("should be of length 54", function() {
        expect (d.length).toBe(54);
    })
})