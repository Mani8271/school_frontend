import React, { useState } from "react";
import { useBranch } from "../Pages/Branches";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      name: "Catherine Marseau",
      role: "Science Teacher",
      type: "Casual Leave",
      from: "5 May 2018",
      to: "6 May 2018",
      days: "2 days",
      reason: "Going to Hospital",
      status: "Approved",
      branch: "Main Branch", // ✅ Added branch
    },
    {
      id: 2,
      name: "John Doe",
      role: "Maths Teacher",
      type: "Medical Leave",
      from: "13 Jul 2018",
      to: "15 Jul 2018",
      days: "3 days",
      reason: "Medical Emergency",
      status: "Pending",
      branch: "City Branch", // ✅ Added branch
    },
    {
      id: 3,
      name: "Jane Smith",
      role: "English Teacher",
      type: "Maternity Leave",
      from: "1 Aug 2018",
      to: "31 Aug 2018",
      days: "31 days",
      reason: "Maternity Leave",
      status: "Rejected",
      branch: "Westside Branch", // ✅ Added branch
    },
    {
      id: 4,
      name: "Alice Cooper",
      role: "History Teacher",
      type: "Sick Leave",
      from: "22 Sep 2018",
      to: "23 Sep 2018",
      days: "2 days",
      reason: "Illness",
      status: "Approved",
      branch: "City Branch", // ✅ Added branch
    },
    {
      id: 5,
      name: "Michael White",
      role: "Music Teacher",
      type: "Casual Leave",
      from: "10 Nov 2018",
      to: "12 Nov 2018",
      days: "3 days",
      reason: "Personal reasons",
      status: "Pending",
      branch: "Westside Branch", // ✅ Added branch
    },
]);
  const { selectedBranch } = useBranch();
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const navigate = useNavigate();

  const handleStatusChange = (id, newStatus) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this leave request?"
    );
    if (isConfirmed) {
      setLeaveRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    }
  };

  const filteredRequests = leaveRequests.filter((entry) => {
    return (
      entry.branch === selectedBranch && // ✅ Only include leave requests from the selected branch
      (entry.name.toLowerCase().includes(searchName.toLowerCase()) ||
        entry.role.toLowerCase().includes(searchName.toLowerCase())) &&
      (searchType ? entry.type === searchType : true) &&
      (searchStatus ? entry.status === searchStatus : true)
    );
  });
  

  const totalEntries = filteredRequests.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const displayedEntries = filteredRequests.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-6 bg-gray-100 " style={{height:"90vh"}}>
      <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        className="flex items-center text-gray-700 hover:text-gray-900 font-semibold mb-4"
      >
        <IoArrowBack className="mr-2 text-2xl" /> {/* Back Icon */}
        Back
      </button>

      <h1 className="mb-4 text-3xl font-bold">Staff Leave Requests</h1>
      </div>
      
      {/* Filters */}
      <div className="p-4 mb-4 bg-white rounded shadow">
        <input
          type="text"
          placeholder="Search Name or Role"
          className="p-2 mr-2 border rounded"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        {/* <select
          className="p-2 mr-2 border rounded"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">All Leave Types</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Medical Leave">Medical Leave</option>
          <option value="Maternity Leave">Maternity Leave</option>
        </select> */}
        <select
          className="p-2 border rounded"
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="p-4 bg-white rounded shadow">
      <div className="overflow-x-auto overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">From</th>
              <th className="p-2 border">To</th>
              <th className="p-2 border">No. of Days</th>
              <th className="p-2 border">Reason</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedEntries.length > 0 ? (
              displayedEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="p-2 border">
                    <strong>{entry.name}</strong>
                    <div className="text-sm text-gray-500">{entry.role}</div>
                  </td>
                  <td className="p-2 border">{entry.type}</td>
                  <td className="p-2 border">{entry.from}</td>
                  <td className="p-2 border">{entry.to}</td>
                  <td className="p-2 border">{entry.days}</td>
                  <td className="p-2 border">{entry.reason}</td>
                  <td className="p-2 border">
                    <select
                      value={entry.status}
                      onChange={(e) => handleStatusChange(entry.id, e.target.value)}
                      className="p-1 border rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 text-center border" colSpan="8">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 font-semibold">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaveRequests;