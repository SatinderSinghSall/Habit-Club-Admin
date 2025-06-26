import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start as open for desktop

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar container with fixed dynamic width */}
      <div
        className={`${
          sidebarOpen ? "w-80" : "w-20"
        } duration-300 transition-all`}
      >
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={toggleSidebar} />
        <main className="flex-1 bg-gray-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
