// import React from "react";
// import { Link } from "react-router-dom";

// const SidebarLink = ({ to, icon, label }) => (
//   <div className="mb-4">
//     <Link
//       to={to}
//       className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700"
//     >
//       {icon && <span className="mr-3">{icon}</span>}
//       <span className="text-lg">{label}</span>
//     </Link>
//   </div>
// );

// export default SidebarLink;

import { NavLink, useLocation } from "react-router-dom";

const SidebarLink = ({ to, icon, label }) => {
  const location = useLocation();

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-md transition ${
          isActive || location.pathname.startsWith(to) ? "bg-blue-950 text-white" : "hover:bg-gray-700"
        }`
      }
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </NavLink>
  );
};

export default SidebarLink;

