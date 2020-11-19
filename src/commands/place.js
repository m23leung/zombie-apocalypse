
/*******************************
* Purpose: Place command 
********************************/

import { command } from "./command";
import units from "../constants/units";
import { isValidMove } from "../validations/validations";
import errorMessages from "../constants/errorMessages";

export default class place extends command {


    constructor(state, action, type) {
        super(state, action);
        this.type = type;
      }
  
    execute() {
        this.placeUnit(this.type);   
        return this;
    }

 /**
 * Places the unit on the board.
 * If the unit tries to place outside boundaries, it will ignore the command.
 * @param  type
 */   
    placeUnit(type) {

        let { x, y, xMax, yMax } = this.action.payload;      
        let state = this.state;

        // If unparsable coordinates, throw error
        if ( isNaN(parseInt(x)) || isNaN(parseInt(y))) {
            console.log(errorMessages.invalidCoordinates,`(${x},${y})`);

            // Initial input zombie position is mandatory, exit program
            if (type == units.ZOMBIE)
                process.exit(0);

            return;
        }

        x = parseInt(x);
        y = parseInt(y);
        
        // Only place unit if within boundaries
        if ( isValidMove(x, xMax, y, yMax)) {
            let unitCount;
             if (type == units.CREATURE) {
                unitCount = state.creatureCount;
                state.creatures.push({ 'x': x, 'xMax': xMax, 'yMax': yMax, 'y': y, 'id': unitCount});
                state.creatureCount++;
             } else {
                unitCount = state.zombieCount;
                state.zombiesToProcess.push({ 'x': x, 'xMax': xMax, 'yMax': yMax, 'y': y, 'id': unitCount});
                state.zombieCount++;
             }
             console.log(`Setting ${type.toLowerCase()} ${unitCount} to (${x},${y}).`);
        } else {
            process.exit(0);
        }
    }
}