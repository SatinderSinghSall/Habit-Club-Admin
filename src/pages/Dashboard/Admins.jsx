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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Admins</h1>

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
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border-b hover:bg-gray-50">
                <td className="py-3 sm:py-4 px-4 sm:px-6">{admin.name}</td>
                <td className="py-3 sm:py-4 px-4 sm:px-6 break-all">
                  {admin.email}
                </td>
                <td className="py-3 sm:py-4 px-4 sm:px-6">
                  {admin.role || "Admin"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admins;
