import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock API call to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'online', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'offline', role: 'Teacher' },
        { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', status: 'online', role: 'Student' },
        { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', status: 'offline', role: 'Admin' },
      ];
      setUsers(mockUsers);
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toString().includes(searchQuery)
  );

  return (
    <div className="container min-h-screen p-6 mx-auto bg-gray-100 rounded-lg shadow-md">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-center text-gray-700">Users List</h1>
        <div className="flex justify-start mt-4">
          <input
            type="text"
            placeholder="Search by name, ID, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-lg p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </header>

      <section className="p-4 bg-white rounded-lg shadow users-table">
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 font-medium text-left text-gray-600">ID</th>
                <th className="px-4 py-2 font-medium text-left text-gray-600">Name</th>
                <th className="px-4 py-2 font-medium text-left text-gray-600">Email</th>
                <th className="px-4 py-2 font-medium text-left text-gray-600">Role</th>
                <th className="px-4 py-2 font-medium text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-white text-sm ${
                        user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <p className="mt-6 text-center text-gray-600">No users found.</p>
        )}
      </section>
    </div>
  );
};

export default Users;