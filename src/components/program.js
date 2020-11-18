/**************************************************************************
* Purpose: Program class - performs command actions based on user input
***************************************************************************/
import configureStore from '../store/store';
import { setZombiePosition, setCreaturesPosition, processMoveZombie, printOutput } from "../actions/actionHelper";
import { parseReadCommand } from "../readHelper";
import errorMessages from "../constants/errorMessages";
import World from "./world";
import chalk from "chalk";

const colors = require('colors');

export default class program {

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
 
    /**
    * Create World
    * @param  input
    */        
    setWorld(input) {
        const length = (isNaN(input))? 0 : input;
        if (length > 0) {
            console.log(`Creating world with dimensions (${length}x${length})`)
            this.world = new World(length, length);
        } else {
            console.log(errorMessages.notNumber);
            process.exit(0);
        }
    }

    getWorld() {
        return this.world;
    }

    getStore() {
        return this.store;
    }
    
    /**
    * Read input from terminal
    */      
    parseInput() {

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
                    console.log(errorMessages.invalidArguments);
                    process.exit(0);
                }
                
                const fileName = inputCommand[1];
                console.log(`READING FILE: ${fileName}`);

                const commands = parseReadCommand(fileName);
                this.setWorld(commands[0]);
                setZombiePosition(commands[1], this);
                setCreaturesPosition(commands[2], this);
                processMoveZombie(commands[3], this);  
                printOutput(this);
                process.exit(0);   

            // Process Input           
            } else {

                input = input.trim();

                switch (i) {
                    case 0:
                        this.setWorld(input, this);
                        break;
                    case 1:
                        setZombiePosition(input, this);
                        break;
                    case 2:
                        setCreaturesPosition(input, this);
                        break;
                    case 3:
                        processMoveZombie(input, this);
                        printOutput(this);
                        i = -1;
                        process.exit(0);
                    default:
                        // Should never reach this case
                        process.exit(0);
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
        readLine.setPrompt('Zombie Apocalypse> ');
        readLine.prompt();
            }
}