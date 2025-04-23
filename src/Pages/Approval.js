import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Pending" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Super Admin", status: "Approved" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Rejected" },
  { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Admin", status: "Pending" },
  { id: 5, name: "Charlie Black", email: "charlie@example.com", role: "Super Admin", status: "Approved" },
  { id: 6, name: "David White", email: "david@example.com", role: "Admin", status: "Rejected" },
  { id: 7, name: "Eve Green", email: "eve@example.com", role: "Super Admin", status: "Pending" },
  { id: 8, name: "Frank Harris", email: "frank@example.com", role: "Admin", status: "Approved" },
  { id: 9, name: "Grace Lee", email: "grace@example.com", role: "Admin", status: "Rejected" },
  { id: 10, name: "Hank Scott", email: "hank@example.com", role: "Super Admin", status: "Pending" },
];

const Approval = () => {
  const [users, setUsers] = useState(initialUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleStatusChange = (id, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      {/* Page Wrapper */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col min-h-[500px] ">
        {/* Page Title */}
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">User Approval</h2>

        {/* Table Container */}
        <div className="flex-grow overflow-y-auto max-h-[400px]">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">System Role</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <tr key={user.id} className="border border-gray-200 hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        className="border border-gray-300 p-1 rounded w-full bg-white"
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      >
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls (Always Visible) */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
          {/* Rows Per Page Selector */}
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

          {/* Pagination Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleChangePage(Math.max(page - 1, 0))}
              disabled={page === 0}
              className={`px-4 py-2 border rounded ${page === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Prev
            </button>
            <span className="text-gray-700">
              Page {page + 1} of {Math.ceil(users.length / rowsPerPage)}
            </span>
            <button
              onClick={() => handleChangePage(Math.min(page + 1, Math.ceil(users.length / rowsPerPage) - 1))}
              disabled={page >= Math.ceil(users.length / rowsPerPage) - 1}
              className={`px-4 py-2 border rounded ${page >= Math.ceil(users.length / rowsPerPage) - 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approval;
