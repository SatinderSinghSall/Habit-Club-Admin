import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserShield,
  FaUsers,
  FaClipboardList,
  FaEnvelope,
  FaBars,
  FaChevronLeft,
} from "react-icons/fa";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/dashboard/admins", label: "Admins", icon: <FaUserShield /> },
  { path: "/dashboard/users", label: "Users", icon: <FaUsers /> },
  { path: "/dashboard/habits", label: "Habits", icon: <FaClipboardList /> },
  { path: "/dashboard/contacts", label: "Contacts", icon: <FaEnvelope /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard"); // Default active item
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      setIsOpen(false);
    } else {
      setIsMobile(false);
      setIsOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update activeItem based on the current location
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={`h-screen ${
        isOpen ? "w-80" : "w-20"
      } bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg flex flex-col transition-all duration-300 fixed md:relative z-20`}
    >
      {/* Top - Branding and toggle */}
      <div className="flex items-center justify-between p-4">
        <h1
          className={`text-2xl font-bold whitespace-nowrap ${
            isOpen ? "block" : "hidden"
          } text-purple-500 transition-all`}
        >
          HabitClub Admin
        </h1>
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl p-2 hover:bg-gray-700 rounded-lg"
        >
          {isOpen ? <FaChevronLeft /> : <FaBars />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col mt-8 gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setActiveItem(item.path)} // Set active item when clicked
            className={`flex items-center gap-4 py-3 px-4 mx-2 rounded-lg transition-all ${
              activeItem === item.path ? "bg-purple-600" : "hover:bg-gray-700"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && (
              <span className="text-base font-medium tracking-wide">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom - Version / copyright */}
      {isOpen && (
        <div className="mt-auto p-4 text-xs text-gray-400 text-center">
          © {currentYear} HabitClub Admin
        </div>
      )}
    </div>
  );
};

export default Sidebar;
