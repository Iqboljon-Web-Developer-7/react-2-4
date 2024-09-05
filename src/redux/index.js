import { combineReducers, legacy_createStore } from "redux";
import userToken from "./userToken";
import refreshProducts from "./refreshProducts";
import userId from "./userId";

const reducers = combineReducers({
  userToken,
  refreshProducts,
  userId,
});

export const store = legacy_createStore(reducers);
