import { combineReducers } from "redux";
import emailLoginReducer from "./loginAndSignup/emailLoginReducer";
import registerReducer from "./loginAndSignup/emailLoginReducer";




const rootReducer = combineReducers({
  // login and signup flow ...
  emaillogindata: emailLoginReducer,
  registerdata: registerReducer,
 
  
  
});
export default rootReducer;