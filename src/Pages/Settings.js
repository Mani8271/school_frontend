import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const Settings = () => {
  return (
    <div className="p-4 sm:p-6 flex justify-center items-center min-h-screen">
      {/* Title Section */}
      <Box className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <Typography variant="h5" className="font-bold text-left">
          Change Password
        </Typography>

        {/* Form Section */} 
        <Box className="space-y-4 mt-5">
          <TextField
            label="Old Password"
            type="password"
            fullWidth
            variant="outlined"
            placeholder="Enter your old password"
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            placeholder="Enter your new password"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            placeholder="Confirm your new password"
          />

          {/* Update Password Button */}
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="w-full sm:w-auto px-6 py-2"
            >
              Update Password
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Settings;
