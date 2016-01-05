/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 * @param {string} name u, d, c, s, t, b
 * @param {bool} anti
 * @param {string} colour b, r, g
 * @returns {CreateQuark.card}
 */
function createQuark(name, anti, colour){
    switch(name){
        case 'u': 
            var card = {name: "u", particle: "quark", generation: 1, anti: anti, colour: colour, mass: 5, charge: 0.667, order: 0};
            break;
        case 'd': 
            var card = {name: "d", particle: "quark", generation: 1, anti: anti, colour: colour, mass: 10, charge: -0.333, order: 0};
            break;
        case 'c':
            var card = {name: "c", particle: "quark", generation: 2, anti: anti, colour: colour, mass: 1, charge: 0.667, order: 0};
            break;
        case 's':
            var card = {name: "s", particle: "quark", generation: 2, anti: anti, colour: colour, mass: 200, charge: -0.333, order: 0};
            break; 
        case 't':
            var card = {name: "t", particle: "quark", generation: 3, anti: anti, colour: colour, mass: 175, charge: 0.667, order: 0};
            break;
        case 'b':
            var card = {name: "b", particle: "quark", generation: 3, anti: anti, colour: colour, mass: 4, charge: -0.333, order: 0};
            break;
        default: 
    }
	if(anti){
		card['charge']=-card['charge'];
	}
    return card;
}

function CreateLepton(name, anti, neutrino){
    if(neutrino){
        // create neutrino
    } else{
        // create other 
    }
}

function createDeck1(){
	deck=[];
	deck.push(createQuark("u",false,"red"));
	deck.push(createQuark("u",false,"red"));
	deck.push(createQuark("u",false,"green"));
	deck.push(createQuark("u",false,"green"));
	deck.push(createQuark("u",false,"blue"));
	deck.push(createQuark("d",false,"red"));
	deck.push(createQuark("d",false,"red"));
	deck.push(createQuark("d",false,"green"));
	deck.push(createQuark("d",false,"green"));
	deck.push(createQuark("d",false,"blue"));
	deck.push(createQuark("s",false,"red"));
	deck.push(createQuark("s",false,"red"));
	deck.push(createQuark("s",false,"green"));
	deck.push(createQuark("s",false,"green"));
	deck.push(createQuark("s",false,"blue"));
	deck.push(createQuark("c",false,"red"));
	deck.push(createQuark("c",false,"red"));
	deck.push(createQuark("c",false,"green"));
	deck.push(createQuark("c",false,"green"));
	deck.push(createQuark("c",false,"blue"));
	deck.push(createQuark("b",false,"red"));
	deck.push(createQuark("b",false,"red"));
	deck.push(createQuark("b",false,"green"));
	deck.push(createQuark("b",false,"green"));
	deck.push(createQuark("b",false,"blue"));
	deck.push(createQuark("t",false,"red"));
	deck.push(createQuark("t",false,"red"));
	deck.push(createQuark("t",false,"green"));
	deck.push(createQuark("t",false,"green"));
	deck.push(createQuark("t",false,"blue"));
	deck.push(createQuark("u",true,"red"));
	deck.push(createQuark("u",true,"green"));
	deck.push(createQuark("u",true,"blue"));
	deck.push(createQuark("u",true,"blue"));
	deck.push(createQuark("d",true,"red"));
	deck.push(createQuark("d",true,"green"));
	deck.push(createQuark("d",true,"blue"));
	deck.push(createQuark("d",true,"blue"));
	deck.push(createQuark("s",true,"red"));
	deck.push(createQuark("s",true,"green"));
	deck.push(createQuark("s",true,"blue"));
	deck.push(createQuark("s",true,"blue"));
	deck.push(createQuark("c",true,"red"));
	deck.push(createQuark("c",true,"green"));
	deck.push(createQuark("c",true,"blue"));
	deck.push(createQuark("c",true,"blue"));
	deck.push(createQuark("t",true,"red"));
	deck.push(createQuark("t",true,"green"));
	deck.push(createQuark("t",true,"blue"));
	deck.push(createQuark("t",true,"blue"));
	deck.push(createQuark("b",true,"red"));
	deck.push(createQuark("b",true,"green"));
	deck.push(createQuark("b",true,"blue"));
	deck.push(createQuark("b",true,"blue"));
	return deck;
}