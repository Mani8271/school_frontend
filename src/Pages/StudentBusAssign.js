import React, { useState, useEffect } from "react";
import { TextField, Button, Modal, Box, MenuItem } from "@mui/material";
import { Edit, Delete, PersonAdd } from "@mui/icons-material"; // Import icons for edit and delete
import { useBranch } from "./Branches"; // Assuming branch selection is managed globally
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const StudentBusAssign = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedBranch } = useBranch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    studentClass: "",
    route: "",
    id: "", 
    busNumber: "",
  });

  const [studentsData, setStudentsData] = useState([
    { id: "S001", studentName: "Alice", studentClass: "Class 1", route: "Route A", busNumber: "Bus 101" },
    { id: "S002", studentName: "Bob", studentClass: "Class 2", route: "Route B", busNumber: "Bus 102" },
    { id: "S003", studentName: "Charlie", studentClass: "Class 3", route: "Route C", busNumber: "Bus 103" },
    { id: "S004", studentName: "David", studentClass: "Class 4", route: "Route A", busNumber: "Bus 104" },
    { id: "S005", studentName: "Eve", studentClass: "Class 5", route: "Route B", busNumber: "Bus 105" },
  ]);
  
  const [isEditing, setIsEditing] = useState(false); // To track if we're editing

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const [busFilter, setBusFilter] = useState(""); // Filter by bus number

  // Mock data for bus routes
  const busRoutes = ["Route A", "Route B", "Route C", "Route D"];
  const busNumbers = ["Bus 101", "Bus 102", "Bus 103", "Bus 104", "Bus 105"];

  const branchData = {
    "Main Branch": ["Class 1", "Class 2", "Class 3"],
    "City Branch": ["Class 4", "Class 5"],
    "Westside Branch": ["Class 6", "Class 7"],
  };

  // Modal open/close handlers
  const handleOpenModal = (student = null) => {
    setFormData(student ? student : { studentName: "", studentClass: "", route: "", id: "", busNumber: "" });
    setIsEditing(!!student);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Form input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Assign or update student to a bus
  // const handleAssignStudent = () => {
  //   if (!formData.studentName || !formData.studentClass || !formData.route || !formData.busNumber || !formData.id) return;
  
  //   const isDuplicateID = studentsData.some((student) => student.id === formData.id);
  //   if (!isEditing && isDuplicateID) {
  //     alert("A student with this ID already exists!");
  //     return;
  //   }
  
  //   setStudentsData((prevStudents) =>
  //     isEditing
  //       ? prevStudents.map((student) => (student.id === formData.id ? { ...student, ...formData } : student))
  //       : [...prevStudents, formData]
  //   );
  //   handleCloseModal();
  // };

  // const handleAssignStudent = (e) => {
  //   e.preventDefault(); // Prevents refresh
  //   if (!formData.studentName || !formData.studentClass || !formData.route || !formData.busNumber || !formData.id) {
  //     alert("Please fill all fields");
  //     return;
  //   }
  //   setStudentsData(isEditing
  //     ? studentsData.map(student => student.id === formData.id ? { ...student, ...formData } : student)
  //     : [...studentsData, formData]
  //   );
  //   handleCloseModal();
  // };

  const handleAssignStudent = (event) => {
    event.preventDefault(); // Prevent page reload
  
    if (!formData.studentName || !formData.studentClass || !formData.route || !formData.busNumber || !formData.id) {
      alert("Please fill in all fields!");
      return; // Exit function, keeping the modal open
    }
  
    const isDuplicateID = studentsData.some((student) => student.id === formData.id && student.id !== (isEditing ? formData.id : ""));
    if (!isEditing && isDuplicateID) {
      alert("A student with this ID already exists!");
      return; // Exit function, keeping the modal open
    }
  
    setStudentsData((prevStudents) =>
      isEditing
        ? prevStudents.map((student) => (student.id === formData.id ? { ...student, ...formData } : student))
        : [...prevStudents, formData]
    );
  
    handleCloseModal(); // Close modal only when data is valid
  };  

  // Delete a student from the list
  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setStudentsData((prevStudents) => prevStudents.filter((student) => student.id !== id));
    }
  };  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  // Pagination logic
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  // Search filter function
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset to first page on new search
  };

   // Handle bus filter change
   const handleBusFilterChange = (event) => {
    setBusFilter(event.target.value);
    setPage(0);
  };

  // Handle updating a student's bus assignment
  const handleBusChange = (studentId, newBus) => {
    setStudentsData((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, busNumber: newBus } : student
      )
    );
  };

   // Filter students based on branch and search query
   const filteredStudents = studentsData
  .filter(student => 
    (branchData[selectedBranch]?.includes(student.studentClass) || !selectedBranch) &&
    (student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     student.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
     student.busNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  )
  .filter(student => !busFilter || student.busNumber === busFilter); // Apply bus number filter

   // Ensure `page` is valid when `filteredStudents` changes
   useEffect(() => {
    if (page > Math.floor(filteredStudents.length / rowsPerPage)) {
      setPage(0);
    }
  }, [filteredStudents.length, rowsPerPage]);  

  // Apply pagination
  const displayedStudents = filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        className="flex items-center text-gray-700 hover:text-gray-900 font-semibold mb-4"
      >
        <IoArrowBack className="mr-2 text-2xl" /> {/* Back Icon */}
        Back
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold">Assign Students to Buses</h1>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-4">
        <TextField
          placeholder="Search by ID, Name, Route, or Bus Number"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          className="w-[350px]"
        />
        <Button color="primary" onClick={() => handleOpenModal()} startIcon={<PersonAdd sx={{ fontSize: 30 }} aria-label="Add Student" />} />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border border-collapse border-gray-200 table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-gray-300">ID</th>
              <th className="px-4 py-2 border border-gray-300">Student Name</th>
              <th className="px-4 py-2 border border-gray-300">Class</th>
              <th className="px-4 py-2 border border-gray-300">Route</th>
              <th className="px-4 py-2 border border-gray-300">Bus Number</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {displayedStudents.length > 0 ? (
              displayedStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-2 border border-gray-300">{student.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.studentName}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.studentClass}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.route}</td>
                  <td className="px-4 py-2 border border-gray-300">{student.busNumber || "Not Assigned"}</td>
                  <td className="px-4 py-2 border border-gray-300">
                  <div className="flex justify-center gap-2">
                  <Button onClick={() => handleOpenModal(student)} color="primary" aria-label="Edit Student">
                    <Edit fontSize="small" />
                  </Button>
                  <Button onClick={() => handleDeleteStudent(student.id)} color="error" aria-label="Delete Student">
                    <Delete fontSize="small" />
                  </Button>
                  </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center border border-gray-300 text-gray-500">
                  No students found matching your search.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>


      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <label>Rows per page: </label>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="border border-gray-300 p-1 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleChangePage(Math.max(page - 1, 0))}
            disabled={page === 0}
            className={`px-4 py-2 border rounded ${
              page === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Prev
          </button>
          <span className="text-gray-700">
            Page {page + 1} of {Math.ceil(filteredStudents.length / rowsPerPage)}
          </span>
          <button
            onClick={() =>
              handleChangePage(
                Math.min(
                  page + 1,
                  Math.ceil(studentsData.length / rowsPerPage) - 1
                )
              )
            }
            disabled={page >= Math.ceil(filteredStudents.length / rowsPerPage) - 1}
            className={`px-4 py-2 border rounded ${
              page >= Math.ceil(filteredStudents.length / rowsPerPage) - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal for Assigning Students */}
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="assign-student-title">
        <Box
          className="absolute w-3/5 p-6 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2"
        >
          <h2 id="assign-student-title" className="mb-4 text-xl font-bold">
            {isEditing ? "Edit Student" : "Assign Student to Bus"}
          </h2>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleAssignStudent}>
            {/* Student Id */}
            <TextField
              label="Id"
              name="id"
              variant="outlined"
              fullWidth
              size="small"
              value={formData?.id || ""}
              onChange={handleInputChange}
              disabled={isEditing}
            />

            {/* Student Name */}
            <TextField
              label="Student Name"
              name="studentName"
              variant="outlined"
              fullWidth
              size="small"
              value={formData?.studentName || ""}
              onChange={handleInputChange}
              required
            />

            {/* Student Class */}
            <TextField
              select
              label="Student Class"
              name="studentClass"
              variant="outlined"
              fullWidth
              size="small"
              value={formData?.studentClass || ""}
              onChange={handleInputChange}
              required
            >
              {branchData[selectedBranch]?.length ? (
                branchData[selectedBranch].map((classItem, index) => (
                  <MenuItem key={index} value={classItem}>
                    {classItem}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Classes Available</MenuItem>
              )}
            </TextField>

            {/* Select Route */}
            <TextField
              select
              label="Route"
              name="route"
              variant="outlined"
              fullWidth
              size="small"
              value={formData?.route || ""}
              onChange={handleInputChange}
              required
            >
              {busRoutes?.length ? (
                busRoutes.map((route, index) => (
                  <MenuItem key={index} value={route}>
                    {route}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Routes Available</MenuItem>
              )}
            </TextField>

            {/* Select Bus Number */}
            <TextField
              select
              label="Bus Number"
              name="busNumber"
              variant="outlined"
              fullWidth
              size="small"
              value={formData?.busNumber || ""}
              onChange={handleInputChange}
              required
            >
              {busNumbers?.length ? (
                busNumbers.map((bus, index) => (
                  <MenuItem key={index} value={bus}>
                    {bus}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Buses Available</MenuItem>
              )}
            </TextField>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4 col-span-2">
              <Button variant="contained" color="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formData?.studentName || !formData?.studentClass || !formData?.route || !formData.busNumber}
              >
                {isEditing ? "Update" : "Assign"}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>


    </div>
  );
};

export default StudentBusAssign;
