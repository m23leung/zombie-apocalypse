/****************************************************
* Purpose: Contains test functions for actionHelper
*****************************************************/

import { expect } from 'chai';
import { printOutput, processMoveZombie, setCreaturesPosition, setZombiePosition, setWorld, getWorldLength  } from '../../src/actions/actionHelper'; 
import Zombie from "../../src/components/zombie";

describe("actionHelper - Commands", function() {

    const dimensions = 10;
    const zombie = new Zombie();
    const initialPosition = "(0,0)";
    const creaturesPosition = "(2,2) (4,4) (6,6) (8,8)";
    const directionCommands = "RDRU";

    it(`actionHelper - setWorld ${dimensions}x${dimensions}`, function() {
        setWorld(dimensions, zombie);
        expect(zombie.getWorld().getMaxX()).to.be.equal(dimensions-1);
        expect(zombie.getWorld().getMaxY()).to.be.equal(dimensions-1);
    })

    it(`actionHelper - setZombiePosition ${initialPosition}`, function() {
        setZombiePosition(initialPosition, zombie);
        const initialZombie = zombie.getStore().getState().zombiesToProcess[0];
        expect(initialZombie.x).to.be.equal(0);
        expect(initialZombie.y).to.be.equal(0);
    })
    
    it(`actionHelper - setCreaturesPosition ${creaturesPosition}`, function() {
        setCreaturesPosition(creaturesPosition, zombie);

        let parseInput = creaturesPosition.replace(/\s/g, '').replaceAll(")(" , ",").replace(/[()]/g, '');
        parseInput = parseInput.split(",");
        let creatureList = zombie.getStore().getState().creatures;

        for (let i = 0; i < creatureList.length; i++) {       
            let creature = creatureList[i];
            expect(creature.x).to.be.equal(parseInt(parseInput[i*2]));
            expect(creature.y).to.be.equal(parseInt(parseInput[(i*2)+1]));
        }
    })

    it(`actionHelper - moveZombie ${directionCommands}`, function() {
        processMoveZombie(directionCommands, zombie);  
        const initialZombie = zombie.getStore().getState().zombies[0];
        expect(initialZombie.x).to.be.equal(2);
        expect(initialZombie.y).to.be.equal(0);        
        //printOutput(zombie);
    })

});