import React, { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";

function CustomAlert({ message, type = "success", onClose, autoClose = true }) {
  const [show, setShow] = useState(false);
  const isSuccess = type === "success";

  useEffect(() => {
    // Trigger entrance animation
    setShow(true);

    // Auto close after delay
    if (autoClose) {
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
      <div
        className={`bg-white rounded-2xl shadow-xl px-6 py-5 w-full max-w-sm transform transition-all duration-300 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="mt-1">
            {isSuccess ? (
              <CheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <AlertTriangle className="text-red-500 w-6 h-6" />
            )}
          </div>
          <div className="flex-1">
            <p
              className={`font-semibold text-sm ${
                isSuccess ? "text-green-700" : "text-red-700"
              }`}
            >
              {message}
            </p>
          </div>
          <button
            onClick={() => {
              setShow(false);
              setTimeout(onClose, 300);
            }}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
