/**************************************************************************
* Purpose: Zombie class - performs command actions based on user input
***************************************************************************/

import chalk from "chalk";
const colors = require('colors');

export default class zombie {

    constructor() {
        this.world = null;
        //this.parser = new Parser();
    } 

    /**
    * Prints welcome & available commands message
    */   
    printMessage() {
        console.log('Welcome to the zombie apocalypse.'.green.bold);   
    }
    
    setWorld(world) {
        this.world = world;
    }

    getWorld() {
        return this.world;
    }

    /**
    * Processes the input from command line
    * If user enters invalid commands, they will be rejected
    * @param  input
    */      
    handleCommand(input) {
        
        if (!input.trim()) return;    
        input = input.toUpperCase().trim();


    }
}