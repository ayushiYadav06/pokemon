import { Reducer } from "./Reducer";
import logger from "redux-logger";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";  

const rootReducer = combineReducers({ pokemon: Reducer });
const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),
});

export default Store;
