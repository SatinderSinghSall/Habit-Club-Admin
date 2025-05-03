import React, { useEffect, useState } from "react";
import { toast as notify } from "react-toastify";
import { toast } from "react-hot-toast";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [editUser, setEditUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

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
      if (!response.ok) throw new Error(data.message || "Failed to save user");

      setUsers((prev) =>
        editUser
          ? prev.map((u) => (u._id === editUser._id ? data : u))
          : [...prev, data]
      );

      setNewUser({ name: "", email: "", password: "" });
      setEditUser(null);
      setShowModal(false);

      toast.success(editUser ? "User updated" : "User added"); // hot-toast
    } catch (err) {
      console.error("Save user error:", err.message);
      toast.error(err.message); // hot-toast
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userToDelete._id}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete user");

      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
      setShowDeleteModal(false);

      notify.success("User deleted");
    } catch (err) {
      console.error("Delete error:", err.message);
      notify.error(err.message);
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setNewUser({ name: user.name, email: user.email, password: "" });
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
        if (!response.ok) throw new Error("Failed to fetch users");
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Users</h1>

      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add a User
        </button>
      </div>

      {/* Add/Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] sm:max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">
              {editUser ? "Edit User" : "Add a New User"}
            </h2>
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

              <div className="flex justify-end gap-2">
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
                  {editUser ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] sm:max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full bg-white text-xs sm:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-6 px-4 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mb-2 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9l-6 6-6-6"
                      />
                    </svg>
                    <p className="text-sm">
                      No users found. Add a new user to get started.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 break-all">{user.email}</td>
                  <td className="py-3 px-4">{user.status || "Active"}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col sm:flex-row gap-2">
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
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
