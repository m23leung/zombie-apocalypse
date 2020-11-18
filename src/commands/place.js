
/*******************************
* Purpose: Place command 
********************************/

import { command } from "./command";
import units from "../constants/units";
import { isValidMove } from "../validations/validations";

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
 */   
    placeUnit(type) {

        const { x, y, xMax, yMax } = this.action.payload;      
        let state = this.state;

        // Only place unit if within boundaries
        if ( isValidMove(x, xMax, y, yMax)) {
             if (type == units.CREATURE) {
                state.creatures.push(this.action.payload);  
             } else {
                state.zombiesToProcess.push({ 'x': x, 'xMax': xMax, 'yMax': yMax, 'y': y, 'id': state.zombieCount});
                state.zombieCount++;
             }
        } else {
            process.exit(0);
        }
    }
}