/****************************************************
* Purpose: Main entry to program
*****************************************************/

// Package Imports
import Zombie from "./src/components/zombie";
import { setWorld, setZombiePosition, setCreaturesPosition, processMoveZombie, printOutput } from "./src/actions/actionHelper";
import { parseReadCommand } from "./src/readHelper";
import { notNumber, invalidArguments } from "./src/constants/errorMessages";

// Initialize zombie
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

let i = 0;
// Retrieve User Input
readLine.on("line", (input) => { 
 
    // Exit Command
    if (input.toLowerCase().trim() === "exit") {
        console.log("\nSee you later!!!");
        process.exit(0);

    // Read Command (OPTIONAL)
    // Command: read <file_path>
    } else if (input.toLowerCase().trim().includes("read")) {

        const inputCommand = input.split(" ");
        if (inputCommand.length != 2) {
            console.log(invalidArguments);
            process.exit(0);
        }
        
        const fileName = inputCommand[1];
        console.log(`READING FILE: ${fileName}`);

        const commands = parseReadCommand(fileName);

        setWorld(commands[0], zombie);
        setZombiePosition(commands[1], zombie);
        setCreaturesPosition(commands[2], zombie);
        processMoveZombie(commands[3], zombie);  
        printOutput(zombie);
        process.exit(0);   

    // Process Input           
    } else {

        input = input.trim();

        switch (i) {
            case 0:
                setWorld(input, zombie);
                break;
            case 1:
                setZombiePosition(input, zombie);
                break;
            case 2:
                setCreaturesPosition(input, zombie);
                break;
            case 3:
                processMoveZombie(input, zombie);
                printOutput(zombie);
                i = -1;
                process.exit(0);
            default:
                console.log("Unknown input, resetting back to default state");
                i = -1;
        }

        i++;
        readLine.prompt();
    }
});

// Set Ending Prompt
readLine.on("close", () => {
    console.log("\nSee you later!!!");
    process.exit(0);
});

// Trigger User Prompt
readLine.setPrompt('Zombie> ');
readLine.prompt();