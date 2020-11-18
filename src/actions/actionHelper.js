import World from "../components/world";
import { placeZombie, placeCreature, moveZombie, printFinalPositions } from '../store/storeReducer';

export const printOutput = (program) => {     
    program.getStore().dispatch(printFinalPositions());
}

export const processMoveZombie = (input, program) => {
    let commands = input.split('');          
    program.getStore().dispatch(moveZombie({ 'commands': commands }));
}

export const setCreaturesPosition = (input, program) => {
    
    if (input.trim().length < 1) {
        return;
    }

    let parseInput = input.replace(/\s/g, '').replaceAll(")(" , ",").replace(/[()]/g, '');
    parseInput = parseInput.split(",");

    for (let i=0; i < parseInput.length; i+=2) {

        let x = parseInput[i].trim();
        let y = parseInput[i+1].trim();

        console.log(`Setting creature with coordinates (${x},${y})...`);

        let action = [placeCreature({ 'x': x, 
                                      'y': y, 
                                      'xMax': program.getWorld().getMaxX(), 
                                      'yMax': program.getWorld().getMaxY()
                                    })];

        action.forEach(program.getStore().dispatch);  
    }
}

export const setZombiePosition = (input, program) => {
    let parseInput = input.replace(/[()]/g, '');
    let [x,y] = parseInput.split(',');  

    console.log(`Setting Initial program Position to (${x},${y})...`);
    
    let action = [placeZombie({ 'x': x, 
                                'y': y, 
                                'xMax': program.getWorld().getMaxX(), 
                                'yMax': program.getWorld().getMaxY()
                    })];
    
    action.forEach(program.getStore().dispatch);  
}

String.prototype.replaceAll = function(str1, str2, ignore)
{	
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);	
} 