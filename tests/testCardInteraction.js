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
    },
     deckEquals: function () {
      return {
        compare: function (actual, expected) {
          var a = actual;
          var e = expected
          var r = true;
          r = a.count == e.count;
          $.each(a, function(i, v) {
              r &= v == e[i]
          });
          return {
            pass:r
          };
        }
      };
    },
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
	deck.push(createQuark("u",false,"r"));
	deck.push(createQuark("u",false,"r"));
	deck.push(createQuark("u",false,"g"));
	deck.push(createQuark("u",false,"g"));
	deck.push(createQuark("u",false,"b"));
	deck.push(createQuark("d",false,"r"));
    });
    it("should have same size after random", function() {
        expect(deck.length).toBe(6);
        randomDeck(deck);
        expect(deck.length).toBe(6);
    });
     
    
    it("should be random indeed", function() {
        // make copy of deck
        var cDeck = [];
        $.each(deck, function(i, v) {
            cDeck.push(v)
        });
        console.log(cDeck)
        expect(deck).deckEquals(deck); 
        expect(deck).deckEquals(cDeck); 
        for(i = 1; i < 30; i++) {
           randomDeck(deck);
        }
        expect(deck.length).toBe(6);
        expect(deck).not.deckEquals(cDeck);        
    });
    
    it("should be able to draw a card", function() {
        randomDeck(deck);
        var originalLength = deck.length;
        var r = drawCard(deck);
        expect(deck.length).toBe(originalLength - 1)
        expect(r[1].length).toBe(originalLength - 1)
        
    })
    
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