import React, { useState, useEffect } from "react";
import { useBranch } from "../Pages/Branches"; // ✅ Import branch context
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const DailyStaffAttendanceNT = () => {
  const { selectedBranch } = useBranch(); // ✅ Get selected branch
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const [staff, setStaff] = useState([
    // ✅ Main Branch Staff
  { id: "NT1001", name: "Mr. Robert", designation: "Librarian", email: "robert@example.com", mobile: "9876543210", branch: "Main Branch" },
  { id: "NT1002", name: "Ms. Laura", designation: "Admin Staff", email: "laura@example.com", mobile: "9765432100", branch: "Main Branch" },
  { id: "NT1003", name: "Ms. Rachel", designation: "HR Manager", email: "rachel@example.com", mobile: "9654321098", branch: "Main Branch" },
  { id: "NT1004", name: "Mr. Michael", designation: "Security Officer", email: "michael@example.com", mobile: "9543210987", branch: "Main Branch" },

  // ✅ City Branch Staff
  { id: "NT1005", name: "Ms. Anna", designation: "Librarian", email: "anna@example.com", mobile: "9432109876", branch: "City Branch" },
  { id: "NT1006", name: "Mr. Steve", designation: "Transport Manager", email: "steve@example.com", mobile: "9321098765", branch: "City Branch" },
  { id: "NT1007", name: "Ms. Olivia", designation: "IT Support", email: "olivia@example.com", mobile: "9210987654", branch: "City Branch" },
  { id: "NT1008", name: "Mr. Daniel", designation: "Assistant Admin", email: "daniel@example.com", mobile: "9109876543", branch: "City Branch" },

  // ✅ Westside Branch Staff
  { id: "NT1009", name: "Mr. David", designation: "Receptionist", email: "david@example.com", mobile: "9098765432", branch: "Westside Branch" },
  { id: "NT1010", name: "Ms. Linda", designation: "Counselor", email: "linda@example.com", mobile: "8987654321", branch: "Westside Branch" },
  { id: "NT1011", name: "Mr. Kevin", designation: "Accountant", email: "kevin@example.com", mobile: "8876543210", branch: "Westside Branch" },
  { id: "NT1012", name: "Ms. Sarah", designation: "School Nurse", email: "sarah@example.com", mobile: "8765432109", branch: "Westside Branch" }
]);
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState({ present: 0, absent: 0, onLeave: 0 });

  // ✅ Filter staff based on selected branch
  const branchSpecificStaff = staff.filter((member) => member.branch === selectedBranch);

  // Load attendance from local storage
  useEffect(() => {
    const savedAttendance = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendance(savedAttendance);
  }, []);

  // Save attendance to local storage
  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  const handleAttendanceChange = (id, status) => {
    setAttendance((prevAttendance) => {
      const updatedAttendance = [...prevAttendance];
      const index = updatedAttendance.findIndex((entry) => entry.id === id);
      if (index !== -1) {
        updatedAttendance[index].status = status;
      } else {
        updatedAttendance.push({ id, status });
      }
      return updatedAttendance;
    });
  };

  const handleSubmit = () => {
    const presentCount = attendance.filter((a) => a.status === "Present").length;
    const absentCount = attendance.filter((a) => a.status === "Absent").length;
    const onLeaveCount = attendance.filter((a) => a.status === "On Leave").length;

    setSummary({ present: presentCount, absent: absentCount, onLeave: onLeaveCount });
    setShowModal(true);
  };

  const handleReset = () => {
    setAttendance([]);
    localStorage.removeItem("attendance");
  };

   // 🔍 Filter staff based on ID, Name, or Designation
   const filteredStaff = branchSpecificStaff.filter((staff) =>
      staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const isSubmitDisabled = branchSpecificStaff.length !== attendance.filter((a) => a.status).length;

  const today = new Date();
  const formattedDate = `Today Date: ${today.getDate()}-${today.toLocaleString("en-US", { month: "short" })}-${today.getFullYear()}`;

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100">

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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Non-Teaching Daily Attendance</h1>
          <p className="inline-block px-4 py-2 text-lg font-semibold text-blue-700 bg-blue-100 border border-blue-200 rounded-md shadow-sm">
            📅 {formattedDate}
          </p>
        </div>

        {/* 🔎 Search Input */}
        <input
          type="text"
          placeholder="Search by ID, Name, or Designation"
          className="min-w-[400px] p-3 border border-gray-300 mb-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-x-auto overflow-y-auto"
        style={{ maxHeight: "60vh" }}>
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="px-4 py-3 text-lg font-semibold text-left bg-gray-300">ID</th>
                <th className="px-4 py-3 text-lg font-semibold text-left bg-gray-300">Name</th>
                <th className="px-4 py-3 text-lg font-semibold text-left bg-gray-300">Designation</th>
                <th className="px-4 py-3 text-lg font-semibold text-left bg-gray-300">Email</th>
                <th className="px-4 py-3 text-lg font-semibold text-left bg-gray-300">Mobile</th>
                <th className="px-4 py-3 text-lg font-semibold text-left bg-gray-300">Attendance</th>
              </tr>
            </thead>
            <tbody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((member) => ( // ✅ Use filtered staff list
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 border">{member.id}</td>
                  <td className="px-4 py-3 border">{member.name}</td>
                  <td className="px-4 py-3 border">{member.designation}</td>
                  <td className="px-4 py-3 border">{member.email}</td>
                  <td className="px-4 py-3 border">{member.mobile}</td>
                  <td className="px-4 py-3 border">
                    <select
                      value={attendance.find((a) => a.id === member.id)?.status || ""}
                      onChange={(e) => handleAttendanceChange(member.id, e.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Attendance</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
                  <tr>
                    <td className="p-2 text-center border" colSpan="8">
                      No matching records found.
                    </td>
                  </tr>)}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="px-6 py-2 text-white transition duration-200 bg-red-600 rounded-md hover:bg-red-700"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`px-6 py-2 rounded-md transition duration-200 ${
              isSubmitDisabled
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Attendance Summary
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Attendance Summary</h3>
            <p className="mt-4">Present: {summary.present}</p>
            <p>Absent: {summary.absent}</p>
            <p>On Leave: {summary.onLeave}</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DailyStaffAttendanceNT;
