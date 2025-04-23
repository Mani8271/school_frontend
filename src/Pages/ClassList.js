import React, { useState, useEffect } from "react";
import { useBranch } from "../Pages/Branches"; // 🔥 Import Branch Context
import {Modal, TextField, IconButton, Card, CardContent, Typography, Button, Tooltip, Box} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const ClassList = () => {
  const { selectedBranch } = useBranch(); // 🔥 Get the selected branch

  // State Variables
  const [openModal, setOpenModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [editingClass, setEditingClass] = useState("");

  // 🔥 Class data grouped by branch
  const allClasses = {
    "Main Branch": [
      { id: 1, name: "Class 1" },
      { id: 2, name: "Class 2" },
      { id: 3, name: "Class 3" },
      { id: 4, name: "Class A" },
      { id: 5, name: "Class B" },
      { id: 6, name: "Class C" },
      { id: 4, name: "Class A" },
      { id: 5, name: "Class B" },
      { id: 6, name: "Class C" },{ id: 4, name: "Class A" },
      { id: 5, name: "Class B" },
      { id: 6, name: "Class C" },{ id: 4, name: "Class A" },
      { id: 5, name: "Class B" },
      { id: 6, name: "Class C" },{ id: 4, name: "Class A" },
      { id: 5, name: "Class B" },
      { id: 6, name: "Class C" },
    ],
    "City Branch": [
      { id: 4, name: "Class A" },
      { id: 5, name: "Class B" },
      { id: 6, name: "Class C" },
    ],
    "Westside Branch": [
      { id: 7, name: "Class X" },
      { id: 8, name: "Class Y" },
      { id: 9, name: "Class Z" },
    ],
  };

  const [classes, setClasses] = useState(allClasses[selectedBranch] || []);

  // Update classes when branch changes
  useEffect(() => {
    setClasses(allClasses[selectedBranch] || []);
  }, [selectedBranch]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(4);

  // Calculate total pages
  const totalPages = Math.ceil(classes.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentClasses = classes.slice(startIndex, endIndex);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const handleOpenModal = () => {
    setEditingClass(null);  // 🔥 Reset editing state
    setNewClassName("");    // 🔥 Clear input field
    setOpenModal(true);     // 🔥 Open the modal
  };
  
  const handleAddClass = () => {
    if (newClassName && !classes.some((cls) => cls.name === newClassName)) {
      const newClassId = Math.max(...classes.map(cls => cls.id), 0) + 1;
      const newClass = { id: newClassId, name: newClassName };
      setClasses([...classes, newClass]);
    }
    setNewClassName("");
    setOpenModal(false);
  };

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setNewClassName(classItem.name);
    setOpenModal(true);
  };

  // const handleDeleteClass = (classId) => {
  //   setClasses((prevClasses) => prevClasses.filter((cls) => cls.id !== classId));
  // };

  const handleDeleteClass = (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses((prevClasses) => prevClasses.filter((cls) => cls.id !== classId));
    }
  };  

  const handleCloseModal = () => setOpenModal(false);

  // Pagination Controls
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-8" style={{ height: "100vh" }}>
      {/* Flex container for class list and add button */}
      <div className="flex justify-between mb-4">
        <Typography variant="h5" className="font-semibold">
          {selectedBranch} - Class List {/* 🔥 Show selected branch */}
        </Typography>
        <Tooltip title="Add Class" arrow>
          <IconButton color="inherit" onClick={() => handleOpenModal(true)}>
            ➕
          </IconButton>
        </Tooltip>
      </div>

      {/* Show Entries Dropdown */}
      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm font-medium text-gray-700">Show Entries:</label>
        <select
          value={entriesPerPage}
          onChange={handleEntriesChange}
          className="px-2 py-1 text-black bg-white border rounded w-[60px]"
        >
          {[4, 5, 10, 15, 20].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mt-4 overflow-y-auto">
        {currentClasses.map((classItem) => (
          <Card
            key={classItem.id}
            className="shadow-lg w-full"
            style={{
              maxWidth: "250px",
              margin: "0 auto",
              maxHeight: "120px",
            }}
          >
          <CardContent>
            <Typography variant="h6" color="textPrimary" style={{ fontSize: "18px" }}>
              {classItem.name}
            </Typography>
            <div className="flex justify-between mt-6">
              <IconButton
                color="inherit"
                onClick={() => handleEditClass(classItem)}
                style={{ fontSize: "18px" }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => handleDeleteClass(classItem.id)}
                style={{ fontSize: "18px" }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-5 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border transition ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
              : "text-gray-900 border-gray-400 hover:bg-gray-100"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border transition ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
              : "text-gray-900 border-gray-400 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal for Adding/Editing Class */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="relative p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg w-96">
          <IconButton
            color="inherit"
            onClick={handleCloseModal}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" className="mb-4">
            {editingClass ? "Edit Class" : "Add Class"}
          </Typography>

          {/* Class Name Input */}
          <TextField
            label="Class Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />

          <div className="flex justify-center mt-4">
            <Button
              variant="contained"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={handleAddClass}
            >
              {editingClass ? "Edit Class" : "Add Class"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ClassList;
