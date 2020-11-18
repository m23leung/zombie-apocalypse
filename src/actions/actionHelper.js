import World from "../components/world";
import { placeZombie, placeCreature, moveZombie, printFinalPositions } from '../store/storeReducer';
import errorMessages from "../constants/errorMessages";

/**
 * Dispatch print output action
 * @param  program
 */
export const printOutput = (program) => {     
    program.getStore().dispatch(printFinalPositions());
}

/**
 * Dispatch move zombie action after parsing input
 * @param  input
 * @param  program
 */
export const processMoveZombie = (input, program) => {
    let parseInput = input.replace(/ /g, '');
    let commands = parseInput.split('');        
    program.getStore().dispatch(moveZombie({ 'commands': commands }));
}

/**
 * Dispatch place creatures position action after parsing input
 * @param  input
 * @param  program
 */
export const setCreaturesPosition = (input, program) => {
    
    // If no input, then don't add any creatures
    if (input.trim().length < 1) {
        console.log("No creature positions entered");
        return;
    }

    let parseInput = input.replace(/\s/g, '').replaceAll(")(" , ",").replace(/[()]/g, '');
    parseInput = parseInput.split(",");

    for (let i=0; i < parseInput.length; i+=2) {

        let x = parseInput[i].trim();
        let y = parseInput[i+1].trim();

        let action = [placeCreature({ 'x': x, 
                                      'y': y, 
                                      'xMax': program.getWorld().getMaxX(), 
                                      'yMax': program.getWorld().getMaxY()
                                    })];

        action.forEach(program.getStore().dispatch);  
    }
}

/**
 * Dispatch place zombie action after parsing input
 * @param  input
 * @param  program
 */
export const setZombiePosition = (input, program) => {

    // If no input, then don't add any creatures
    if (input.trim().length < 1) {
        console.log(errorMessages.invalidArguments);
        process.exit(0);
    }

    let parseInput = input.replace(/[()]/g, '');
    let [x,y] = parseInput.split(',');  
    
    let action = [placeZombie({ 'x': x, 
                                'y': y, 
                                'xMax': program.getWorld().getMaxX(), 
                                'yMax': program.getWorld().getMaxY()
                    })];
    
    action.forEach(program.getStore().dispatch);  
}

/**
 * Override string replaceAll behavior
 */
String.prototype.replaceAll = function(str1, str2, ignore)
{	
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);	
} 