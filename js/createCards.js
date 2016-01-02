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
function CreateQuark(name, anti, colour){
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