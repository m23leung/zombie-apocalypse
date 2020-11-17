/****************************************************
* Purpose: Contains all the validation functions
*****************************************************/

import { invalidDirection, invalidPlacement, invalidArguments, unassignedBoard } from "../constants/errorMessages";
import directions from "../constants/directions";

/**
* Checks if the (x,y) coordinate is within the table boundaries
* @param  x
* @param  xMaxLength
* @param  y
* @param  yMaxLength
*/      
export const isValidMove = (x, xMaxLength, y, yMaxLength) => {
    if ( (x > xMaxLength ) || (x < 0) || (y < 0) || (y > yMaxLength )) {
        console.log(invalidPlacement);
        return false;
    }
    return true;
}

/**
* Checks if the direction entered is valid
* @param  direction
*/  
export const isValidDirection = (direction) => {
    if ( !directions[direction]) {
        console.log(invalidDirection);
        return false;
    }
    return true;
}

/**
* Checks if there are command line arguments
* @param  commandArgs
*/  
export const hasArgs = (commandArgs) => {
    if (!commandArgs) {
        console.log(invalidArguments);
        return false;
    }
    return true;
}

/**
* Checks if PLACE command has valid arguments
* @param  commandArgs
*/
export const isValidPlaceArgs = (commandArgs) => {

        if (!hasArgs(commandArgs)) return false;

        let [x,y,f] = commandArgs.split(',');   

        // If not all args entered, or arguments x,y not number, then throw invalid arg error
        if (!y || !f || isNaN(parseInt(x)) || isNaN(parseInt(y)) ) {
            console.log(invalidArguments);
            return false;
        }

        return true;
}

/**
* Checks if robot is on table
* @param  robot
*/
export const isRobotAssignedTable = (robot) => {
    if (!robot.table) {
        console.log(unassignedBoard);
        return false;
    }
    return true;
}