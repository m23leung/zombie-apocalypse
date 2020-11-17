
/*******************************
* Purpose: Place command 
********************************/

import { command } from "./command";
import { isValidMove } from "../validations/validations";

export default class place extends command {


    constructor(state, action, type='zombie') {
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

        // Only place unit if within table boundaries and valid direction
        if ( isValidMove(x, xMax, y, yMax)) {
    
             // Set unit coordinates and direction
             state.x = x;
             state.y = y;

             // Set placed flag
             state.isPlaced = true;
    
             // Set table dimensions
             state.xMax = xMax;
             state.yMax = yMax;
             state.zombiesToProcess.push({ 'x': x, 'xMax': xMax, 'yMax': yMax, 'y': y, 'id': state.zombieCount});
             //console.log(`PLACING ${state.x} ${state.y}`)
             state.zombieCount++;
        }
    }
}