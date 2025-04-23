// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Sidebar from "./Components/Sidebar";
// import LoginPage from "./Pages/LoginPage";
// import ForgotPassword from "./Pages/ForgotPassword";
// import Dashboard from "./Pages/Dashboard";
// import Notifications from "./Pages/Notifications";
// import Settings from "./Pages/Settings";
// import Profile from "./Pages/Profile";
// import Users from "./Pages/Users";
// import Holidays from "./Pages/Holidays";
// import Fees from "./Pages/Fees";
// import Payroll from "./Pages/Payroll";
// import LeaveRequests from "./Pages/LeaveRequests";
// import Events from "./Pages/Events";
// import ViewEvents from "./Pages/ViewEvents";
// import ExamList from "./Pages/ExamList";
// import ExamResult from "./Pages/ExamResult";
// import BlogList from "./Pages/BlogList";
// import BlogView from "./Pages/BlogView";
// import ClassList from "./Pages/ClassList";
// import ClassTimeTable from "./Pages/ClassTimeTable";
// import SectionList from "./Pages/SectionList";
// import TeachingStaff from "./Pages/TeachingStaff";
// import NonTeachingStaff from "./Pages/NonTeachingStaff";
// import TeacherTimetable from "./Pages/TeachersTimetable";
// import DailyStaffAttendance from "./Pages/DailyStaffAttendance";
// import MonthlyStaffAttendance from "./Pages/MonthlyStaffAttendance";
// import StudentsList from "./Pages/StudentsList";
// import StudentBusAssign from "./Pages/StudentBusAssign";
// import MonthlyStudentAttendance from "./Pages/StudentAttendance";
// import BusRoutes from "./Pages/BusRoutes";
// import BusList from "./Pages/BusList";
// import BusStaff from "./Pages/BusStaff";
// import Approval from "./Pages/Approval"
// import UserModification from "./Pages/UserModification";
// import ManageUserRoles from "./Pages/ManageUserRoles";
// import RegistrationPage from "./Pages/RegistrationPage";

// function ProtectedLayout({ user }) {
//   if (!user) return <Navigate to="/login" />;

//   return (
//     <div className="flex overflow-hidden">
//       {/* Sidebar (Fixed) */}
//       <div className="w-64 fixed left-0 top-0 h-full bg-gray-900 shadow-lg">
//         <Sidebar />
//       </div>

//       {/* Main Content (Push Right After Sidebar) */}
//       <div className="flex-1 flex flex-col bg-gray-100 ml-64">
//         {/* Navbar (Fixed at the Top, Doesn't Extend into Sidebar) */}
//         <div className=" top-0 left-0 right-0 w-auto z-50 bg-gray-900 text-white shadow-md">
//           <Navbar />
//         </div>

//         {/* Page Content (Scrollable) */}
//         <div className="p-6 pt-20 h-screen w-full">
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard userName={user.name} />}/>
//             <Route path="/notifications" element={<Notifications />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/users" element={<Users />} />
//             <Route path="/holidays" element={<Holidays />} />
//             <Route path="/fees" element={<Fees />} />
//             <Route path="/payroll" element={<Payroll />} />
//             <Route path="/leave-requests" element={<LeaveRequests />} />
//             <Route path="/events/view-events" element={<ViewEvents />} />
//             <Route path="/events/view-calendar" element={<Events />} />
//             <Route path="/exams/examlists" element={<ExamList />} />
//             <Route path="/exams/examresults" element={<ExamResult />} />
//             <Route path="/blogs/bloglist" element={<BlogList />} />
//             <Route path="/blogs/blogview" element={<BlogView />} />
//             <Route path="/classes/info" element={<ClassList />} />
//             <Route path="/classes/timetable" element={<ClassTimeTable />} />
//             <Route path="/classes/sections" element={<SectionList />} />
//             <Route path="/staff/teaching-staff" element={<TeachingStaff />} />
//             <Route path="/staff/non-teaching-staff"element={<NonTeachingStaff />}/>
//             <Route path="/staff/teacher-timetable" element={<TeacherTimetable />} />
//             <Route path="/staff/daily-attendance" element={<DailyStaffAttendance />}/>
//             <Route  path="/staff/monthly-attendance"  element={<MonthlyStaffAttendance />}/>
//             <Route path="/staff/leave-requests" element={<LeaveRequests />}/>
//             <Route path="/students/Students List" element={<StudentsList />} />
//             <Route  path="/students/Student Attendance" element={<MonthlyStudentAttendance />} />
//             <Route path="/students/Student School Bus" element={<StudentBusAssign />}/>
//             <Route path="/School Bus/Bus List" element={<BusList />} />
//             <Route path="/School Bus/Bus Route" element={<BusRoutes />} />
//             <Route path="/School Bus/Bus Staff" element={<BusStaff />} />
//             <Route path="/User-Management/Approval" element={<Approval />} />
//             <Route path="/User-Management/user-modification" element={<UserModification />} />
//             <Route path="/User-Management/manage-user-roles" element={<ManageUserRoles />} />
//             <Route path="*" element={   <div className="text-center text-red-500 font-semibold"> Page Not Found </div> } />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [user, setUser] = useState(null); // Store the logged-in user state

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<LoginPage setUser={setUser} />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/register" element={<RegistrationPage/>}/>

