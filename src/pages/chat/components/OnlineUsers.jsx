// src/components/UserList.jsx
import { FaCircle } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import { useState, useEffect } from "react";

export default function UserList({
  socket,
  currentUser,
  onSelectUser,
  selectedUser,
  darkMode,
  users,
}) {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (!socket) return;

    socket.emit("getConnectedUsers");

    socket.on("connectedUsers", (connectedUsers) => {
      const otherUsers = connectedUsers.filter((u) => u.id !== currentUser.id);
      setUsers(otherUsers);
    });

    return () => socket.off("connectedUsers");
  }, [socket, currentUser]);

  return (
    <div
      className={`flex flex-col h-full top-0 right-0 border-l transition-width duration-300 ${
        collapsed ? "w-20" : "w-64"
      } ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      {/* ENCABEZADO */}
      <div
        className={`p-4 border-b flex items-center ${
          darkMode ? "border-gray-700" : "border-gray-200"
        } ${collapsed ? "justify-center" : "justify-between"}`}
      >
        {!collapsed && (
          <h2
            className={`text-xl font-bold flex items-center gap-2 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Usuarios conectados
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`text-gray-500 hover:text-gray-700`}
        >
          {collapsed ? <IoChevronBackOutline /> : <IoChevronForward />}
        </button>
      </div>

      {/* LISTA DE USUARIOS */}
      <ul className="flex-1 overflow-y-auto">
        {users.length === 0 && collapsed === false ? (
          <li className="flex items-center justify-center p-4 text-gray-500">
            No hay usuarios conectados
          </li>
        ) : (
          users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center p-2 cursor-pointer border-l-4 ${
                selectedUser?.id === user.id
                  ? darkMode
                    ? "bg-blue-900 border-blue-500"
                    : "bg-blue-100 border-blue-600"
                  : darkMode
                  ? "hover:bg-gray-700 border-transparent"
                  : "hover:bg-gray-100 border-transparent"
              }`}
              onClick={() => onSelectUser(user)}
            >
              <div className="relative mr-2">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`Avatar de ${user.nombre}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <IoPersonCircle
                    className={`w-12 h-12 ${darkMode ? "text-gray-600" : "text-gray-400"}`}
                  />
                )}
                <FaCircle
                  className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 text-green-500 ${
                    darkMode ? "border-gray-800" : "border-white"
                  }`}
                />
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <span
                    className={`font-semibold truncate ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {user.nombre}
                  </span>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
