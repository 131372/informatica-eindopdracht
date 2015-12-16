/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function randomDeck(deck) {
    order = 0;
    orderNrs = [];
    var something = false; //help met het bedenken van een goede naam
    var anotherthing = false; //help met het bedenken van een goede naam

    $.each(deck, function (index, obj) {
        while (something === false) {
            orderNr = Math.floor(Math.random() * 10000) + 1;  // genereert random nummer, ook van internet (test even haha)
            $.each(orderNrs, function (value) { 
                if (orderNr === value) { //als het random nummer al een keer gebruikt is
                    anotherthing = true; // dan wordt anotherthing true
                }              
            });
            
            if (anotherthing === false){ //als het random nummer niet al een keer gebruikt is
                orderNrs.push(orderNr); //dan wordt dit nummer in orderNrs (de array met de gebruikte random nummers) gepusht 
                something = true; //en wordt something true
            }
        } // als something true is, stopt deze whileloop

        obj["order"] = orderNr; //property order van de kaart met [index] wordt het random gegenereerde nummer
        something = false; //zodat de whileloop weer gaat lopen, voor de volgende kaart

    });

    randomDeck = deck.sort(function (a, b) {              // dit heb ik van internet, kan iemand dit even testen
        return (a.order < b.order ? -1 : 1);
    });
    
    return randomDeck; // dit is de random deck
}



