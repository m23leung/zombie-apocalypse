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
        console.log('');
        console.log('These are the order of valid commands:'.bold);
        console.log('');
        console.log('1. Dimension of grid (N)');
        console.log('2. Initial position of zombie (X,Y)');
        console.log('3. List of initial positions of the creatures (X1,Y1)(X2,Y2)(X3,Y3)');
        console.log('4. Sequence of moves the zombies will make (RDLU)');
        console.log('');
        console.log("- The program will output the zombies' and creatures' final positions after moving");
        console.log('');
        console.log('READ textfiles/example.txt'.bold.underline);
        console.log('- You can use any textfile on your computer. The program will execute all the valid commands within.');
        console.log('');
        console.log('EXIT'.bold.underline);
        console.log('- Will close the program');
        console.log();
        console.log('----------------------------------------------------------------------------------');
        console.log();
        console.log('- After the nuclear war, a strange and deadly virus has infected the planet producing mindless zombies. These zombies now wander the world converting any remaining living creatures they find to zombies as well.');  
        console.log('- A single zombie awakes and begins to move around the grid following a sequence of movements.');          
        console.log('- The world is represented by an n x n grid on which zombies and creatures live.');     
        console.log('- Please note that the zombies can move through the edge of the grid, appearing directly on the opposite side.');
        console.log();  
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
}