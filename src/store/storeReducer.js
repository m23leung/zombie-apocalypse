/****************************************************
* Purpose: Contains reducer for Redux store
*****************************************************/

import { createSlice } from '@reduxjs/toolkit';
import commandList from '../constants/commandList';
import Place from "../commands/place"

/**
* Creates the reducer to be used by store. Forms links to the commands
*/    
const slice = createSlice({
    name: 'state',
    initialState: {},
    reducers: {
        /*
        moveUnit: (state, action) => {  
           let moveItem =  new Move(state, action, 1);
           moveItem.execute();
        }, */
        placeUnit: (state, action) => {  
            let placeItem =  new Place(state, action);
            placeItem.execute();
         }
    }
})

export const {placeUnit} = slice.actions;
export default slice.reducer;

// Selector - Takes state and returns computed state
export const getDirection = state => {
    return state.direction;
}