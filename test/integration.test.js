/****************************************************
* Purpose: Contains integration testing
*****************************************************/

import { expect } from 'chai';
import { printOutput, processMoveZombie, setCreaturesPosition, setZombiePosition, setWorld, getWorldLength  } from '../src/actions/actionHelper'; 
import { parseReadCommand } from '../src/readHelper'; 
import Program from "../src/components/program";

let filePath1 = "testfiles/example.txt";
let filePath2 = "testfiles/example2.txt";

describe("integration - Sample Input", function() {
    
    const program = new Program();

    const dimensions = 4;
    const initialPosition = "(3,1)";
    const creaturesPosition = "(0,1) (1,2) (1,1)";
    const directionCommands = "RDRU";
    const finalZombiePositions = [[1,1],[3,1],[3,2],[2,1]];

    it(`actionHelper - setWorld ${dimensions}x${dimensions}`, function() {
        setWorld(dimensions, program);
        expect(program.getWorld().getMaxX()).to.be.equal(dimensions-1);
        expect(program.getWorld().getMaxY()).to.be.equal(dimensions-1);
    })

    it(`actionHelper - setZombiePosition ${initialPosition}`, function() {
        setZombiePosition(initialPosition, program);
        const initialZombie = program.getStore().getState().zombiesToProcess[0];
        
        let parseInput = initialPosition.replace(/[()]/g, '');
        parseInput = parseInput.split(",");

        expect(initialZombie.x).to.be.equal(parseInt(parseInput[0]));
        expect(initialZombie.y).to.be.equal(parseInt(parseInput[1]));
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

    it(`integration - Sample Input - zombies' & creatures' positions after command: ${directionCommands}`, function() {
        processMoveZombie(directionCommands, program);  

        for (let i=0; i < finalZombiePositions.length; i++) {
            let zombieUnit = program.getStore().getState().zombies[i];
            expect(zombieUnit.x).to.be.equal(finalZombiePositions[i][0]);
            expect(zombieUnit.y).to.be.equal(finalZombiePositions[i][1]);        
        }
        expect(program.getStore().getState().creatures.length).to.be.equal(0);
    })

});

describe("integration - Read Files", function() {
    
    it(`integration - Verify output from file ${filePath1}`, function() {
        let program = new Program();
        let commands = parseReadCommand(filePath1);

        setWorld(commands[0], program);
        expect(program.getWorld().getMaxX()).to.be.equal(3);
        expect(program.getWorld().getMaxY()).to.be.equal(3);

        console.log(commands[1]);
        setZombiePosition(commands[1], program);
        let initialZombie = program.getStore().getState().zombiesToProcess[0];
        expect(initialZombie.x).to.be.equal(2);
        expect(initialZombie.y).to.be.equal(1);

        setCreaturesPosition(commands[2], program);
        let creatureList = program.getStore().getState().creatures;
        expect(creatureList[0].x).to.be.equal(0);
        expect(creatureList[0].y).to.be.equal(1);
        expect(creatureList[1].x).to.be.equal(1);
        expect(creatureList[1].y).to.be.equal(2);
        expect(creatureList[2].x).to.be.equal(3);
        expect(creatureList[2].y).to.be.equal(1);

        processMoveZombie(commands[3], program); 
        let zombieList = program.getStore().getState().zombies;  
        expect(zombieList[0].x).to.be.equal(3);
        expect(zombieList[0].y).to.be.equal(0);
        expect(zombieList[1].x).to.be.equal(2);
        expect(zombieList[1].y).to.be.equal(1);
        expect(zombieList[2].x).to.be.equal(1);
        expect(zombieList[2].y).to.be.equal(0);    
        expect(zombieList[3].x).to.be.equal(0);
        expect(zombieList[3].y).to.be.equal(0);    

        expect(program.getStore().getState().creatures.length).to.be.equal(0);    

        //expect(parseInput.length).to.be.equal(4);
    }) 

    it(`integration - Verify output from file ${filePath2}`, function() {
        let program = new Program();
        let commands = parseReadCommand(filePath2);

        setWorld(commands[0], program);
        expect(program.getWorld().getMaxX()).to.be.equal(3);
        expect(program.getWorld().getMaxY()).to.be.equal(3);

        setZombiePosition(commands[1], program);
        let initialZombie = program.getStore().getState().zombiesToProcess[0];
        expect(initialZombie.x).to.be.equal(3);
        expect(initialZombie.y).to.be.equal(1);

        setCreaturesPosition(commands[2], program);
        let creatureList = program.getStore().getState().creatures;
        expect(creatureList[0].x).to.be.equal(0);
        expect(creatureList[0].y).to.be.equal(1);
        expect(creatureList[1].x).to.be.equal(1);
        expect(creatureList[1].y).to.be.equal(2);
        expect(creatureList[2].x).to.be.equal(1);
        expect(creatureList[2].y).to.be.equal(1);

        processMoveZombie(commands[3], program); 
        let zombieList = program.getStore().getState().zombies;
        expect(zombieList[0].x).to.be.equal(1);
        expect(zombieList[0].y).to.be.equal(1);
        expect(zombieList[1].x).to.be.equal(3);
        expect(zombieList[1].y).to.be.equal(1);
        expect(zombieList[2].x).to.be.equal(3);
        expect(zombieList[2].y).to.be.equal(2);    
        expect(zombieList[3].x).to.be.equal(2);
        expect(zombieList[3].y).to.be.equal(1);    

        expect(program.getStore().getState().creatures.length).to.be.equal(0);    
    })  
});
