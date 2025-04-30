import axios from "axios";
import { useEffect, useState } from "react";
import CustomAlert from "../../components/CustomAlert";

function Habits() {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [alert, setAlert] = useState(null); // State to control the custom alert visibility

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/habits/public`
        );
        setHabits(res.data);
      } catch (error) {
        console.error("Failed to fetch habits:", error);
      }
    };

    fetchHabits();
  }, []);

  // Delete habit
  const deleteHabit = async (habitId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/habits/${habitId}`
      );
      // Filter out the deleted habit from the state
      setHabits(habits.filter((habit) => habit._id !== habitId));
      setAlert({ message: response.data.message, type: "success" }); // Show success alert
    } catch (error) {
      console.error("Failed to delete habit:", error);
      setAlert({ message: "Failed to delete habit", type: "error" }); // Show error alert
    }
  };

  const closeAlert = () => {
    setAlert(null); // Close the alert
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Habits</h1>

      <div className="overflow-x-auto rounded-3xl shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-base font-semibold text-gray-700">
                Name
              </th>
              <th className="py-4 px-6 text-left text-base font-semibold text-gray-700">
                Creator
              </th>
              <th className="py-4 px-6 text-left text-base font-semibold text-gray-700">
                Created At
              </th>
              <th className="py-4 px-6 text-left text-base font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr
                key={habit._id}
                className="border-b hover:bg-gray-50 cursor-pointer transition"
                onClick={() => setSelectedHabit(habit)}
              >
                <td className="py-5 px-6">{habit.name}</td>
                <td className="py-5 px-6">{habit.user?.name || "Unknown"}</td>
                <td className="py-5 px-6">
                  {new Date(habit.createdAt).toLocaleDateString()}
                </td>

                <td className="py-5 px-6">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      deleteHabit(habit._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Custom Alert */}
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={closeAlert}
        />
      )}

      {/* Modal */}
      {selectedHabit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 p-8 relative animate-fadeIn">
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition"
              onClick={() => setSelectedHabit(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedHabit.name}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Created by {selectedHabit.user?.name || "Unknown"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Created At</p>
                  <p className="font-semibold text-gray-700">
                    {new Date(selectedHabit.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Streak</p>
                  <p className="font-semibold text-gray-700">
                    {selectedHabit.streak}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Goal</p>
                  <p className="font-semibold text-gray-700">
                    {selectedHabit.goal} Days
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Last Check-In</p>
                  <p className="font-semibold text-gray-700">
                    {selectedHabit.lastCheckIn
                      ? new Date(selectedHabit.lastCheckIn).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {selectedHabit.checkIns?.length > 0 && (
                  <div>
                    <p className="text-gray-500 text-sm mb-2">Check-Ins</p>
                    <div className="bg-gray-50 rounded-xl p-4 max-h-40 overflow-y-auto text-sm space-y-1">
                      {selectedHabit.checkIns.map((date, index) => (
                        <p key={index}>{new Date(date).toLocaleDateString()}</p>
                      ))}
                    </div>
                  </div>
                )}

                {selectedHabit.milestones?.length > 0 && (
                  <div>
                    <p className="text-gray-500 text-sm mb-2">Milestones</p>
                    <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1">
                      {selectedHabit.milestones.map((milestone, index) => (
                        <p key={index}>
                          Target {milestone.target}
                          {milestone.achievedOn && (
                            <>
                              {" "}
                              (Achieved:{" "}
                              {new Date(
                                milestone.achievedOn
                              ).toLocaleDateString()}
                              )
                            </>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Habits;
