/****************************************************
* Purpose: Contains test functions for zombie class
*****************************************************/

import { expect } from 'chai';
import Zombie from "../../src/components/zombie";
import { setWorld } from "../../src/actions/actionHelper";

describe("zombie - Valid test", function() {
  
      let zombie = new Zombie();

      it(`Valid - Zombie Set World`, function() {
        setWorld("5", zombie);
        expect(zombie.getWorld().getMaxX()).to.be.equal(4);
        expect(zombie.getWorld().getMaxY()).to.be.equal(4);
      })

      it(`Valid - Zombie Set Store`, function() {
        expect(zombie.getStore().getState().creatures.length).to.equal(0);
        expect(zombie.getStore().getState().creatureCount).to.equal(0);
        expect(zombie.getStore().getState().zombies.length).to.equal(0);
        expect(zombie.getStore().getState().zombiesToProcess.length).to.equal(0);
        expect(zombie.getStore().getState().zombieCount).to.equal(0);
      })
         
});