import { combineReducers } from "redux";
import emailLoginReducer from "./loginandsignup/emailLoginReducer";



const rootReducer = combineReducers({
  // login and signup flow ...
  emaillogindata: emailLoginReducer,
 
  
  
});
export default rootReducer;