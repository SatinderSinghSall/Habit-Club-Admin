import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Topbar = () => {
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
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6 sm:px-8 md:px-10">
      {/* Left section - Title */}
      <h2 className="text-xl font-semibold text-gray-700 text-center sm:text-left">
        HabitClub Admin Panel
      </h2>

      {/* Right section - Logout button */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all mt-2 sm:mt-0"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
