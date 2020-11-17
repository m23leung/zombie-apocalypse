
/*******************************
* Purpose: Place command 
********************************/

import { command } from "./command";

export default class place extends command {
    
    execute() {
        this.placeUnit();   
        return this;
    }

 /**
 * Places the unit on the board.
 * If the unit tries to place outside boundaries, it will ignore the command.
 */   
    placeUnit() {
        const { x, y, xMax, yMax } = this.action.payload;      
        let state = this.state;
        console.log(`x,y,xmax,ymax: ${x},${y},${xMax},${yMax}`)
        
        // Only place unit if within table boundaries and valid direction
        //if ( isValidMove(x, xMax, y, yMax) &&  {
    
             // Set unit coordinates and direction
             state.x = x;
             state.y = y;

             // Set placed flag
             state.isPlaced = true;
    
             // Set table dimensions
             state.xMax = xMax;
             state.yMax = yMax;

        //}
    }
}