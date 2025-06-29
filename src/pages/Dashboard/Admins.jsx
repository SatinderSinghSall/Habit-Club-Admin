import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmState, setConfirmState] = useState({
    show: false,
    adminId: null,
  });
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/list`
      );
      if (!response.ok) throw new Error("Failed to fetch admins");
      const data = await response.json();
      setAdmins(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch admins.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    const { name, email, password } = newAdmin;
    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    setAddLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add admin");
      }

      const data = await response.json();
      setAdmins((prev) => [...prev, data]);
      toast.success("Admin added");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setError(err.message);
    } finally {
      setAddLoading(false);
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setNewAdmin({ name: admin.name, email: admin.email, password: "" });
    setShowModal(true);
  };

  const handleUpdateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/${editingAdmin._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAdmin),
        }
      );
      if (!response.ok) throw new Error("Failed to update admin");
      const updated = await response.json();
      setAdmins((prev) =>
        prev.map((a) => (a._id === updated._id ? updated : a))
      );
      toast.success("Admin updated");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setError(err.message);
    }
  };

  const handleDelete = (id) => {
    setConfirmState({ show: true, adminId: id });
  };

  const confirmDelete = async () => {
    setDeleteLoadingId(confirmState.adminId);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/${confirmState.adminId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete admin");
      setAdmins((prev) =>
        prev.filter((admin) => admin._id !== confirmState.adminId)
      );
      toast.success("Admin deleted");
      setConfirmState({ show: false, adminId: null });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setError(err.message);
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmState({ show: false, adminId: null });
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAdmin(null);
    setNewAdmin({ name: "", email: "", password: "" });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-lg sm:text-2xl font-bold mb-4">Admins</h1>

      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add an Admin
        </button>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] sm:max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">
              {editingAdmin ? "Edit Admin" : "Add New Admin"}
            </h2>
            <form
              onSubmit={editingAdmin ? handleUpdateAdmin : handleAddAdmin}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                value={newAdmin.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={newAdmin.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
              />
              {!editingAdmin && (
                <input
                  type="password"
                  name="password"
                  value={newAdmin.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full border p-2 rounded"
                />
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {addLoading
                    ? "Submitting..."
                    : editingAdmin
                    ? "Update Admin"
                    : "Add Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmState.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this admin?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={!!deleteLoadingId}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                {deleteLoadingId ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Admins Found */}
      {admins.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM4.5 20.25a8.25 8.25 0 0115 0"
            />
          </svg>
          <p className="text-lg font-medium text-gray-600 mb-1">
            No Admins Found
          </p>
          <p className="text-sm text-gray-400">
            Start by adding a new admin to manage your app.
          </p>
        </div>
      ) : (
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
                  Role
                </th>
                <th className="py-2 px-4 text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{admin.name}</td>
                  <td className="py-3 px-4 break-all">{admin.email}</td>
                  <td className="py-3 px-4">{admin.role || "Admin"}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(admin._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admins;
