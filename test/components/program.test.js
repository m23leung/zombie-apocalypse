/****************************************************
* Purpose: Contains test functions for program class
*****************************************************/

import { expect } from 'chai';
import Program from "../../src/components/program";

describe("zombie - Valid test", function() {
  
      let program = new Program();

      it(`Valid - Program Set World`, function() {
        program.setWorld("5");
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