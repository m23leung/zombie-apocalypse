/****************************************************
* Purpose: Contains test functions for program class
*****************************************************/

import { expect } from 'chai';
import Program from "../../src/components/program";
import { setWorld } from "../../src/actions/actionHelper";

describe("zombie - Valid test", function() {
  
      let program = new Program();

      it(`Valid - Program Set World`, function() {
        setWorld("5", program);
        expect(program.getWorld().getMaxX()).to.be.equal(4);
        expect(program.getWorld().getMaxY()).to.be.equal(4);
      })

      it(`Valid - Program Set Store`, function() {
        expect(program.getStore().getState().creatures.length).to.equal(0);
        expect(program.getStore().getState().creatureCount).to.equal(0);
        expect(program.getStore().getState().zombies.length).to.equal(0);
        expect(program.getStore().getState().zombiesToProcess.length).to.equal(0);
        expect(program.getStore().getState().zombieCount).to.equal(0);
      })
         
});