import React, { useEffect, useState } from "react";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/list`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch admins");
        }
        const data = await response.json();
        setAdmins(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch admins.");
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue fetching data
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admins</h1>

      <div className="overflow-x-auto rounded-2xl shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">{admin.name}</td>
                <td className="py-4 px-6">{admin.email}</td>
                <td className="py-4 px-6">{admin.role || "Admin"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admins;
