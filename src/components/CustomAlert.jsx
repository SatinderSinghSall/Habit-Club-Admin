import React from "react";

function CustomAlert({ message, type, onClose }) {
  const alertStyles = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg shadow-lg p-6 max-w-sm w-full ${alertStyles}`}
      >
        <div className="text-center text-white">
          <p className="text-lg font-semibold">{message}</p>
          <button
            onClick={onClose}
            className="mt-4 bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
