import React, { useState, useEffect } from "react";
import {
  Modal, TextField, IconButton, Card, CardContent,
  Typography, Button, Tooltip, Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AddClassInitiate } from "../redux/actions/class/addClassAction";
import { GetAllClassesInitiate } from "../redux/actions/class/getAllClassesAction";
import { DeleteClassInitiate } from "../redux/actions/class/deleteclassAction";
import { EditClassInitiate } from "../redux/actions/class/editClassAction";
import Loader from "../Components/loader";
import { data } from "react-router-dom";

const ClassList = () => {
  const dispatch = useDispatch();
  const { data: classes = [] } = useSelector((state) => state.getclasses.classes || {});
  const { loading: getLoading } = useSelector((state) => state.getclasses);
// const { loading: addLoading } = useSelector((state) => state.addClass);
// const { loading: editLoading } = useSelector((state) => state.editClass);
// const { loading: deleteLoading } = useSelector((state) => state.deleteClass);
  console.log("classes", classes);
  const [openModal, setOpenModal] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [editingClass, setEditingClass] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(4);

  useEffect(() => {
    dispatch(GetAllClassesInitiate());
  }, [classes]);

  const totalPages = Math.ceil(classes.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentClasses = classes.slice(startIndex, startIndex + entriesPerPage);

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleOpenModal = () => {
    setEditingClass(null);
    setNewClassName("");
    setOpenModal(true);
  };

  // const handleAddClass = () => {
  //   if (newClassName.trim()) {
  //     const formData = { className: newClassName.trim() };
  //     dispatch(AddClassInitiate(formData));
  //     setNewClassName("");
  //     setOpenModal(false);
  //   }
  // };

  const handleAddClass = () => {
    if (newClassName.trim()) {
      const formData = { className: newClassName.trim() };
  
      if (editingClass) {
        dispatch(EditClassInitiate(editingClass._id, formData));
      } else {
        dispatch(AddClassInitiate(formData));
      }
  
      setNewClassName("");
      setEditingClass(null);
      setOpenModal(false);
    }
  };
  
  const handleEditClass = (classItem) => {
    console.log("Editing class:", classItem);
    setEditingClass(classItem);
    setNewClassName(classItem.className);
    setOpenModal(true);
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      // Dispatch a delete action here when it's implemented
      dispatch(DeleteClassInitiate(classId));
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const anyLoading =
  getLoading 

if (anyLoading) {
  return <Loader />;
}

  return (
    <div className="p-8" style={{ height: "100vh" }}>
      <div className="flex justify-between mb-4">
        <Typography variant="h5" className="font-semibold">
          Class List
        </Typography>
        <Tooltip title="Add Class" arrow>
          <IconButton color="inherit" onClick={handleOpenModal}>
            ➕
          </IconButton>
        </Tooltip>
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 mt-4 overflow-y-auto">
        {currentClasses.map((classItem) => (
          <Card key={classItem._id} className="shadow-lg w-full" style={{ maxWidth: "250px", margin: "0 auto", maxHeight: "120px" }}>
            <CardContent>
              <Typography variant="h6" color="textPrimary" style={{ fontSize: "18px" }}>
                {classItem.className}
              </Typography>
              <div className="flex justify-between mt-6">
                <IconButton color="inherit" onClick={() => handleEditClass(classItem)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="inherit" onClick={() => handleDeleteClass(classItem._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-5 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border transition ${currentPage === 1
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
          className={`px-4 py-2 border transition ${currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
            : "text-gray-900 border-gray-400 hover:bg-gray-100"
            }`}
        >
          Next
        </button>
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="relative p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg w-96">
          <IconButton
            onClick={handleCloseModal}
            style={{ position: "absolute", top: 10, right: 10, color: "black" }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" className="mb-4">
            {editingClass ? "Edit Class" : "Add Class"}
          </Typography>

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
              {editingClass ? "Save Changes" : "Add Class"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ClassList;

