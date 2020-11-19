/****************************************************
* Purpose: Contains test functions for move
*****************************************************/

import { expect } from 'chai';
import Program from "../../src/components/program";
import Move from "../../src/commands/move"
import configureStore from '../../src/store/store';

describe("Move Command", function() {

    const store = configureStore();

    //getNewPosition(steps, direction, x, y, xMax, yMax)
    it(`Testing helper function - getNewPosition`, function() {
        let action = { type: 'state/moveZombie', payload: { commands: [ 'R', 'R' ] }};
        let zombieToProcess = { 'x': 0, 'xMax': 9, 'yMax': 0, 'y': 9, 'id': 0};
        let moveItem =  new Move(store.getState(), action, 1, action.payload.commands, zombieToProcess);
        
        // Move right from (0,0) to (1,0)
        let newPosition = moveItem.getNewPosition(1, 'R', 0,0, 9,9);
        expect(newPosition.x).to.equal(1);
        expect(newPosition.y).to.equal(0);

        // Move down from (0,0) to (0,1)
        newPosition = moveItem.getNewPosition(1, 'D', 0,0, 9,9);
        expect(newPosition.x).to.equal(0);
        expect(newPosition.y).to.equal(1);

        // Move left from (3,3) to (2,3)
        newPosition = moveItem.getNewPosition(1, 'L', 3,3, 9,9);
        expect(newPosition.x).to.equal(2);
        expect(newPosition.y).to.equal(3);

        // Move up from (3,3) to (3,2)
        newPosition = moveItem.getNewPosition(1, 'U', 3,3, 9,9);
        expect(newPosition.x).to.equal(3);
        expect(newPosition.y).to.equal(2);

        // Move down from (9,9) to (9,0)
        newPosition = moveItem.getNewPosition(1, 'D', 9,9, 9,9);
        expect(newPosition.x).to.equal(9);
        expect(newPosition.y).to.equal(0);

        // Move left from (0,0) to (9,0)
        newPosition = moveItem.getNewPosition(1, 'L', 0,0, 9,9);
        expect(newPosition.x).to.equal(9);
        expect(newPosition.y).to.equal(0);

        // Move up from (0,0) to (0,9)
        newPosition = moveItem.getNewPosition(1, 'U', 0,0, 9,9);
        expect(newPosition.x).to.equal(0);
        expect(newPosition.y).to.equal(9);
      });

  });
  