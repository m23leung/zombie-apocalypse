/****************************************************
* Purpose: Contains test functions for validations 
*****************************************************/

import { expect } from 'chai';
import { isValidMove, isValidDirection } from "../../src/validations/validations";
import directions from "../../src/constants/directions";

describe("validations - Valid Moves", function() {
      // [x, xMax, y, yMax]
      let validMoves = [[4,4,1,4], [0,4,0,4],[2,4,3,4],[4,4,4,4], [1,1,1,1], [3,4,1,4]];

      validMoves.map( validMove => {
        it(`Valid Move ${validMove}`, function() {
          let isTrue = isValidMove(validMove[0], validMove[1], validMove[2], validMove[3]);
          expect(isTrue).to.be.equal(true);
        });      
      });
    });

describe("validations - Invalid Moves", function() {
       // [x, xMax, y, yMax] 
      let invalidMoves = [ [2,4,6,4], [6,4,0,4], [5,4,6,4]];  

      invalidMoves.map( invalidMove => {
        it(`Invalid Move ${invalidMove}`, function() {
          let isFalse = isValidMove(invalidMove[0], invalidMove[1], invalidMove[2], invalidMove[3]);
          expect(isFalse).to.be.equal(false);
        });      
      });
});

describe("validations - Valid Directions", function() {

    for (let direction in directions) {
      it(`Valid Direction - ${direction}`, function() {
        let isTrue = isValidDirection(direction);
        expect(isTrue).to.be.equal(true);
      });
    }
});

describe("validations - Invalid Directions", function() {
    
    let invalidDirections = ["MARS", 43232, ""];

    invalidDirections.map( direction => {
      it(`Invalid Direction ${direction}`, function() {
        let isFalse = isValidDirection(direction);
        expect(isFalse).to.be.equal(false);
      });
    });
});