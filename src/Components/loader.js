import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
      className="w-full"
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loader;
