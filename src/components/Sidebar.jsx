import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserShield,
  FaUsers,
  FaClipboardList,
  FaEnvelope,
  FaBars,
  FaChevronLeft,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsOpen(true);
    }
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-screen ${
        isOpen ? "w-64" : "w-20"
      } bg-gray-800 text-white shadow-lg p-6 flex flex-col transition-all ease-in-out duration-300 
      ${isMobile ? "fixed top-0 left-0" : "relative"}`}
    >
      <div className="flex justify-between items-center mb-10">
        <h1
          className={`text-2xl font-bold ${
            isOpen ? "block" : "hidden"
          } text-purple-500 transition-all`}
        >
          HabitClub Admin
        </h1>

        {/* Hamburger icon for mobile */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl p-2 hover:bg-gray-700 rounded-lg"
            aria-label="Toggle Sidebar"
          >
            {isOpen ? <FaChevronLeft /> : <FaBars />}
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-lg hover:text-purple-400 transition-all"
          aria-label="Go to Dashboard"
        >
          <FaTachometerAlt className="text-xl" />
          {isOpen && "Dashboard"}
        </Link>
        <Link
          to="/dashboard/admins"
          className="flex items-center gap-3 text-lg hover:text-purple-400 transition-all"
          aria-label="Go to Admins"
        >
          <FaUserShield className="text-xl" />
          {isOpen && "Admins"}
        </Link>
        <Link
          to="/dashboard/users"
          className="flex items-center gap-3 text-lg hover:text-purple-400 transition-all"
          aria-label="Go to Users"
        >
          <FaUsers className="text-xl" />
          {isOpen && "Users"}
        </Link>
        <Link
          to="/dashboard/habits"
          className="flex items-center gap-3 text-lg hover:text-purple-400 transition-all"
          aria-label="Go to Habits"
        >
          <FaClipboardList className="text-xl" />
          {isOpen && "Habits"}
        </Link>
        <Link
          to="/dashboard/contacts"
          className="flex items-center gap-3 text-lg hover:text-purple-400 transition-all"
          aria-label="Go to Contact Messages"
        >
          <FaEnvelope className="text-xl" />
          {isOpen && "Contact Messages"}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
