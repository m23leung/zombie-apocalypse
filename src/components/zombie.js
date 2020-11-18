/**************************************************************************
* Purpose: Zombie class - performs command actions based on user input
***************************************************************************/
import configureStore from '../store/store';
import chalk from "chalk";

const colors = require('colors');

export default class zombie {

    constructor() {
        this.world = null;
        this.store = configureStore();
    } 

    printMessage() {
        console.log('Welcome to the zombie apocalypse.'.green.bold);   
    }
    
    setWorld(world) {
        this.world = world;
    }

    getWorld() {
        return this.world;
    }

    getStore() {
        return this.store;
    }

    /**
    * Processes the input from command line
    * If user enters invalid commands, they will be rejected
    * @param  input
    */      
    handleCommand(input) {
        
        if (!input.trim()) return;    
        input = input.toUpperCase().trim();

        const action = this.parser.parseCommand(input, this);
        if (action === undefined) return;

        action.forEach(store.dispatch);  

    }
}