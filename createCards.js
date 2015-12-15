/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * 
 * @param {string} particle
 * @param {bool} anti
 * @param {string} colour 
 * @returns {undefined}
 */
function createQuark(particle, anti, colour){
    switch(particle){
        case 'u': 
            this.createUp(anti, colour);
            break;
        case 'd': 
            this.createDown(anti, colour);
            break;
        case 'c':
            break;
        case 's':
            break; 
        case 't':
            break;
        case 'b':
            break;
        default: 
    }
    
    /**
     * 
     * @param {type} anti
     * @param {type} colour
     * @returns {createQuark.createUp.up}
     */
    this.createUp = function(anti, colour){
        var up = {particle: "u", generation: 1, anti: anti, colour: colour, mass: 5, charge: 0.667};
        return up;
    };
    
    this.createDown = function(anti, colour){
        var down = {particle: "d", generation: 1, anti: anti, colour: colour, mass: 10, charge: -0.333};
        return down;
    }
    
    this.createCharm = function(anti, colour){
        var charm = {particle: "c", generation: 2, anti: anti, colour: colour, mass: 1, charge: 0.667};
        return charm;
    }
    
    this.createStrange = function(anti, colour){
        var strange = {particle: "s", generation: 2, anti: anti, colour: colour, mass: 200, charge: -0.333};
        return strange;
    }
    
    this.createTau = function(anti, colour){
        var Tau = {particle: "t", generation: 3, anti: anti, colour: colour, mass: 175, charge: 0.667};
        return Tau;
    }
    
    this.createBottom = function(anti, colour){
        var Tau = {particle: "b", generation: 3, anti: anti, colour: colour, mass: 175, charge: 0.667};
        return Tau;
    }
}