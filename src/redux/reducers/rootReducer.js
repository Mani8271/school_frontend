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

import AddnonteachingstaffReducer from "./staff/nonteachingstaff/addnonteachingstaffReducer";
import GetAllnonTeachersReducer from "./staff/nonteachingstaff/getnonteachingstaffReducer";
import UpdatenonteacherReducer from "./staff/nonteachingstaff/updatenonteachingstaffReducer";
import DeletenonteacherReducer from "./staff/nonteachingstaff/nonteachingstaffdeleteReducer";
import AddbuslistReducer from "./schoolbus/buslist/addbuslistReducer";
import DeletebuslistReducer from "./schoolbus/buslist/deletebuslistReducer";
import GetAllBuslistReducer from "./schoolbus/buslist/getallbuslistReducer";
import UpdatebuslistReducer from "./schoolbus/buslist/updatebuslistReducer";
import AddbusrouteReducer from "./schoolbus/busroute/addbusrouteReducer";
import DeletebusrouteReducer from "./schoolbus/busroute/deletebusrouteReducer";
import GetAllBusrouteReducer from "./schoolbus/busroute/getallbusrouteReducer";
import UpdatebusrouteReducer from "./schoolbus/busroute/updatebusrouteReducer";
import AddbusstaffReducer from "./schoolbus/busstaff/addbusstaffReducer";
import DeletebusstaffReducer from "./schoolbus/busstaff/deletebusstaffReducer";
import GetAllBusstaffReducer from "./schoolbus/busstaff/getallbusstaffReducer";
import UpdatebusstaffReducer from "./schoolbus/busstaff/updatebusstaffReducer";

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
  deleteteacher: DeleteteacherReducer,
  // non teaching staff
  addnonteacher: AddnonteachingstaffReducer,
  getallnonteachers: GetAllnonTeachersReducer,
  updatenonteacher: UpdatenonteacherReducer,
  deletenonteacher: DeletenonteacherReducer,
  // bus list
  addbuslist: AddbuslistReducer,
  updatebuslist: UpdatebuslistReducer,
  getallbuslist: GetAllBuslistReducer,
  deletebuslist: DeletebuslistReducer,
  // bus route
  addbusroute: AddbusrouteReducer,
  updatebusroute: UpdatebusrouteReducer,
  getallbusroute: GetAllBusrouteReducer,
  deletebusroute: DeletebusrouteReducer,
  // bus staff
  addbusstaff: AddbusstaffReducer,
  updatebusstaff: DeletebusstaffReducer,
  getallbusstaff: GetAllBusstaffReducer,
  deletebusstaff: UpdatebusstaffReducer,
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