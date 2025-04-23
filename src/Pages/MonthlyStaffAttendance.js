import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useBranch } from "./Branches";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const MonthlyStaffAttendance = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const attendanceData = [
    // 📌 Main Branch
    {
      id: "T1001",
      name: "Mr. Adams",
      subject: "Physics",
      email: "adams@school.com",
      mobile: "9876543210",
      branch: "Main Branch",
      attendance: [
        { date: "2025-01-01", status: "Present" },
        { date: "2025-01-02", status: "Present" },
        { date: "2025-01-03", status: "Absent" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
    {
      id: "T1002",
      name: "Ms. Blake",
      subject: "Chemistry",
      email: "blake@school.com",
      mobile: "9765432109",
      branch: "Main Branch",
      attendance: [
        { date: "2025-01-01", status: "On Leave" },
        { date: "2025-01-02", status: "Present" },
        { date: "2025-01-03", status: "Present" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
  
    // 📌 City Branch
    {
      id: "T2001",
      name: "Mr. Carter",
      subject: "Mathematics",
      email: "carter@school.com",
      mobile: "9654321098",
      branch: "City Branch",
      attendance: [
        { date: "2025-01-01", status: "Absent" },
        { date: "2025-01-02", status: "Present" },
        { date: "2025-01-03", status: "On Leave" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
    {
      id: "T2002",
      name: "Ms. Davis",
      subject: "Biology",
      email: "davis@school.com",
      mobile: "9543210987",
      branch: "City Branch",
      attendance: [
        { date: "2025-01-01", status: "Present" },
        { date: "2025-01-02", status: "Present" },
        { date: "2025-01-03", status: "Absent" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
  
    // 📌 Westside Branch
    {
      id: "T3001",
      name: "Mr. Edwards",
      subject: "English",
      email: "edwards@school.com",
      mobile: "9432109876",
      branch: "Westside Branch",
      attendance: [
        { date: "2025-01-01", status: "Present" },
        { date: "2025-01-02", status: "On Leave" },
        { date: "2025-01-03", status: "Present" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
    {
      id: "T3002",
      name: "Ms. Foster",
      subject: "History",
      email: "foster@school.com",
      mobile: "9321098765",
      branch: "Westside Branch",
      attendance: [
        { date: "2025-01-01", status: "Absent" },
        { date: "2025-01-02", status: "Present" },
        { date: "2025-01-03", status: "Present" },
        { date: "2025-01-04", status: "Holiday" },
      ],
    },
  ];
  

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
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
  const { selectedBranch } = useBranch(); 
  const filteredAttendanceData = attendanceData.filter(
    (teacher) => teacher.branch === selectedBranch
  );

  const handleSelect = (value) => {
    setSelectedMonth(value);
    setIsDropdownVisible(false); // Close the dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const countAttendance = (teacher, type) =>
    teacher.attendance.filter(
      (record) => record.status === type && filterByMonthYear(record.date)
    ).length;

  const filterByMonthYear = (dateString) => {
    const recordDate = new Date(dateString);
    const recordMonth = (recordDate.getMonth() + 1).toString().padStart(2, "0");
    const recordYear = recordDate.getFullYear().toString();
    return (
      (!selectedMonth || recordMonth === selectedMonth) &&
      (!selectedYear || recordYear === selectedYear)
    );
  };

  const getAttendanceForCalendar = () => {
    if (!selectedTeacher) return [];
    return selectedTeacher.attendance.filter(
      (record) =>
        filterByMonthYear(record.date) &&
        filteredAttendanceData.some((teacher) => teacher.id === selectedTeacher.id) // Ensure only branch-specific teacher data is shown
    );
  };
  
  const tileContent = ({ date }) => {
    const record = getAttendanceForCalendar()?.find(
        (r) => new Date(r.date).toDateString() === new Date(date).toDateString()
    );

    if (record?.status === "Present") return <span className="text-green-500">🟢</span>;
    if (record?.status === "Absent") return <span className="text-red-500">🔴</span>;
    if (record?.status === "On Leave") return <span className="text-yellow-500">🟡</span>;
    if (record?.status === "Holiday") return <span className="text-blue-500">🔵</span>;

    return null;
  };

  // 🔍 Handle search input
  const filteredStaff = filteredAttendanceData.filter((staff) =>
    staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.subject.toLowerCase().includes(searchTerm.toLowerCase())
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
      </div>
      <h1 className="mb-2 text-3xl font-bold text-gray-800">
        Monthly Staff Attendance
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 p-4 mb-6 bg-white rounded-lg shadow-sm md:grid-cols-3">
        {/* 🔎 Search Input */}
        <input
          type="text"
          placeholder="Search by ID, Name, or Subject"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="relative" ref={dropdownRef}>
          {/* Dropdown Trigger */}
          {/* <div
            className="w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:ring-2 focus:ring-blue-400"
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          >
            {selectedMonth
              ? months.find(([num]) => num === selectedMonth)[1]
              : "Select Month"}
          </div> */}

          {/* Dropdown Options */}
          {/* {isDropdownVisible && (
            <div
              className="absolute z-10 grid grid-cols-4 gap-2 p-4 mt-2 bg-white border border-gray-300 rounded-md shadow-md"
            >
              {months.map(([num, name]) => (
                <div
                  key={num}
                  onClick={() => handleSelect(num)}
                  className={`p-2 text-center rounded-md cursor-pointer hover:bg-blue-100 ${
                    selectedMonth === num ? "bg-blue-200" : ""
                  }`}
                >
                  {name}
                </div>
              ))}
            </div>
          )} */}
        </div>
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

      {/* Summary Table */}
      <div className="overflow-x-auto overflow-y-auto" 
      style={{ maxHeight: "60vh" }}>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="text-sm font-medium text-gray-700 bg-gray-200">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Mobile</th>
              <th className="px-4 py-3 text-left">Presents</th>
              <th className="px-4 py-3 text-left">Absents</th>
              <th className="px-4 py-3 text-left">On Leave</th>
              <th className="px-4 py-3 text-center">Holidays</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
          {filteredStaff.length > 0 ? (
            filteredStaff.map((teacher) => (
              <tr key={teacher.id} className="text-sm border-b hover:bg-gray-50">
                <td className="px-4 py-3">{teacher.id}</td>
                <td className="px-4 py-3">{teacher.name}</td>
                <td className="px-4 py-3">{teacher.subject}</td>
                <td className="px-4 py-3">{teacher.email}</td>
                <td className="px-4 py-3">{teacher.mobile}</td>
                <td className="px-4 py-3">
                  {countAttendance(teacher, "Present")}
                </td>
                <td className="px-4 py-3">
                  {countAttendance(teacher, "Absent")}
                </td>
                <td className="px-4 py-3">
                  {countAttendance(teacher, "On Leave")}
                </td>
                <td className="px-4 py-3">
                  {countAttendance(teacher, "Holiday")}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedTeacher(teacher)}
                    className="text-blue-500 underline"
                    aria-label={`View attendance for ${teacher.name}`}
                  >
                    View Attendance
                  </button>
                </td>
              </tr>
            ))
          ) : (
              <tr>
                <td className="p-2 text-center border w-auto" colSpan="10">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Calendar View */}
      {selectedTeacher && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-auto max-w-3xl overflow-y-auto max-h-[80vh]">
            <h2 className="mb-4 text-2xl font-bold">
              Attendance for {selectedTeacher.name}
            </h2>
            <Calendar
              tileContent={tileContent}
              className="react-calendar"
              aria-label={`Calendar view for ${selectedTeacher.name}`}
            />
            <button
              onClick={() => setSelectedTeacher(null)}
              className="px-6 py-2 mt-4 text-white bg-red-500 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default MonthlyStaffAttendance;