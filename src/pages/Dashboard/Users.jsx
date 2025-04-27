import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Users</h1>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full bg-white text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 sm:py-3 px-4 sm:px-6 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="py-2 sm:py-3 px-4 sm:px-6 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="py-2 sm:py-3 px-4 sm:px-6 text-left font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-3 sm:py-4 px-4 sm:px-6">{user.name}</td>
                <td className="py-3 sm:py-4 px-4 sm:px-6 break-all">
                  {user.email}
                </td>
                <td className="py-3 sm:py-4 px-4 sm:px-6">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
