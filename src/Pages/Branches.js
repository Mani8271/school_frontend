import React, { createContext, useContext, useState } from "react";

// Create Context
const Branches = createContext();

// Provider Component
export const BranchProvider = ({ children }) => {
  const [selectedBranch, setSelectedBranch] = useState("Main Branch"); // Default branch

  return (
    <Branches.Provider value={{ selectedBranch, setSelectedBranch }}>
      {children}
    </Branches.Provider>
  );
};

// Custom Hook to Use Context
export const useBranch = () => useContext(Branches);
