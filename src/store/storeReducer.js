/****************************************************
* Purpose: Contains reducer for Redux store
*****************************************************/

import { createSlice } from '@reduxjs/toolkit';
//import commandList from '../constants/directions';
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

           while (state.zombiesToProcess.length > 0) {
             let zombieToProcess = state.zombiesToProcess.pop();
             let moveItem =  new Move(state, action, 1, action.payload.commands, zombieToProcess);
              moveItem.execute();                          
            }

           // Report the final positions
           console.log("");
           console.log(`zombies' positions:`);
           if (state.zombies.length < 1) 
             console.log(`none`);
           else {
             let output = ``;

             for (let i=0 ; i < state.zombies.length; i++) {
                output += `(${state.zombies[i].x},${state.zombies[i].y})`;
             }
             console.log(output);
           }

           console.log(`creatures' positions:`);
           if (state.creatures.length < 1) 
            console.log(`none`);
           else {
            for (let i=0; i < state.creatures.length; i++) {
                console.log(`(${state.creatures[i].x},${state.creatures[i].y})`);
           }
           
        }
        
        }, 
        placeZombie: (state, action) => {  
            let placeItem =  new Place(state, action, "zombie");
            placeItem.execute();
         },
         placeCreature: (state, action) => {
            //let placeItem =  new Place(state, action, "creature");
            //placeItem.execute();
            state.creatures.push(action.payload);            
         }
    }
})

export const {placeZombie, placeCreature, moveZombie } = slice.actions;
export default slice.reducer;

// Selector - Takes state and returns computed state
export const getDirection = state => {
    return state.direction;
}