/****************************************************
* Purpose: Contains test functions for actionHelper
*****************************************************/

import { expect } from 'chai';
import { printOutput, processMoveZombie, setCreaturesPosition, setZombiePosition, setWorld, getWorldLength  } from '../../src/actions/actionHelper'; 
import Program from "../../src/components/program";

describe("actionHelper - Commands", function() {

    const dimensions = 10;
    const program = new Program();
    const initialPosition = "(0,0)";
    const creaturesPosition = "(2,2) (4,4) (6,6) (8,8)";
    const directionCommands = "RDRU";

    it(`actionHelper - setWorld ${dimensions}x${dimensions}`, function() {
        setWorld(dimensions, program);
        expect(program.getWorld().getMaxX()).to.be.equal(dimensions-1);
        expect(program.getWorld().getMaxY()).to.be.equal(dimensions-1);
    })

    it(`actionHelper - setZombiePosition ${initialPosition}`, function() {
        setZombiePosition(initialPosition, program);
        const initialZombie = program.getStore().getState().zombiesToProcess[0];
        expect(initialZombie.x).to.be.equal(0);
        expect(initialZombie.y).to.be.equal(0);
    })
    
    it(`actionHelper - setCreaturesPosition ${creaturesPosition}`, function() {
        setCreaturesPosition(creaturesPosition, program);

        let parseInput = creaturesPosition.replace(/\s/g, '').replaceAll(")(" , ",").replace(/[()]/g, '');
        parseInput = parseInput.split(",");
        let creatureList = program.getStore().getState().creatures;

        for (let i = 0; i < creatureList.length; i++) {       
            let creature = creatureList[i];
            expect(creature.x).to.be.equal(parseInt(parseInput[i*2]));
            expect(creature.y).to.be.equal(parseInt(parseInput[(i*2)+1]));
        }
    })

    it(`actionHelper - moveZombie ${directionCommands}`, function() {
        processMoveZombie(directionCommands, program);  
        const initialZombie = program.getStore().getState().zombies[0];
        expect(initialZombie.x).to.be.equal(2);
        expect(initialZombie.y).to.be.equal(0);        
        //printOutput(program);
    })

});