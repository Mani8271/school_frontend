// import React, { useState } from "react";
// import { Collapse } from "@mui/material";
// import SidebarLink from "./SidebarLink";

// const SidebarDropdown = ({ label, icon, isOpen, toggle, links }) => {
//   return (
//     <div className="mb-4">
//       <button
//         className="flex items-center p-2 w-full text-white rounded-lg hover:bg-gray-700"
//         onClick={toggle}
//       >
//         {icon && <span className="mr-3">{icon}</span>}
//         <span className="text-lg">{label}</span>
//       </button>
//       <Collapse in={isOpen}>
//         <div className="ml-6">
//           {links.map((link, index) => (
//             <SidebarLink key={index} to={link.to} label={link.label} />
//           ))}
//         </div>
//       </Collapse>
//     </div>
//   );
// };

// export default SidebarDropdown;

import { NavLink, useLocation } from "react-router-dom";

const SidebarDropdown = ({ label, icon, links, isOpen, toggle }) => {
  const location = useLocation();

  // Check if any child link matches the current path
  const isParentActive = links.some((link) => location.pathname.startsWith(link.to));

  return (
    <div className="space-y-2">
      <button
        onClick={toggle}
        className={`w-full flex items-center px-4 py-2 rounded-md transition ${
          isParentActive ? "bg-blue-950 text-white" : "hover:bg-gray-700"
        }`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        <span className={`ml-auto transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </button>

      {/* Dropdown Links with Smooth Transition */}
      <div className={`pl-6 space-y-2 transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition ${
                isActive ? "bg-blue-950 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarDropdown;
