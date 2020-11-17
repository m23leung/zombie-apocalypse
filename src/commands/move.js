/*******************************
* Purpose: Move command 
********************************/

import { isValidMove } from "../validations/validations";
import directions from "../constants/directions";
import { command } from "./command";
import { moveParseError } from "../constants/errorMessages";

export default class move extends command {

    constructor(state, action, steps, commands, zombie) {
      super(state, action);
      this.steps = steps;
      this.commands = commands;
      this.zombie = zombie;
    }

    execute() {
        this.moveUnit(this.steps, this.commands, this.zombie);   
        return this;
    }

/**
 * Moves the unit X steps in the facing direction.
 * If the unit tries to move outside boundaries, 
 * it will ignore the command.
 * @param  steps
 */
    moveUnit(steps, commands, zombie) {

        // Pull data out from current state
        let state = this.state;

        // Use ID to lookup data from state.zombies
        let { x, y, xMax, yMax, id } = zombie;
        //console.log(`Original Point: ${id},${x},${y}`)

        // Convert to Integer
        steps = parseInt(steps);
        x = parseInt(x);
        y = parseInt(y);


        // If unexpected parse issue, flag as error
        if (isNaN(steps) || isNaN(x) || isNaN(y)) {
            console.log(moveParseError);
            return;
        }

        // Process each direction command
        for (let i=0; i < commands.length; i++) {
            let direction = commands[i];

            //console.log("MOVING IN DIRECTION: ", direction);
            // Calculate newly moved destination
            switch(direction) {
                case directions.DOWN:
                    y+= steps;
                    break;
                case directions.UP:
                    y-= steps;
                    break;  
                case directions.RIGHT:
                    x+= steps;
                    break;       
                case directions.LEFT:
                    x-= steps;
                    break;                                                               
            }
            
            // Move through edge of the grid
            if ( x < 0) {
                x = xMax;
            } else if ( x > xMax) {
                x = 0;
            }
            // Move through edge of the grid
            if ( y < 0 ) {
                y = yMax;
            } else if (y > yMax) {
                y = 0;
            }
        
            


                //const index = state.zombies.findIndex(zombie => zombie.id == id);
                //console.log(`ID IS ${id}, index is ${index}`);
                //state.zombies[index].x = parseInt(x);   
                //state.zombies[index].y = parseInt(y);  

                console.log(`zombie ${id} moved to (${x},${y})`)

                // Check if clashing with creature....
            for (let i = 0; i < state.creatures.length; i++) {
                //console.log(`CREATURE: ${state.creatures[i].x} ${state.creatures[i].y}`);

                // If zombie's new x,y clashes with creature, remove from creature list and add to zombie list
                const creatureX = state.creatures[i].x;
                const creatureY = state.creatures[i].y;

                if ((x == creatureX) && (y == creatureY)) {
                    console.log(`zombie ${id} infected creature at (${x},${y})`);
                    
                    // Infect the creature
                    // Remove from creature list
                    state.creatures.splice(i, 1);

                    // Add to zombie list
                    
                    //state.zombies.push({    'x': creatureX, 
                    //                        'y': creatureY, 
                    //                        'xMax': xMax, 
                    //                        'yMax': yMax });
                    

                    state.zombiesToProcess.push({    'x': creatureX, 
                    'y': creatureY, 
                    'id': state.zombieCount,
                    'xMax': xMax, 
                    'yMax': yMax });

                    state.zombieCount++;
                } 
            }

            
       }   

       state.zombies.push({    'x': x, 
       'y': y, 
       'id': id,
       'xMax': xMax, 
       'yMax': yMax });

    }
  }