import { combineReducers } from "redux";
import registerReducer from "./loginandsignup/registerReducer";
import forgotPasswordReducer from "./loginandsignup/forgotPasswordReducer";
import LoginwithemailReducer from "./loginandsignup/LoginwithemailReducer";
import AddstudentReducer from "./students/addstudentReducer";
import GetuserprofileReducer from "./userprofile/getuserprofileReducer";
import UpdateuserprofileReducer from "./userprofile/updateuserprofileReducer";
import AddClassReducer from "./class/addClassReducer";
import GetAllClassesReducer from "./class/getAllClassesReducer";
import GetAllStudentsReducer from "./students/getstudentsReducer";
import UpdatestudentReducer from "./students/updatestudentReducer";
import DeletestudentReducer from "./students/deletestudentReducer";
import AddClassTimetableReducer from "./class/addClassTimetableReducer";
import GetClassTimetableReducer from "./class/getClassTimetableReducer";
import AddteachingstaffReducer from "./staff/teachingstaff/addteachingstaffReducer";
import GetAllTeachersReducer from "./staff/teachingstaff/getteachingstaffReducer";
import UpdateteacherReducer from "./staff/teachingstaff/updateteachingstaffReducer";
import DeleteteacherReducer from "./staff/teachingstaff/deleteteachingstaffReducer";
import AddHolidayReducer from "./holiday/addHolidayReducer";






const rootReducer = combineReducers({
  // login and signup flow ...
  emaillogindata: LoginwithemailReducer,
  registerdata: registerReducer,
  forgotPasswordData: forgotPasswordReducer,
  //  students
  addstudent: AddstudentReducer,
  getallstudents: GetAllStudentsReducer,
  updatestudent: UpdatestudentReducer,
  deletestudent: DeletestudentReducer,
  // teaching staff
  addteacher: AddteachingstaffReducer,
  getallteachers: GetAllTeachersReducer,
  updateteacher: UpdateteacherReducer,
  deletestudent: DeleteteacherReducer,
  // user profile
  userdetails: GetuserprofileReducer,
  updateduserdetails: UpdateuserprofileReducer,
  //class
  addclass: AddClassReducer,
  getclasses: GetAllClassesReducer,
  addtimetable: AddClassTimetableReducer,
  getclasstimetable: GetClassTimetableReducer,

  //holiday
  addholiday: AddHolidayReducer,

});
export default rootReducer;