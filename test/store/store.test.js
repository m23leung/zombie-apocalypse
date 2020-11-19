/****************************************************
* Purpose: Contains test functions for reducer store
*****************************************************/

import { expect } from 'chai';
import configureStore from '../../src/store/store';
import { placeZombie, placeCreature, moveZombie } from '../../src/store/storeReducer';
import directions from "../../src/constants/directions";

// Testing here includes for both files store & storeReducer
describe("Redux store test", function() {

    const store = configureStore();

    it(`Check initial state of Redux store`, function() {
        expect(store.getState().creatures.length).to.equal(0);
        expect(store.getState().creatureCount).to.equal(0);
        expect(store.getState().zombies.length).to.equal(0);
        expect(store.getState().zombiesToProcess.length).to.equal(0);
        expect(store.getState().zombieCount).to.equal(0);
    });   
     
    it(`Testing command - placeZombie`, function() {

        // Modify the state
        store.dispatch(placeZombie(
          { 'x': 1, 
            'y': 2, 
            'xMax': 4, 
            'yMax': 4
          }));

          // (x,y) = (1,2)
          expect(store.getState().zombiesToProcess[0].x).equal(1);
          expect(store.getState().zombiesToProcess[0].y).equal(2);   

        // Modify the state
        store.dispatch(placeZombie(
          { 'x': 3, 
            'y': 4, 
            'xMax': 4, 
            'yMax': 4
            }));

          // (x,y) = (3,4)
          expect(store.getState().zombiesToProcess[1].x).equal(3);
          expect(store.getState().zombiesToProcess[1].y).equal(4);      
      });

      it(`Testing command - placeCreature`, function() {

        // Modify the state
        store.dispatch(placeCreature(
          { 'x': 0, 
            'y': 0, 
            'xMax': 4, 
            'yMax': 4
          }));

          // (x,y) = (0,0)
          expect(store.getState().creatures[0].x).equal(0);
          expect(store.getState().creatures[0].y).equal(0);   

        // Modify the state
        store.dispatch(placeCreature(
          { 'x': 0, 
            'y': 1, 
            'xMax': 4, 
            'yMax': 4
          }));

          // (x,y) = (0,1)
          expect(store.getState().creatures[1].x).equal(0);
          expect(store.getState().creatures[1].y).equal(1);     
      });

    it(`Testing command - moveZombie`, function() {

        // Move unit above      
        const input = 'RR';
        const commands = input.split('');          
        store.dispatch(moveZombie({ 'commands': commands }));
        expect(store.getState().zombies[0].x).equal(0);
        expect(store.getState().zombies[0].y).equal(4);
        expect(store.getState().zombies[1].x).equal(3);
        expect(store.getState().zombies[1].y).equal(2);  
    });

  });
  