import World from "../components/world";
import { placeZombie, placeCreature, moveZombie, printFinalPositions } from '../store/storeReducer';
import { notNumber } from "../constants/errorMessages";

export const printOutput = (zombie) => {     
    zombie.getStore().dispatch(printFinalPositions());
}

export const processMoveZombie = (input, zombie) => {
    let commands = input.split('');          
    zombie.getStore().dispatch(moveZombie({ 'commands': commands }));
}

export const setCreaturesPosition = (input, zombie) => {
    
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
                                      'xMax': zombie.getWorld().getMaxX(), 
                                      'yMax': zombie.getWorld().getMaxY()
                                    })];

        action.forEach(zombie.getStore().dispatch);  
    }
}

export const setZombiePosition = (input, zombie) => {
    let parseInput = input.replace(/[()]/g, '');
    let [x,y] = parseInput.split(',');  

    //console.log(`Setting Initial Zombie Position to (${x},${y})...`);
    
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

String.prototype.replaceAll = function(str1, str2, ignore)
{	
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);	
} 