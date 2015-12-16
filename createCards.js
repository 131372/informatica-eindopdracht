/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 * @param {string} particle u, d, c, s, t, b
 * @param {bool} anti
 * @param {string} colour B, R, G
 * @returns {createQuark.createCardsAnonym$2|createQuark.createCardsAnonym$0|createQuark.createCardsAnonym$1|createQuark.createCardsAnonym$3|createQuark.createCardsAnonym$4|createQuark.createCardsAnonym$5}
 */
function createQuark(particle, anti, colour){
    switch(particle){
        case 'u': 
            return {particle: "u", generation: 1, anti: anti, colour: colour, mass: 5, charge: 0.667, order: 0};
            break;
        case 'd': 
            return {particle: "d", generation: 1, anti: anti, colour: colour, mass: 10, charge: -0.333, order: 0};
            break;
        case 'c':
            return {particle: "c", generation: 2, anti: anti, colour: colour, mass: 1, charge: 0.667, order: 0};
            break;
        case 's':
            return {particle: "s", generation: 2, anti: anti, colour: colour, mass: 200, charge: -0.333, order: 0};
            break; 
        case 't':
            return {particle: "t", generation: 3, anti: anti, colour: colour, mass: 175, charge: 0.667, order: 0};
            break;
        case 'b':
            return {particle: "b", generation: 3, anti: anti, colour: colour, mass: 4, charge: -0.333, order: 0};
            break;
        default: 
    }
}