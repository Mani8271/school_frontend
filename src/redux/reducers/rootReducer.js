import { combineReducers } from "redux";
import registerReducer from "./loginandsignup/registerReducer";
import forgotPasswordReducer from "./loginandsignup/forgotPasswordReducer";
import LoginwithemailReducer from "./loginandsignup/LoginwithemailReducer";
import AddstudentReducer from "./students/addstudentReducer";
import GetuserprofileReducer from "./userprofile/getuserprofileReducer";





const rootReducer = combineReducers({
  // login and signup flow ...
  emaillogindata: LoginwithemailReducer,
  registerdata: registerReducer,
  forgotPasswordData: forgotPasswordReducer,
  //  students
  addstudent: AddstudentReducer,
  // user profile
  userdetails: GetuserprofileReducer

});
export default rootReducer;