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

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard");
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

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleNavItemClick = (path) => {
    setActiveItem(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        className={`top-0 left-0 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg flex flex-col transition-all duration-300
          ${
            isMobile
              ? isOpen
                ? "fixed w-64 h-full translate-x-0 z-40"
                : "fixed w-64 h-full -translate-x-full z-40"
              : isOpen
              ? "relative w-80 h-screen"
              : "relative w-20 h-screen"
          }
        `}
      >
        {/* Branding and Toggle */}
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-2xl font-bold whitespace-nowrap ${
              isOpen ? "block" : "hidden"
            } text-purple-400 transition-all`}
          >
            HabitClub Admin
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl p-2 hover:bg-gray-700 rounded-lg block md:hidden"
          >
            {isOpen ? <FaChevronLeft /> : <FaBars />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-8 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleNavItemClick(item.path)}
              className={`flex items-center gap-4 py-3 px-4 mx-2 rounded-lg transition-all duration-200 ${
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

        {/* Footer */}
        {isOpen && (
          <div className="mt-auto p-4 text-xs text-gray-400 text-center">
            © {currentYear} HabitClub Admin
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
