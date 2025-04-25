import { combineReducers } from "redux";
import emailLoginReducer from "./loginAndSignup/emailLoginReducer";
import registerReducer from "./loginAndSignup/registerReducer";
import forgotPasswordReducer from "./loginAndSignup/forgotPasswordReducer";




const rootReducer = combineReducers({
  // login and signup flow ...
  emaillogindata: emailLoginReducer,
  registerdata: registerReducer,
  forgotPasswordData: forgotPasswordReducer,
 
  
  
});
export default rootReducer;