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
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-4 md:px-6">
      {/* Left Section - Hamburger */}
      <div className="flex items-center gap-4">
        <button className="md:hidden text-2xl" onClick={onMenuClick}>
          <FaBars />
        </button>
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 whitespace-nowrap drop-shadow-sm">
          HabitClub Admin Panel
        </h2>
      </div>

      {/* Right Section - Logout */}
      <button
        className="bg-red-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded hover:bg-red-600 transition-all"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
