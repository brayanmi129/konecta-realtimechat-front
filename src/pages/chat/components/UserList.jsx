// src/components/UserList.jsx
import React from "react";
import { FaCircle } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

export default function UserList({ users, onSelectUser, selectedUser, darkMode }) {
  return (
    <div
      className={`flex flex-col h-full border-r ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
        <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
          Usuarios Conectados
        </h2>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <li
            key={user.id}
            className={`flex items-center p-4 cursor-pointer transition-colors duration-200 ${
              selectedUser?.id === user.id
                ? `${
                    darkMode
                      ? "bg-[rgb(40,0,200)] border-l-4 border-blue-100"
                      : "bg-blue-100 border-l-4 border-[rgb(40,0,200)]"
                  }`
                : `${darkMode ? "hover:bg-gray-700" : "hover:bg-blue-100"}`
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
                  className={`w-12 h-12 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
                />
              )}
              <FaCircle
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 ${
                  darkMode ? "border-gray-800" : "border-white"
                } ${user.isOnline ? "text-green-500" : "text-gray-400"}`}
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
    </div>
  );
}
