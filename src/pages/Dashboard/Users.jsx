import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete confirmation
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editUser, setEditUser] = useState(null); // user being edited
  const [userToDelete, setUserToDelete] = useState(null); // user to delete

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const method = editUser ? "PUT" : "POST";
    const url = editUser
      ? `${import.meta.env.VITE_API_URL}/users/${editUser._id}`
      : `${import.meta.env.VITE_API_URL}/users`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save user");
      }

      if (editUser) {
        setUsers((prev) =>
          prev.map((u) => (u._id === editUser._id ? data : u))
        );
      } else {
        setUsers((prev) => [...prev, data]);
      }

      setNewUser({ name: "", email: "", password: "" });
      setEditUser(null);
      setShowModal(false);
    } catch (err) {
      console.error("Save user error:", err.message);
      alert(`❌ ${err.message}`);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
      setShowDeleteModal(false); // Close the modal after deletion
    } catch (err) {
      console.error("Delete error:", err.message);
      alert(`❌ ${err.message}`);
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setNewUser({ name: user.name, email: user.email, password: "" }); // Don't prefill password
    setShowModal(true);
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

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
        <div className="mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add a User
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <h2 className="text-lg font-semibold mb-4">Add a New User</h2>
              <form onSubmit={handleAddUser} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full border p-2 rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                />
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full border p-2 rounded"
                />

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
              <p className="mb-4">Are you sure you want to delete this user?</p>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteUser}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

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
              <th className="py-2 sm:py-3 px-4 sm:px-6 text-left font-semibold text-gray-700">
                Actions
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

                {/* Action Buttons: Edit and Delete */}
                <td className="py-3 sm:py-4 px-4 sm:px-6 flex gap-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(user)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
