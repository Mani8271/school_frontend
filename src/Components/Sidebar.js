

import React from "react";
import { useBranch } from "../Pages/Branches"; // 🔥 Import Branch Context
import SidebarLink from "./SidebarLink";
import SidebarDropdown from "./SidebarDropdown";
import { useState } from "react";

import {
  School,             //classes
  People,             //students
  Person,             //staff
  Assignment,         //exam 
  EventNote,          //Notice Board
  DirectionsBus,      //school bus
  Payment,            //fees
  CurrencyRupee,      // Payroll (Rupees Icon)
  Today,              // Holiday
  Event,              //events
  Article,            //blogs
  Settings, 
  Dashboard,
} from "@mui/icons-material";

const Sidebar = () => {
  const { selectedBranch } = useBranch();
  const [openSections, setOpenSections] = React.useState({
    classes: false,
    students: false,
    teachers: false,
    attendance: false,
    tests: false,
    schoolBus: false,
    fees: false,
    blogs: false,
    events: false,
    holidays: false,
    users: false,
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = (section) => {
    setOpenSections((prev) => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === section ? !prev[section] : false;
        return acc;
      }, {});
      return newState;
    });
  };

  const userCredentials = JSON.parse(localStorage.getItem("user"));
  const role = userCredentials?.role;

  const isSuperAdmin = role === "Super Admin";
  const isBusAdmin = role === "Bus Admin";

  return (
    <div className="flex">
      <div className={`fixed top-0 left-0 p-4 w-60 h-screen bg-gray-900 text-white shadow-lg z-50 overflow-y-auto transform ${isOpen ? "translate-x-0" : "-translate-x-60"} transition-transform md:translate-x-0`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white md:hidden">✖</button>

        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <img src="https://thumbs.dreamstime.com/b/creative-letter-vk-logo-..." alt="Logo" className="h-16 w-16 rounded-full" />
          <div className="ml-3">
            <h2 className="text-lg font-semibold">VK</h2>
            <h3 className="text-sm text-gray-400">International</h3>
          </div>
        </div>

        <nav className="space-y-4">
          <SidebarLink to="/dashboard" icon={<Dashboard />} label="Dashboard" />

          {/* Super Admin Only Sections */}
          {isSuperAdmin && (
            <>
              <SidebarDropdown label="Classes" icon={<School />} isOpen={openSections.classes} toggle={() => toggleSection("classes")} links={[
                { to: "/classes/info", label: "Classes Information" },
                { to: "/classes/timetable", label: "Class Time-table" },
                { to: "/classes/sections", label: "Class Sections" },
              ]} />

              <SidebarLink to="/students-list" icon={<People />} label="Students" />

              <SidebarDropdown label="Staff" icon={<Person />} isOpen={openSections.teachers} toggle={() => toggleSection("teachers")} links={[
                { to: "/Staff/teaching-staff", label: "Teaching Staff" },
                { to: "/Staff/non-teaching-staff", label: "Non Teaching Staff" },
              ]} />

              <SidebarLink to="/fees" icon={<Payment />} label="Fees" />
              <SidebarLink to="/payroll" icon={<CurrencyRupee />} label="Payroll" />
              <SidebarLink to="/Holiday" icon={<Today />} label="Holiday" />
              <SidebarLink to="/blogs" icon={<Article />} label="Blogs" />
            </>
          )}

          {/* Bus Admin Accessible Sections */}
          {(isBusAdmin || isSuperAdmin) && (
            <>
              <SidebarLink to="/noticeboard" icon={<EventNote />} label="Notice Board" />
              <SidebarDropdown label="School Bus" icon={<DirectionsBus />} isOpen={openSections.schoolBus} toggle={() => toggleSection("schoolBus")} links={[
                { to: "/school/bus-list", label: "Bus List" },
                { to: "/school/bus-route", label: "Bus Route" },
                { to: "/school/bus-staff", label: "Bus Staff" },
              ]} />
              <SidebarLink to="/settings" icon={<Settings />} label="Settings" />
              <SidebarLink to="/profile" icon={<Person />} label="Profile" />
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
