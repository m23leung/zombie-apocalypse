/****************************************************
* Purpose: Contains all the validation functions
*****************************************************/

import { invalidDirection, invalidPlacement } from "../constants/errorMessages";
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
