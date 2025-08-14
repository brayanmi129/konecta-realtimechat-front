// src/components/CreateGroupModal.jsx
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoPersonCircle } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";

export default function CreateGroupModal({ darkMode, onClose, onCreateGroup, availableUsers }) {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectUser = (user) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName && selectedUsers.length > 0) {
      onCreateGroup({ groupName, users: selectedUsers });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        className={`p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800 text-gray-100 ] border border-gray-300"
            : "bg-white text-gray-900 border border-[rgb(40,0,200)"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Crear Grupo</h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-full transition-colors duration-300 ${
              darkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            <IoCloseCircleOutline size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Nombre del grupo"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 border-gray-600 focus:ring-blue-500 text-white"
                : "bg-gray-50 border-gray-300 focus:ring-blue-600 text-gray-800"
            }`}
          />

          <div>
            <p className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
              Usuarios ({selectedUsers.length} seleccionados)
            </p>
            <ul
              className={`h-40 overflow-y-auto rounded-lg border p-2 transition-colors duration-300 ${
                darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"
              }`}
            >
              {availableUsers.map((user) => (
                <li
                  key={user.id}
                  className={`flex items-center p-2 rounded-md mb-1 cursor-pointer transition-colors duration-200 ${
                    selectedUsers.some((u) => u.id === user.id)
                      ? "bg-blue-200 text-blue-800 font-semibold"
                      : `${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`
                  }`}
                  onClick={() => handleSelectUser(user)}
                >
                  <div className="relative mr-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={`Avatar de ${user.nombre}`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <IoPersonCircle
                        className={`w-8 h-8 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
                      />
                    )}
                    <FaCircle
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 text-green-500 ${
                        darkMode ? "border-gray-700" : "border-white"
                      }`}
                    />
                  </div>
                  <span>{user.nombre}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-600 text-white hover:bg-gray-500"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-300 ${
                darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
