/****************************************************
* Purpose: Main entry to program
*****************************************************/

// Package Imports
import Zombie from "./src/components/zombie";
import World from "./src/components/world";
import { placeZombie, placeCreature, moveZombie } from './src/store/storeReducer';

// Initialize robot
let zombie = new Zombie();

// Print the menu screen details
zombie.printMessage();

// **********************************
//   ReadLine Input - User Interface
// **********************************

const readline = require('readline')

// Initialize input receiver
const readLine = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

var i = 0;
// Retrieve User Input
readLine.on("line", (input) => { 
 
    // Set Exit Prompt
    if (input.toLowerCase().trim() === "exit") {
        console.log("\nSee you later!!!");
        process.exit(0);
    }

    if ( i == 0 ) { 
        // Initialize table
        const length = input.trim();
        
        if (isNaN(length)) {
            return;
        }

        console.log(`Creating world with dimensions (${length}x${length})`)
        const world = new World(length, length);   
        zombie.setWorld(world);

    } else if ( i == 1) {
        let input2 = input.trim();
        input2 = input2.replace("(", "").replace(")", "");;

        let [x,y] = input2.split(',');  
        console.log(`Setting Initial Zombie Position to (${x},${y})`);
        
        let action = [placeZombie({ 'x': x, 
                            'y': y, 
                            'xMax': zombie.getWorld().getMaxX(), 
                            'yMax': zombie.getWorld().getMaxY()
                        })];
        
        action.forEach(zombie.getStore().dispatch);  

    } else if ( i == 2) {
        let input2 = input.trim();
        input2 = input2.replaceAll(")(" , ",").replaceAll('(','').replaceAll(')','');
        input2 = input2.split(",");

        for (let i=0; i < input2.length; i+=2) {
            console.log(`Setting creature with coordinates (${input2[i]},${input2[i+1]})`);

            let action = [placeCreature({ 'x': input2[i], 
                                          'y': input2[i+1], 
                                          'xMax': zombie.getWorld().getMaxX(), 
                                          'yMax': zombie.getWorld().getMaxY()
                                        })];

            action.forEach(zombie.getStore().dispatch);  
        }

    } else if ( i == 3) {

        let commands = input.trim().split('');  
        let action = [];
     
        action.push(moveZombie({ 'commands': commands,
                                 'id' : 0 }));
      
        action.forEach(zombie.getStore().dispatch);          
        i = -1;
    } else {
        console.log("Unknown input, resetting back to default state");
        i = -1;
    }
    i++;

    readLine.prompt();
});

// Set Ending Prompt
readLine.on("close", () => {
    console.log("\nSee you later!!!");
    process.exit(0);
});

// Trigger User Prompt
readLine.setPrompt('Zombie> ');
readLine.prompt();