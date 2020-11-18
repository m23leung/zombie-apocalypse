/****************************************************
* Purpose: Contains test functions for world class
*****************************************************/

import { expect } from 'chai';
import World from "../../src/components/world";

describe("world - Valid World", function() {
  
      let worldDimensionsList = [ 
                                    {'worldWidth': 5, 'worldLength': 5},
                                    {'worldWidth': 10, 'worldLength': 10},
                                ];

      worldDimensionsList.map( worldDimensions => {
        it(`Create World - ${worldDimensions.worldWidth}x${worldDimensions.worldLength}`, function() {
          let world = new World(worldDimensions.worldWidth, worldDimensions.worldLength);

          expect(world.getMaxX()).to.be.equal(worldDimensions.worldWidth - 1);
          expect(world.getMaxY()).to.be.equal(worldDimensions.worldLength - 1);

        });      
      });

});