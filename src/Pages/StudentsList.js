import React, { useState, useEffect } from "react";
import { Upload, Add, Download, Edit, Delete, Close, NestCamWiredStand } from "@mui/icons-material";
import { useBranch } from "../Pages/Branches";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddStudentInitiate } from "../redux/actions/student/addstudentAction";
import { getAllStudentsInitiate } from "../redux/actions/student/getstudentAction";
import { UpdateStudentInitiate } from "../redux/actions/student/updatestudentAction";
import { DeleteStudentInitiate } from "../redux/actions/student/deletestudentAction";

const StudentsList = () => {
  const dispatch = useDispatch();
  const { data: allstudents = [] } = useSelector((state) => state.getallstudents.students || {});
  useEffect(() => {
    dispatch(getAllStudentsInitiate());
  }, [dispatch]);
  console.log("i am all students", allstudents);
  // State to handle the student list and form visibility

  const [formVisible, setFormVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null); // Track which student is being edited
  const [newStudent, setNewStudent] = useState({
    _id: "", studentName: "", rollno: "", gender: "", bloodgroup: "", parentName: "", relation: "", class: "", section: "", address: "", city: "",
    dateofbirth: "", email: "", mobile: "", ProfilePicture: null
  });
  console.log("editingStudent", editingStudent)
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [sectionQuery, setSectionQuery] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // Generate CSV data
  const generateCSV = () => {
    const headers = [
      "ID", "Name", "Roll No.", "Gender", "bloodGroup", "Parent Name", "Relation", "Class", "Section", "Address", "City", "Date of Birth", "Email", "Mobile",
    ];

    const rows = allstudents?.map((student) =>
      [
        student._id, student.studentName, student.rollno, student.gender, student.bloodGroup, student.parentName, student.relation, student.class, student.section, student.address, student.city, student.dateofbirth, student.email, student.mobile,
      ].map((value) => {
        // Check if the value needs to be wrapped in double quotes
        if (typeof value === "string" && /[",\n]/.test(value)) {
          // Escape double quotes within the value by doubling them
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
    );

    // Combine headers and rows into a CSV formatted string
    const csvContent = [
      headers.join(","), // Add header row
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  // Trigger download of the CSV
  const handleDownload = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL?.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "students_data.csv");
    link.click(); // Trigger the download
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = () => {
    console.log(newStudent)
    const formdata = new FormData();
    if (editingStudent && newStudent._id) {
      formdata.append("_id", newStudent._id);
    }
    formdata.append("studentName", newStudent.studentName);
    formdata.append("rollno", newStudent.rollno);
    formdata.append("gender", newStudent.gender.toLowerCase());
    formdata.append("bloodgroup", newStudent.bloodgroup);
    formdata.append("parentName", newStudent.parentName);
    formdata.append("relation", newStudent.relation);
    formdata.append("class", newStudent.class);
    formdata.append("section", newStudent.section.toLowerCase());
    formdata.append("address", newStudent.address);
    formdata.append("city", newStudent.city);
    formdata.append("dateofbirth", newStudent.dateofbirth);
    formdata.append("email", newStudent.email);
    formdata.append("mobile", newStudent.mobile);
    formdata.append("ProfilePicture", newStudent.ProfilePicture);

    if (formdata && !editingStudent) {
      dispatch(AddStudentInitiate(formdata, (success) => {
        if (success) {
          console.log('Delete successful, fetching updated student list.');
          dispatch(getAllStudentsInitiate());
          resetForm();
          setFormVisible(false)
        } else {
          console.error('Failed to delete student.');
        }
      }))
    }
    if (formdata && editingStudent) {
      dispatch(UpdateStudentInitiate(formdata, (success) => {
        if (success) {
          console.log('Delete successful, fetching updated student list.');
          dispatch(getAllStudentsInitiate());
          resetForm();
          setFormVisible(false)
        } else {
          console.error('Failed to delete student.');
        }
      }))
    }
  };

  // Handle form submission (Add or Edit)

  const handleFormSubmit = () => {
    if (
      !newStudent.studentName?.trim() ||
      // !newStudent.id?.trim() ||
      !newStudent.class?.toString().trim() ||
      !newStudent.section?.trim() ||
      !newStudent.mobile?.toString().trim() ||
      !newStudent.parentName?.trim() ||
      !newStudent.address?.trim() ||
      !newStudent.city?.trim() ||
      !newStudent.gender?.trim() ||
      !newStudent.bloodgroup?.trim() ||
      !newStudent.relation?.trim() ||
      !newStudent?.dateofbirth ||
      !newStudent?.rollno
      // ||!newStudent.email
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (editingStudent) {
      handleAddStudent();
    }
    else {
      handleAddStudent();
    }
  };

  // Reset the form state
  const resetForm = () => {
    setNewStudent({
      id: "", name: "", rollno: "", gender: "", bloodGroup: "", parentName: "", relation: "", classNum: "", section: "", address: "", city: "",
      dob: "", email: "", mobile: "",
    });
    setEditingStudent(null); // Clear editing state
  };

  // Handle cancel form visibility
  const handleCancel = () => {
    setFormVisible(false);
    resetForm();
  };

  // Open form in Edit mode with student data
  const handleEditClick = (student) => {
    setEditingStudent(student);
    setNewStudent(student); // Pre-fill form with student's data
    setFormVisible(true); // Show the form
  };

  // Handle Delete functionality
  const handleDeleteClick = (id) => {
    if (id) {
      dispatch(
        DeleteStudentInitiate({ _id: id }, (success) => {
          if (success) {
            console.log('Delete successful, fetching updated student list.');
            dispatch(getAllStudentsInitiate());
          } else {
            console.error('Failed to delete student.');
          }
        })
      );
    }
  };

  // Filter students by search query
  // Get the selected branch from context
  const { selectedBranch } = useBranch();

  // First, filter students by branch
  const branchFilteredStudents = allstudents.filter(
    (student) => student.branch === selectedBranch
  );

  // Now, apply search and section filters
  const filteredStudents = branchFilteredStudents.filter((student) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const lowercasedSection = sectionQuery.toLowerCase();
    const classMatch = classFilter === "" || classFilter === "all" || student.class.toString() === classFilter;

    return (
      (student.studentName.toLowerCase().includes(lowercasedQuery) ||
        student._id.toLowerCase().includes(lowercasedQuery) ||
        student.parentName.toLowerCase().includes(lowercasedQuery) ||
        student.rollno.toLowerCase().includes(lowercasedQuery) ||
        student.class.toString().toLowerCase().includes(lowercasedQuery)) &&
      (lowercasedSection === "" ||
        student.section.toLowerCase() === lowercasedSection) &&
      classMatch
    );
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setFormVisible(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle Search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Directly update search query state
    setPage(0);
  };

  const handleSectionChange = (event) => {
    setSectionQuery(event.target.value);
    setPage(0);
  };

  const handleClassChange = (event) => {
    setClassFilter(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setPage(0); // Reset page when branch changes
  }, [selectedBranch]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  // Apply pagination after filtering
  const displayedStudents = filteredStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div className="p-4 bg-gray-100 min-h-screen max-w-7xl mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Students</h1>

      <div className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          {[
            { label: "Attendance", path: "/students/student-attendance" },
            { label: "School Bus", path: "/students/student-school-bus" },
            { label: "Exam Results", path: "/Exams/examresults" },
          ].map((btn, index) => (
            <button
              key={index}
              className="px-6 py-4 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 transition shadow-md w-full"
              onClick={() => navigate(btn.path)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>


      {/* Search Input and Action Icons in One Line */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Search & Filters Group */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto max-w-[300px]">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by ID, name or parent name"
            className="sm:flex-1 md:w-[200px] p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          {/* Dropdowns Group */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {[
              {
                value: classFilter,
                onChange: handleClassChange,
                options: ["All Classes", "LKG", "UKG", ...Array.from({ length: 10 }, (_, i) => i + 1)],
              },
              {
                value: sectionQuery,
                onChange: handleSectionChange,
                options: ["All Sections", "A", "B", "C"],
              },
            ].map((dropdown, index) => (
              <select
                key={index}
                className="w-full sm:w-[150px] p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dropdown.value}
                onChange={dropdown.onChange}
              >
                {dropdown.options.map((option, i) => (
                  <option key={i} value={typeof option === "number" ? option : option.toLowerCase()}>
                    {option}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>

        {/* Upload, Add, and Download Icons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
          <Upload className="text-blue-600 cursor-pointer hover:text-blue-800 sm:text-xl" />
          <Add className="text-green-600 cursor-pointer hover:text-green-800 sm:text-xl" onClick={() => setFormVisible(true)} />
          <Download className="text-purple-600 cursor-pointer hover:text-purple-800 sm:text-xl" onClick={handleDownload} />
        </div>
      </div>

      {/* Modal for Adding or Editing Student */}
      {formVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="w-full max-w-3xl p-6 bg-white rounded-md shadow-lg relative max-h-[90vh] flex flex-col">

            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">
                {editingStudent ? "Edit Student" : "Add New Student"}
              </h2>
              <button className="text-gray-600 hover:text-red-500" onClick={handleCancel}>
                <Close />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <form>
                {/* image */}
                <input
                  type="file"
                  name="ProfilePicture"
                  onChange={(e) =>
                    setNewStudent((prev) => ({
                      ...prev,
                      ProfilePicture: e.target.files[0], // Capture the file object
                    }))
                  }
                />

                {/* {newStudent.ProfilePicture && !editingStudent && (
                  <img
                    src={URL?.createObjectURL(newStudent.ProfilePicture)}
                    alt="Profile Preview"
                    style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
                  />
                )} */}

                {(newStudent.ProfilePicture || editingStudent?.ProfilePicture) && (
                  <img
                    src={
                      newStudent.ProfilePicture instanceof File
                        ? URL.createObjectURL(newStudent.ProfilePicture)
                        : `${process.env.REACT_APP_IMAGE_BASE_URL || 'https://example.com/path_to_images/'}${editingStudent.ProfilePicture}`
                    }
                    alt="Profile Preview"
                    style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
                  />
                )}


                {/* Dynamic Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    // { label: "Student ID*", name: "_id", type: "text" },
                    { label: "Student Name*", name: "studentName", type: "text" },
                    { label: "Email*", name: "email", type: "email" },
                    { label: "Roll Number*", name: "rollno", type: "text" },
                    { label: "Class*", name: "class", type: "text" },
                    { label: "Date of Birth", name: "dateofbirth", type: "date" },
                    { label: "Blood Group", name: "bloodgroup", type: "text" },
                    { label: "Username", name: "username", type: "text" },
                    { label: "Password", name: "password", type: "password" },
                    { label: "Guardian Name*", name: "parentName", type: "text" },
                    { label: "Guardian Contact*", name: "mobile", type: "text" },
                    { label: "Relation*", name: "relation", type: "text" },
                    { label: "Address", name: "address", type: "text" },
                    { label: "City", name: "city", type: "text" },
                  ].map(({ label, name, type }) => (
                    <div key={name}>
                      <label className="block font-medium text-gray-700">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={
                          name === "dateofbirth"
                            ? newStudent[name]?.split("T")[0] || ""
                            : newStudent[name]
                        }
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ))}


                  {/* Dropdowns */}
                  {[
                    {
                      label: "Section*",
                      name: "section",
                      options: ["Select Section", "A", "B", "C"],
                    },
                    {
                      label: "Gender",
                      name: "gender",
                      options: ["Select Gender", "Male", "Female"],
                    },
                  ].map(({ label, name, options }) => (
                    <div key={name}>
                      <label className="block font-medium text-gray-700">{label}</label>
                      <select
                        name={name}
                        value={
                          name === "section"
                            ? (newStudent[name] || "").toUpperCase()
                            : name === "gender"
                              ? newStudent[name]?.charAt(0).toUpperCase() + newStudent[name]?.slice(1).toLowerCase()
                              : newStudent[name] || ""
                        }
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        {options.map((option, index) => (
                          <option
                            key={index}
                            value={
                              option === "Select Section" || option === "Select Gender" ? "" : option
                            }
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}

                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-between mt-6 gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="px-6 py-2 text-white bg-blue-500 rounded-md"
                  >
                    {editingStudent ? "Update Student" : "Add Student"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Student Table */}
      <div className="overflow-x-auto bg-white mt-3 w-full">
        <table className="bg-white rounded-lg shadow-md border-collapse min-w-full">
          <thead className="hidden md:table-header-group">
            <tr className="bg-gray-200 border-b">
              <th className="px-4 py-2 text-left border">ID</th>
              <th className="px-4 py-2 text-left border">Student Name</th>
              <th className="px-4 py-2 text-left border text-nowrap">Roll No.</th>
              <th className="px-4 py-2 text-left border">Class</th>
              <th className="px-4 py-2 text-left border">Section</th>
              {/* <th className="px-4 py-2 text-left border">Attendance</th> */}
              <th className="px-4 py-2 text-left border">Gender</th>
              {/* <th className="px-4 py-2 text-left border">Relation</th> */}
              {/* <th className="px-4 py-2 text-left border">City</th> */}
              <th className="px-4 py-2 text-left border text-nowrap">Date of Birth</th>
              <th className="px-4 py-2 text-left border text-nowrap">Blood Group</th>
              <th className="border px-4 py-2 text-left">User Name</th>
              <th className="border px-4 py-2 text-left">Password</th>
              {/* <th className="px-4 py-2 text-left border">Email</th> */}
              <th className="px-4 py-2 text-left border">Guardian Name</th>
              <th className="px-4 py-2 text-left border">Guardian Contact</th>
              <th className="px-4 py-2 text-left border">Address</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allstudents.length > 0 ? (
              allstudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50 text-sm md:table-row block md:border-none">
                  {/* Mobile View: Stack Data */}
                  <td className="px-4 py-2 border md:table-cell block">
                    <span className="font-semibold md:hidden">ID: </span> {student._id}
                  </td>
                  <td className="px-4 py-2 border md:table-cell block">
                    <span className="font-semibold md:hidden">Name: </span> {student.studentName}
                  </td>
                  <td className="px-4 py-2 border md:table-cell block">
                    <span className="font-semibold md:hidden">Roll No.: </span> {student.rollno}
                  </td>
                  <td className="px-4 py-2 border md:table-cell block">
                    <span className="font-semibold md:hidden">Class: </span> {student.class}
                  </td>
                  <td className="px-4 py-2 border md:table-cell block">
                    <span className="font-semibold md:hidden">Section: </span> {student.section}
                  </td>
                  <td className="px-4 py-2 border md:table-cell block">
                    <span className="font-semibold md:hidden">Gender: </span> {student.gender}
                  </td>
                  <td className="px-4 py-2 border md:table-cell block">
                    <span className="font-semibold md:hidden">DOB: </span> {student.dateofbirth}
                  </td>
                  <td className="px-4 py-2 border md:table-cell block">
                    <span className="font-semibold md:hidden">Blood Group: </span> {student.bloodgroup}
                  </td>
                  <td className="border px-4 py-2 md:table-cell block">
                    <span className="font-semibold md:hidden">Username: </span> {student.studentName}
                  </td>
                  <td className="border px-4 py-2 md:table-cell block">
                    <span className="font-semibold md:hidden">Password: </span> {"*********"}
                  </td>
                  <td className="px-4 py-2 border md:table-cell block">
                    <span className="font-semibold md:hidden">Guardian: </span> {student.parentName}
                  </td>
                  <td className="px-4 py-2 border md:table-cell block">
                    <span className="font-semibold md:hidden">Contact: </span> {student.mobile}
                  </td>
                  <td className="px-4 py-2 border md:table-cell block">
                    <span className="font-semibold md:hidden">Address: </span> {student.address}
                  </td>
                  <td className="flex items-center px-4 py-4 border">
                    <Edit
                      onClick={() => handleEditClick(student)}
                      className="mr-5 text-blue-500 cursor-pointer hover:text-blue-700"
                    />
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this student?")) {
                          handleDeleteClick(student._id);
                        }
                      }}
                      className="ml-4 text-red-600 hover:text-red-800"
                    >
                      <Delete className="inline-block mr-2" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="15" className="px-4 py-2 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 bg-gray-50 border-t w-full text-sm">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <span className="text-gray-700">Rows per page:</span>
          <select
            className="border border-gray-300 p-1 rounded"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleChangePage(Math.max(page - 1, 0))}
            disabled={page === 0}
            className={`px-4 py-2 border ${page === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:bg-gray-100"
              }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page + 1} of {Math.ceil(filteredStudents.length / rowsPerPage)}
          </span>
          <button
            onClick={() =>
              handleChangePage(
                Math.min(page + 1, Math.ceil(filteredStudents.length / rowsPerPage) - 1)
              )
            }
            disabled={page >= Math.ceil(filteredStudents.length / rowsPerPage) - 1}
            className={`px-4 py-2 border ${page >= Math.ceil(filteredStudents.length / rowsPerPage) - 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:bg-gray-100"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
