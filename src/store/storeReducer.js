/****************************************************
* Purpose: Contains reducer for Redux store
*****************************************************/
import { createSlice } from '@reduxjs/toolkit';
import { printUnitPositions } from "./printHelper";
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
        }, 
         placeZombie: (state, action) => {  
            let placeItem =  new Place(state, action, units.ZOMBIE);
            placeItem.execute();
         },
         placeCreature: (state, action) => {
            let placeItem =  new Place(state, action, units.CREATURE);
            placeItem.execute();          
         },
         printFinalPositions: (state, action) => {
           printUnitPositions(state);
         }
    }
})

export const { placeZombie, placeCreature, moveZombie, printFinalPositions } = slice.actions;
export default slice.reducer;