// src/components/UserList.jsx
import { FaCircle } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal"; // Importamos el nuevo componente

export default function UserList({ users, onSelectUser, selectedUser, darkMode }) {
  const [createGroup, setCreateGroup] = useState(false);

  const handleCloseCreateGroup = () => {
    setCreateGroup(false);
  };

  const handleCreateGroup = (groupData) => {
    console.log("Creando grupo con los siguientes datos:", groupData);
    handleCloseCreateGroup();
  };

  return (
    <div
      className={`flex flex-col h-full border-r transition-colors duration-300 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div
        className={`p-4 border-b flex items-center justify-between transition-colors duration-300 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
          Usuarios Conectados
        </h2>
        <button
          className={`p-2 rounded-full transition-colors duration-300 ${
            darkMode
              ? "text-gray-400 hover:text-white hover:bg-gray-700"
              : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
          }`}
          onClick={() => setCreateGroup(true)}
        >
          <CiCirclePlus size={28} />
        </button>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <li
            key={user.id}
            className={`flex items-center p-4 cursor-pointer transition-colors duration-200 border-l-4 ${
              selectedUser?.id === user.id
                ? `${darkMode ? "bg-blue-900 border-blue-500" : "bg-blue-100 border-blue-600"}`
                : `${
                    darkMode
                      ? "hover:bg-gray-700 border-transparent"
                      : "hover:bg-gray-100 border-transparent"
                  }`
            }`}
            onClick={() => onSelectUser(user)}
          >
            <div className="relative mr-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`Avatar de ${user.nick}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <IoPersonCircle
                  className={`w-12 h-12 ${darkMode ? "text-gray-600" : "text-gray-400"}`}
                />
              )}
              <FaCircle
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 ${
                  darkMode ? "border-gray-800" : "border-white"
                } ${user.isOnline ? "text-green-500" : "text-gray-500"}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span
                  className={`font-semibold truncate ${darkMode ? "text-white" : "text-gray-800"}`}
                >
                  {user.nick}
                </span>
                {user.lastMessageTime && (
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {user.lastMessageTime}
                  </span>
                )}
              </div>
              {user.lastMessage && (
                <p className={`text-sm truncate ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {user.lastMessage}
                </p>
              )}
            </div>
            {user.hasNewMessage && (
              <span className="ml-2 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
            )}
          </li>
        ))}
      </ul>

      {createGroup && (
        <CreateGroupModal
          darkMode={darkMode}
          onClose={handleCloseCreateGroup}
          onCreateGroup={handleCreateGroup}
          availableUsers={users}
        />
      )}
    </div>
  );
}
