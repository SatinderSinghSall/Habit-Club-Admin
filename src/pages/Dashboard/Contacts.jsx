import React, { useEffect, useState } from "react";
import axios from "axios";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/contact`
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const openModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Contacts</h1>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform cursor-pointer"
            onClick={() => openModal(contact)}
          >
            <div className="flex items-center space-x-4 mb-4">
              {/* Avatar or Profile Image */}
              <div className="w-16 h-16 bg-gray-100 text-gray-600 flex items-center justify-center rounded-full shadow-md">
                <span className="text-xl font-semibold">
                  {contact.name[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {contact.name}
                </h2>
                <p className="text-sm text-gray-500">{contact.email}</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 mt-2">
              <span className="font-medium text-gray-600">Message:</span>{" "}
              {contact.message}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-8 w-96 max-w-lg transform scale-100 transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedContact.name}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                &times; {/* Close button */}
              </button>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-600">Email:</span>{" "}
                  {selectedContact.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-gray-600">Message:</span>{" "}
                  {selectedContact.message}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;
