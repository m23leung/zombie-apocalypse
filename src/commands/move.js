/*******************************
* Purpose: Move command 
********************************/

import { isValidDirection } from "../validations/validations";
import directions from "../constants/directions";
import { command } from "./command";
import errorMessages from "../constants/errorMessages";

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
 * Moves the unit X steps with the sequence of commands.
 * @param  steps
 * @param  commands
 * @param  zombie 
 */
    moveUnit(steps, commands, zombie) {

        let state = this.state;
        let { x, y, xMax, yMax, id } = zombie;

        // Convert to Integer
        steps = parseInt(steps);
        x = parseInt(x);
        y = parseInt(y);

        // If unexpected parse issue, flag as error
        if (isNaN(steps) || isNaN(x) || isNaN(y)) {
            console.log(errorMessages.moveParseError);
            return;
        }

        // Check if clashing with creature before any moving sequence is initiated...
        this.infectCreatures(state, id, x, xMax, y, yMax);

        // Process each direction command
        for (let i=0; i < commands.length; i++) {
            let direction = commands[i];
            
            if (!isValidDirection(direction)) {
                continue;
            }

            let newPosition = this.getNewPosition(steps, direction, x, y, xMax, yMax);
            x = newPosition.x;
            y = newPosition.y;

            console.log(`zombie ${id} moved to (${x},${y}).`)

            // Check if clashing with creature after every move....
            this.infectCreatures(state, id, x, xMax, y, yMax);
       }   

       // Zombie finished moving, add to list of zombies' final positions
       state.zombies.push({     'x': x, 
                                'y': y, 
                                'id': id,
                                'xMax': xMax, 
                                'yMax': yMax });
                          
    }
    
     /**
     *  Infects creatures if zombie on same position
     * @param  state
     * @param  id
     * @param  x
     * @param  xMax
     * @param  y
     * @param  yMax
     */     
    infectCreatures(state, id, x, xMax, y, yMax) {

        for (let i = 0; i < state.creatures.length; i++) {
            // If zombie's x,y clashes with creature, remove from creature list and add to zombie list
            const creatureX = state.creatures[i].x;
            const creatureY = state.creatures[i].y;

            if ((x == creatureX) && (y == creatureY)) { 
                console.log(`zombie ${id} infected creature at (${x},${y}).`);
                    
                // Remove from creature list
                state.creatures.splice(i, 1);

                // Add to zombies to process list
                state.zombiesToProcess.push({    
                    'x': creatureX, 
                    'y': creatureY, 
                    'id': state.zombieCount,
                    'xMax': xMax, 
                    'yMax': yMax });

                state.zombieCount++;                
            }          
        }
    }
    /**
     *  Get new position
     * @param  steps
     * @param  direction
     * @param  x
     * @param  y
     * @param  xMax
     * @param  yMax
     */   
    getNewPosition(steps, direction, x, y, xMax, yMax) {

                            // Calculate newly moved position
                            switch(direction) {
                            case directions.D:
                                y+= steps;
                                break;
                            case directions.U:
                                y-= steps;
                                break;  
                            case directions.R:
                                x+= steps;
                                break;       
                            case directions.L:
                                x-= steps;
                                break;                                                               
                            }
                        
                            // Move through x-axis of the grid
                            if ( x < 0) {
                                x = xMax;
                            } else if ( x > xMax) {
                                x = 0;
                            }
                            // Move through y-axis of the grid
                            if ( y < 0 ) {
                                y = yMax;
                            } else if (y > yMax) {
                                y = 0;
                            }
                        
                            return {'x':x,
                                    'y':y};
                          }
  }