/****************************************************
* Purpose: Contains reducer for Redux store
*****************************************************/

import { createSlice } from '@reduxjs/toolkit';
import units from "../constants/units";
import Place from "../commands/place"
import Move from "../commands/move";

/**
* Creates the reducer to be used by store. Forms links to the commands
*/    
const slice = createSlice({
    name: 'state',
    initialState: {
                    creatures: [],
                    zombies: [],
                    zombieCount: 0,
                    zombiesToProcess: []
                  },
    reducers: {
        
        moveZombie: (state, action) => {  

          // While there are zombies to process move commands, pop them off zombiesToProcess stack and
          // initiate identical sequence of move commands
           while (state.zombiesToProcess.length > 0) {
             let zombieToProcess = state.zombiesToProcess.pop();
             let moveItem =  new Move(state, action, 1, action.payload.commands, zombieToProcess);
              moveItem.execute();                          
            }
            
            // Once processed all zombies moves, print program output
           printOutput(state);
        }, 
         placeZombie: (state, action) => {  
            let placeItem =  new Place(state, action, units.ZOMBIE);
            placeItem.execute();
         },
         placeCreature: (state, action) => {
            let placeItem =  new Place(state, action, units.CREATURE);
            placeItem.execute();          
         }
    }
})

export const { placeZombie, placeCreature, moveZombie } = slice.actions;
export default slice.reducer;

/**
*  Prints program output
**/  
export const printOutput = (state) => {
  console.log("--------------------------");
  console.log(`zombies' positions:`);
  printPositions(state.zombies);
  console.log(`creatures' positions:`);
  printPositions(state.creatures);
  console.log("--------------------------");
}

/**
*  Prints unit positions out. Helper function
**/    
export const printPositions = (unitList) => {
  let output = '';

  if (unitList.length < 1) {
    output = 'none';
  } else {
    for (let i=0; i < unitList.length; i++) {
      output += `(${unitList[i].x},${unitList[i].y})`;
    }
  }
  console.log(output);
}