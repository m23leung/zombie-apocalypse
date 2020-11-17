/****************************************************
* Purpose: Contains the Redux store
*****************************************************/

import { configureStore } from '@reduxjs/toolkit';
import reducer from './storeReducer';

// Note: Can add multiple reducers in future
export default function () {
    return configureStore({ reducer });
};