//         {/* Protected Routes */}
//         <Route path="/*" element={<ProtectedLayout user={user} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { BranchProvider } from "./Pages/Branches"; // 🔥 Import Branch Context
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import LoginPage from "./Pages/LoginPage";
import ForgotPassword from "./Pages/ForgotPassword";
import Dashboard from "./Pages/Dashboard";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import Users from "./Pages/Users";
// import Holidays from "./Pages/Holidays";
import Fees from "./Pages/Fees";
import Payroll from "./Pages/Payroll";
import LeaveRequests from "./Pages/LeaveRequests";
import LeaveRequestsNT from "./Pages/LeaveRequestsNT";
import Holiday from "./Pages/Holiday";
import Events from "./Pages/Events";
import ExamList from "./Pages/ExamList";
import ExamResult from "./Pages/ExamResult";
import BlogList from "./Pages/BlogList";
import BlogView from "./Pages/BlogView";
import ClassList from "./Pages/ClassList";
import ClassTimeTable from "./Pages/ClassTimeTable";
import SectionList from "./Pages/SectionList";
import TeachingStaff from "./Pages/TeachingStaff";
import NonTeachingStaff from "./Pages/NonTeachingStaff";
import TeacherTimetable from "./Pages/TeachersTimetable";
import DailyStaffAttendance from "./Pages/DailyStaffAttendance";
import DailyStaffAttendanceNT from "./Pages/DailyStaffAttendanceNT";
import MonthlyStaffAttendance from "./Pages/MonthlyStaffAttendance";
import MonthlyStaffAttendanceNT from "./Pages/MonthlyStaffAttendanceNT";
import StudentsList from "./Pages/StudentsList";
import StudentBusAssign from "./Pages/StudentBusAssign";
import MonthlyStudentAttendance from "./Pages/StudentAttendance";
import BusRoutes from "./Pages/BusRoutes";
import BusList from "./Pages/BusList";
import BusStaff from "./Pages/BusStaff";
import Approval from "./Pages/Approval";
import UserModification from "./Pages/UserModification";
import ManageUserRoles from "./Pages/ManageUserRoles";
import RegistrationPage from "./Pages/RegistrationPage";
import NoticeBoard from "./Pages/NoticeBoard";

function ProtectedLayout({ user }) {
  if (!user) return <Navigate to="/login" />;

  return (
    <BranchProvider> {/* 🔥 Wrap entire layout with BranchProvider */}
      <div className="flex overflow-hidden">
        
        {/* Sidebar (Fixed) */}
        <div className="w-60 min-h-screen bg-gray-900 shadow-lg">
          <Sidebar />
        </div>

        {/* Main Content (Push Right After Sidebar) */}
        <div className="flex-1 flex flex-col bg-gray-100 min-w-0">
          {/* Navbar (Fixed at the Top, Doesn't Extend into Sidebar) */}
          <div className="fixed top-0 left-60 right-0 z-50 bg-gray-900 text-white shadow-md">
            <Navbar />
          </div>

          {/* Page Content (Scrollable) */}
          <div className="p-6 pt-20 h-screen w-full overflow-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard userName={user.name} />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users" element={<Users />} />
              {/* <Route path="/holidays" element={<Holidays />} /> */}
              <Route path="/fees" element={<Fees />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/noticeboard" element={<NoticeBoard />} />
              <Route path="/leave-requests" element={<LeaveRequests />} />
              <Route path="/Events" element={<Events />} />
              <Route path="/Holiday" element={<Holiday />} />
              <Route path="/exams/examlists" element={<ExamList />} />
              <Route path="/exams/examresults" element={<ExamResult />} />
              <Route path="/blogs/bloglist" element={<BlogList />} />
              <Route path="/blogs/blogview" element={<BlogView />} />
              <Route path="/classes/info" element={<ClassList />} />
              <Route path="/classes/timetable" element={<ClassTimeTable />} />
              <Route path="/classes/sections" element={<SectionList />} />
              <Route path="/staff/teaching-staff" element={<TeachingStaff />} />
              <Route path="/staff/non-teaching-staff" element={<NonTeachingStaff />} />
              <Route path="/teacher-timetable" element={<TeacherTimetable />} />
              <Route path="/daily-attendance" element={<DailyStaffAttendance />} />
              <Route path="/daily-attendanceNT" element={<DailyStaffAttendanceNT />} />
              <Route path="/monthly-attendance" element={<MonthlyStaffAttendance />} />
              <Route path="/monthly-attendanceNT" element={<MonthlyStaffAttendanceNT />} />
              <Route path="/leave-requests" element={<LeaveRequests />} />
              <Route path="/leave-requestsNT" element={<LeaveRequestsNT />} />
              <Route path="/students-list" element={<StudentsList />} />
              <Route path="/students/student-attendance" element={<MonthlyStudentAttendance />} />
              <Route path="/students/student-school-bus" element={<StudentBusAssign />} />
              <Route path="/school/bus-list" element={<BusList />} />
              <Route path="/school/bus-route" element={<BusRoutes />} />
              <Route path="/school/bus-staff" element={<BusStaff />} />
              <Route path="/User-Management/Approval" element={<Approval />} />
              <Route path="/User-Management/user-modification" element={<UserModification />} />
              <Route path="/User-Management/manage-user-roles" element={<ManageUserRoles />} />
              {/* <Route path="*" element={<div className="text-center text-red-500 font-semibold"> Page Not Found </div>} /> */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BranchProvider>
  );
}

const NotFoundPage = () => (
  <div className="flex justify-center items-center h-full text-red-500 font-semibold text-xl">
    404 - Page Not Found
  </div>
);

function App() {
  const [user, setUser] = useState(null); // Store the logged-in user state

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Protected Routes */}
        <Route path="/*" element={<ProtectedLayout user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
