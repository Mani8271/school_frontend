import { combineReducers } from "redux";
import registerReducer from "./loginandsignup/registerReducer";
import forgotPasswordReducer from "./loginandsignup/forgotPasswordReducer";
import LoginwithemailReducer from "./loginandsignup/LoginwithemailReducer";
import AddstudentReducer from "./students/addstudentReducer";
import GetuserprofileReducer from "./userprofile/getuserprofileReducer";
import UpdateuserprofileReducer from "./userprofile/updateuserprofileReducer";
import AddClassReducer from "./class/addClassReducer";
import GetAllClassesReducer from "./class/getAllClassesReducer";





const rootReducer = combineReducers({
  // login and signup flow ...
  emaillogindata: LoginwithemailReducer,
  registerdata: registerReducer,
  forgotPasswordData: forgotPasswordReducer,
  //  students
  addstudent: AddstudentReducer,
  // user profile
  userdetails: GetuserprofileReducer,
  updateduserdetails: UpdateuserprofileReducer,
  //class
  addclass: AddClassReducer,
  getclasses: GetAllClassesReducer

});
export default rootReducer;