/****************************************************
* Purpose: Contains test functions for world class
*****************************************************/

import { expect } from 'chai';
import World from "../../src/components/world";

describe("world - Valid World", function() {
  
      let tableDimensionsList = [ 
                                    {'tableWidth': 5, 'tableLength': 5},
                                    {'tableWidth': 10, 'tableLength': 10},
                                ];

      tableDimensionsList.map( tableDimensions => {
        it(`Create World - ${tableDimensions.tableWidth}x${tableDimensions.tableLength}`, function() {
          let table = new World(tableDimensions.tableWidth, tableDimensions.tableLength);

          expect(table.getMaxX()).to.be.equal(tableDimensions.tableWidth - 1);
          expect(table.getMaxY()).to.be.equal(tableDimensions.tableLength - 1);

        });      
      });

});