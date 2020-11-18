/****************************************************
* Purpose: Main entry to program
*****************************************************/

// Package Imports
import Zombie from "./src/components/zombie";
import World from "./src/components/world";
import { placeZombie, placeCreature, moveZombie } from './src/store/storeReducer';
import { notNumber} from "./src/constants/errorMessages";
import fs from 'fs';

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
        const fileName = input.split(" ")[1];
        console.log(`READING FILE: ${fileName}`);

        const commands = parseReadCommand(fileName);

        setWorld(commands[0], zombie);
        setZombiePosition(commands[1], zombie);
        setCreaturesPosition(commands[2], zombie);
        setZombieMoves(commands[3], zombie);  
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
                setZombieMoves(input, zombie);
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

export const setZombieMoves = (input, zombie) => {
    let commands = input.split('');          
    zombie.getStore().dispatch(moveZombie({ 'commands': commands }));
}

export const setCreaturesPosition = (input, zombie) => {
    
    let parseInput = input.replaceAll(")(" , ",").replace(/[()]/g, '');
    parseInput = parseInput.split(",");

    for (let i=0; i < parseInput.length; i+=2) {
        console.log(`Setting creature with coordinates (${parseInput[i]},${parseInput[i+1]})...`);

        let action = [placeCreature({ 'x': parseInput[i], 
                                      'y': parseInput[i+1], 
                                      'xMax': zombie.getWorld().getMaxX(), 
                                      'yMax': zombie.getWorld().getMaxY()
                                    })];

        action.forEach(zombie.getStore().dispatch);  
    }
}

export const setZombiePosition = (input, zombie) => {
    let parseInput = input.replace(/[()]/g, '');
    let [x,y] = parseInput.split(',');  
    x = x.trim();
    y = y.trim();

    console.log(`Setting Initial Zombie Position to (${x},${y})...`);
    
    let action = [placeZombie({ 'x': x, 
                                'y': y, 
                                'xMax': zombie.getWorld().getMaxX(), 
                                'yMax': zombie.getWorld().getMaxY()
                    })];
    
    action.forEach(zombie.getStore().dispatch);  
}

export const setWorld = (input, zombie) => {
    const length = getWorldLength(input);
    if (length > 0) {
        console.log(`Creating world with dimensions (${length}x${length})`)
        zombie.setWorld(new World(length, length));
    } else {
        console.log(notNumber);
    }
}

export const getWorldLength = (length) => {
    return (isNaN(length))? 0: length;
}

/**
 * Reads the file based on the file path provided 
 * @param  path
 */   
export const parseReadCommand = function(path) {

    if (!isFileTypeTxt(path)) {
        return [];
    }
    
    try {
        return fs.readFileSync(path, 'utf8').split('\n');
    } catch(err) {
        if (err.code === 'ENOENT') {
            console.log(fileNotFound);
        } else {
            console.log(err);
        }
        return [];
    }
    
}

/**
 * Checks if the file type extension is .txt
 * @param  path
 */   
export const isFileTypeTxt = function(path) {
    const fileType = path.substr(path.lastIndexOf('.')).toLowerCase();
    
    if (fileType !== '.txt'){ 
        console.log(invalidFileExt);
        return false;
    } else {
        return true;
    }
}

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 