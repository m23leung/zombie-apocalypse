/****************************************************
* Purpose: Main entry to program
*****************************************************/

// Package Imports
import Zombie from "./src/components/zombie";
import World from "./src/components/world";

// Initialize table
let length = 5;
let width = 5;
let world = new World(length, width);

// Initialize robot
let zombie = new Zombie();
zombie.setWorld(world);

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

// Retrieve User Input
readLine.on("line", (input) => { 

    // Set Exit Prompt
    if (input.toLowerCase().trim() === "exit") {
        console.log("\nSee you later!!!");
        process.exit(0);
    }

    zombie.handleCommand(input);
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