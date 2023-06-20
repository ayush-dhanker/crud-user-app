import { combineReducers } from "redux";
import userDetails from "./UserData/reducer";

const rootReducer = combineReducers({
  userDetails,
});

export default rootReducer;
