import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBars } from "react-icons/fa";

const Topbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.info("Logged out successfully 👋", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    navigate("/login");
  };

  return (
    <div className="w-full h-16 backdrop-blur-sm bg-white/70 shadow-md border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      {/* Left Section - Hamburger and Title */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-2xl text-gray-600 hover:scale-110 transition-transform"
          onClick={onMenuClick}
          aria-label="Toggle Menu"
        >
          <FaBars />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
          HabitClub Admin Panel
        </h2>
      </div>

      {/* Right Section - Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 hover:scale-105 transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
