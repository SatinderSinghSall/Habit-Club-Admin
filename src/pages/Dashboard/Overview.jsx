import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaTasks,
  FaUserCheck,
  FaUserTimes,
  FaEnvelope,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

function Overview() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/dashboard/stats`
        );
        const data = await response.json();

        setStats([
          {
            title: "Total Users",
            value: data.totalUsers,
            icon: <FaUsers className="text-blue-500 w-8 h-8" />,
          },
          {
            title: "Total Habits",
            value: data.totalHabits,
            icon: <FaTasks className="text-green-500 w-8 h-8" />,
          },
          {
            title: "Active Users",
            value: data.activeUsers,
            icon: <FaUserCheck className="text-purple-500 w-8 h-8" />,
          },
          {
            title: "Inactive Users",
            value: data.totalUsers - data.activeUsers, // 👈 Calculating Inactive Users
            icon: <FaUserTimes className="text-red-500 w-8 h-8" />, // 👈 New icon for inactive
          },
          {
            title: "New Messages",
            value: data.newMessages,
            icon: <FaEnvelope className="text-yellow-500 w-8 h-8" />,
          },
          {
            title: "Total Admin",
            value: data.totalAdmin,
            icon: <RiAdminFill className="text-pink-500 w-8 h-8" />,
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4"
          >
            <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Overview;
