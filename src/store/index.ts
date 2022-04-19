import { combineReducers, createStore } from "redux";
import * as reducers from "./reducers";

const Store = createStore(combineReducers({ ...reducers }));

export default Store;
