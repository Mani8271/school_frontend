import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useBranch } from "../Pages/Branches";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const MonthlyStudentAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [viewAttendanceStudent, setViewAttendanceStudent] = useState(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { selectedBranch } = useBranch(); 
  const navigate = useNavigate();

  const [attendanceData] = useState([
    {
      id: "S12345",
      name: "John Doe",
      class: "7th Grade",
      section: "A",
      rollNumber: "001",
      branch: "Main Branch", // 🔥 Added branch
      attendance: [
        { date: "2025-01-01", status: "Present" },
        { date: "2025-01-02", status: "Absent" },
        { date: "2025-01-03", status: "On Leave" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
    {
      id: "S54346",
      name: "Jane Smith",
      class: "5th Grade",
      section: "B",
      rollNumber: "002",
      branch: "City Branch", // 🔥 Added branch
      attendance: [
        { date: "2025-01-01", status: "On Leave" },
        { date: "2025-01-02", status: "Present" },
        { date: "2025-01-03", status: "Present" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
    {
      id: "S67890",
      name: "Alice Brown",
      class: "10th Grade",
      section: "A",
      rollNumber: "003",
      branch: "Westside Branch", // 🔥 Added branch
      attendance: [
        { date: "2025-01-01", status: "Absent" },
        { date: "2025-01-02", status: "Present" },
        { date: "2025-01-03", status: "On Leave" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
    {
      id: "S11223",
      name: "Bob White",
      class: "8th Grade",
      section: "B",
      rollNumber: "004",
      branch: "Main Branch", // 🔥 Added branch
      attendance: [
        { date: "2025-01-01", status: "Present" },
        { date: "2025-01-02", status: "Absent" },
        { date: "2025-01-03", status: "Present" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
    {
      id: "S67891",
      name: "Alice Brown",
      class: "10th Grade",
      section: "A",
      rollNumber: "003",
      branch: "Westside Branch", // 🔥 Added branch
      attendance: [
        { date: "2025-01-01", status: "Absent" },
        { date: "2025-01-02", status: "Present" },
        { date: "2025-01-03", status: "On Leave" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
    {
      id: "S11224",
      name: "Bob White",
      class: "8th Grade",
      section: "B",
      rollNumber: "004",
      branch: "City Branch", // 🔥 Added branch
      attendance: [
        { date: "2025-01-01", status: "Present" },
        { date: "2025-01-02", status: "Absent" },
        { date: "2025-01-03", status: "Present" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
  ]);
  const [isClassDropdownVisible, setIsClassDropdownVisible] = useState(false);
  const [isMonthDropdownVisible, setIsMonthDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const classDropdownRef = useRef(null);
  const monthDropdownRef = useRef(null);

  const handleSelectClass = (value) => {
    setSelectedClass(value);
    setIsClassDropdownVisible(false);
  };

  const handleSelectMonth = (value) => {
    setSelectedMonth(value);
    setIsMonthDropdownVisible(false);
  };

  const months = [
    ["01", "Jan"],
    ["02", "Feb"],
    ["03", "Mar"],
    ["04", "Apr"],
    ["05", "May"],
    ["06", "Jun"],
    ["07", "Jul"],
    ["08", "Aug"],
    ["09", "Sep"],
    ["10", "Oct"],
    ["11", "Nov"],
    ["12", "Dec"],
  ];

  const classes = [
    "All Classes",
    "1st Grade",
    "2nd Grade",
    "3rd Grade",
    "4th Grade",
    "5th Grade",
    "6th Grade",
    "7th Grade",
    "8th Grade",
    "9th Grade",
    "10th Grade",
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (classDropdownRef.current && !classDropdownRef.current.contains(event.target)) {
        setIsClassDropdownVisible(false);
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
        setIsMonthDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper to count attendance types
  const countAttendance = (student, type) =>
    student.attendance.filter(
      (record) => record.status === type && filterByMonthYear(record.date)
    ).length;

  // Filter by selected month and year
  const filterByMonthYear = (dateString) => {
    const recordDate = new Date(dateString);
    const recordMonth = (recordDate.getMonth() + 1).toString().padStart(2, "0");
    const recordYear = recordDate.getFullYear().toString();
    return (
      (!selectedMonth || recordMonth === selectedMonth) &&
      (!selectedYear || recordYear === selectedYear)
    );
  };

  useEffect(() => {
    setPage(0); // Reset page when branch changes
  }, [selectedBranch]);

  // Pagination logic
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  // Apply pagination
  const filteredAttendanceData = attendanceData.filter(
    (student) =>
      (selectedClass === "All Classes" || !selectedClass || student.class === selectedClass) &&
      (!selectedSection || student.section === selectedSection) &&
      (!selectedBranch || student.branch === selectedBranch) // 🔥 Apply branch filtering
  );

  const displayedStudents = filteredAttendanceData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  // Get attendance for calendar display
  const getAttendanceForCalendar = (student) => {
    return student ? student.attendance : [];
  };

  // Render attendance status for the calendar
  const tileContent = ({ date }) => {
    if (!viewAttendanceStudent) return null;

    const studentAttendance = getAttendanceForCalendar(viewAttendanceStudent).find(
      (r) => new Date(r.date).toDateString() === new Date(date).toDateString()
    );

    if (!studentAttendance) return null;

    const status = studentAttendance.status;
    if (status === "Present") return <span className="text-green-500">🟢</span>;
    if (status === "Absent") return <span className="text-red-500">🔴</span>;
    if (status === "On Leave") return <span className="text-yellow-500">🟡</span>;
    if (status === "Holiday") return <span className="text-blue-500">🔵</span>;
    
    return null;
};

// 🔍 Handle search input
const filteredStudent = filteredAttendanceData.filter((student) =>
  student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  student.name.toLowerCase().includes(searchTerm.toLowerCase()) 
);

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
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Monthly All Students Attendance
      </h1>
    </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white rounded-lg shadow-sm md:grid-cols-4">
        {/* 🔎 Search Input */}
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />  

        {/* Class Dropdown */}
        <div className="relative" ref={classDropdownRef}>
          <div
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:ring-2 focus:ring-blue-400"
            onClick={() => setIsClassDropdownVisible(!isClassDropdownVisible)}
          >
            {selectedClass || "Select Class"}
          </div>

          {isClassDropdownVisible && (
            <div className="absolute z-10 grid grid-cols-3 gap-2 p-2 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
              {classes.map((grade) => (
                <div
                  key={grade}
                  onClick={() => handleSelectClass(grade)}
                  className="p-2 text-center rounded-md cursor-pointer hover:bg-blue-100"
                >
                  {grade}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section */}
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Section</option>
          {["A", "B", "C"].map((section) => (
            <option value={section} key={section}>
              Section {section}
            </option>
          ))}
        </select>

        {/* Month Dropdown */}
        {/* <div className="relative" ref={monthDropdownRef}>
          <div
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:ring-2 focus:ring-blue-400"
            onClick={() => setIsMonthDropdownVisible(!isMonthDropdownVisible)}
          >
            {selectedMonth
              ? months.find(([num]) => num === selectedMonth)[1]
              : "Select Month"}
          </div>

          {isMonthDropdownVisible && (
            <div className="absolute z-10 grid grid-cols-6 gap-2 p-2 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
              {months.map(([num, name]) => (
                <div
                  key={num}
                  onClick={() => handleSelectMonth(num)}
                  className={`p-2 text-center rounded-md cursor-pointer hover:bg-blue-100 ${
                    selectedMonth === num ? "bg-blue-200" : ""
                  }`}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div> */}

        {/* Year Dropdown */}
        {/* <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Year</option>
          {[2025, 2024, 2023].map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select> */}
      </div>

      {/* Attendance Table with Pagination */}
      <div className="overflow-x-auto overflow-y-auto"
      style={{ maxHeight: "60vh" }}>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="text-sm font-medium text-gray-700 bg-gray-200">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Class</th>
              <th className="px-4 py-3 text-left">Section</th>
              <th className="px-4 py-3 text-left">Roll Number</th>
              <th className="px-4 py-3 text-left">Present</th>
              <th className="px-4 py-3 text-left">Absent</th>
              <th className="px-4 py-3 text-left">On Leave</th>
              <th className="px-4 py-3 text-left">Holidays</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudent.length > 0 ? (
              filteredStudent.map((student) => (
                <tr key={student.id} className="text-sm text-gray-700 border-t">
                  <td className="px-4 py-3">{student.id}</td>
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.class}</td>
                  <td className="px-4 py-3">{student.section}</td>
                  <td className="px-4 py-3">{student.rollNumber}</td>
                  <td className="px-4 py-3">
                    {countAttendance(student, "Present")}
                  </td>
                  <td className="px-4 py-3">
                    {countAttendance(student, "Absent")}
                  </td>
                  <td className="px-4 py-3">
                    {countAttendance(student, "On Leave")}
                  </td>
                  <td className="px-4 py-3">
                    {countAttendance(student, "Holiday")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => {
                        setViewAttendanceStudent(student);
                        setIsCalendarModalOpen(true);
                      }}
                    >
                      View Attendance
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-3 text-center text-gray-500">
                  No attendance records available.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
          <div className="flex items-center space-x-2">
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
              className={`px-4 py-2 border rounded ${
                page === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Prev
            </button>
            <span className="text-gray-700">
              Page {page + 1} of {Math.ceil(filteredAttendanceData.length / rowsPerPage)}
            </span>
            <button
              onClick={() =>
                handleChangePage(
                  Math.min(
                    page + 1,
                    Math.ceil(filteredAttendanceData.length / rowsPerPage) - 1
                  )
                )
              }
              disabled={
                page >= Math.ceil(filteredAttendanceData.length / rowsPerPage) - 1
              }
              className={`px-4 py-2 border rounded ${
                page >= Math.ceil(filteredAttendanceData.length / rowsPerPage) - 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>

      {/* Calendar Modal */}
      <Modal
        isOpen={isCalendarModalOpen}
        onRequestClose={() => setIsCalendarModalOpen(false)}
        contentLabel="Student Attendance Calendar"
        className="w-auto max-w-3xl p-0 mx-auto my-auto bg-white rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      >
        <div className="flex items-center justify-center w-full h-full">
          <div className="p-4">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Attendance Calendar for {viewAttendanceStudent?.name}
            </h2>
            <Calendar tileContent={tileContent} />
          </div>
        </div>
        <button
          className="px-4 py-3 mt-4 mb-2 ml-2 text-white bg-red-500 rounded-md"
          onClick={() => setIsCalendarModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MonthlyStudentAttendance;
