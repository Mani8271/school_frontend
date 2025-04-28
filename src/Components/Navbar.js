// import React, { useState, useEffect } from "react";
// import { AppBar, Toolbar, Typography, IconButton, Tooltip, Badge, Avatar, Menu, MenuItem } from "@mui/material";
// import { Notifications } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import Chatbox from "../Pages/Chatbox"; // Import the Chatbox component

// const Navbar = ({ profileImage, userName }) => {
//   const [notificationCount, setNotificationCount] = useState(5);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openChatbot, setOpenChatbot] = useState(false);
//   const navigate = useNavigate();

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleProfileMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     // Handle the logout functionality here
//     console.log("Logged out");
//     navigate("/login"); // Redirect to the login page after logout
//   };

//   return (
//     <div className="top-0 left-0 z-10 flex items-center justify-between w-full p-4 text-white bg-black shadow-md">
//       {/* Title */}
//       <Typography variant="h6">ADMIN DASHBOARD</Typography>

//       {/* Right Side (Notifications, Profile) */}
//       <div className="flex items-center space-x-6">
//         {/* Notifications */}
//         <Tooltip title="Notifications" arrow>
//           <div
//             className="relative cursor-pointer"
//             onClick={() => navigate("/notifications")}
//           >
//             <Badge color="error" badgeContent={notificationCount} variant="dot">
//               <Notifications fontSize="large" className="text-white" />
//             </Badge>
//           </div>
//         </Tooltip>

//         {/* Profile */}
//         <div>
//           <IconButton onClick={handleProfileMenuOpen} className="cursor-pointer">
//             <Avatar
//               alt="Profile Picture"
//               src={profileImage || "https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg"}
//               sx={{ width: 40, height: 40 }}
//             />
//           </IconButton>
          
//           {/* Profile Menu */}
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleProfileMenuClose}
//           >
//             <MenuItem onClick={() => { handleProfileMenuClose(); navigate("/profile"); }}>Profile</MenuItem>
//             <MenuItem onClick={() => { handleProfileMenuClose(); handleLogout(); }}>Logout</MenuItem>
//           </Menu>
//         </div>
//       </div>

//       {/* Chatbox Component */}
//       <Chatbox open={openChatbot} onClose={() => setOpenChatbot(false)} userName={userName} />
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBranch } from "../Pages/Branches"; // 🔥 Import Branch Context
import {
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Typography,
  Select,
  FormControl,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";
import Chatbox from "../Pages/Chatbox"; // Import Chatbox component

const Navbar = ({ profileImage, userName }) => {
  const navigate = useNavigate();
  const [notificationCount] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openChatbot, setOpenChatbot] = useState(false);

  const { selectedBranch, setSelectedBranch } = useBranch(); // 🔥 Get branch state

  // Available branches
  const branches = ["Main Branch", "City Branch", "Westside Branch"];

  // Handlers
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userCredentials');
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="fixed top-0 left-[240px] w-[calc(100%-240px)] h-16 bg-gray-900 text-white shadow-lg z-50 flex items-center justify-between px-4 md:px-6 transition-all duration-300">
      {/* Left Side: Dashboard Title */}
      <Typography variant="h6" className="font-bold">
        ADMIN DASHBOARD
      </Typography>

      {/* Right Side: Branch Selector, Notifications & Profile in One Row */}
      <div className="flex items-center space-x-6">
        {/* 🔥 Branch Selection */}
        {/* <FormControl variant="outlined" size="small">
          <Select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-gray-800 text-white rounded-md"
            sx={{
              minWidth: 180,
              color: "white",
              backgroundColor: "gray.800",
              border: "1px solid white",
            }}
          >
            {branches.map((branch) => (
              <MenuItem key={branch} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        {/* Notifications */}
        <Tooltip title="Notifications" arrow>
          <IconButton onClick={() => navigate("/notifications")}>
            <Badge color="error" badgeContent={notificationCount} variant="dot">
              <Notifications fontSize="large" className="text-gray-300" />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Profile */}
        <div>
          <IconButton onClick={handleProfileMenuOpen} className="cursor-pointer">
            <Avatar
              alt="Profile Picture"
              src={
                profileImage ||
                "https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg"
              }
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>

          {/* Profile Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
            <MenuItem onClick={() => { handleProfileMenuClose(); navigate("/profile"); }}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { handleProfileMenuClose(); handleLogout(); }}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Chatbox Component */}
      <Chatbox open={openChatbot} onClose={() => setOpenChatbot(false)} userName={userName} />
    </div>
  );
};

export default Navbar;
