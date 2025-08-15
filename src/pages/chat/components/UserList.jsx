// src/components/UserList.jsx
import { FaCircle } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";

export default function UserList({
  privateChats,
  groups,
  onSelectUser,
  onSelectGroup,
  selectedGroup,
  selectedUser,
  darkMode,
  socket,
  currentUser,
}) {
  const [createGroup, setCreateGroup] = useState(false);
  const [showUsers, setShowUsers] = useState(true);
  const [showGroups, setShowGroups] = useState(true);

  const handleCloseCreateGroup = () => setCreateGroup(false);

  const handleCreateGroup = (groupData) => {
    if (groupData.name && groupData.users.length > 0) {
      // Enviar al backend vía WebSocket
      socket.emit("createGroup", {
        name: groupData.name,
        users: groupData.users.map((u) => u.id),
        creator: currentUser.id,
      });
    }
    handleCloseCreateGroup();
  };

  return (
    <div
      className={`flex flex-col h-full border-r ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* ENCABEZADO USUARIOS */}
      <div
        className={`p-4 border-b flex items-center justify-between ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h2
          className={`text-xl font-bold flex items-center gap-2 cursor-pointer ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
          onClick={() => setShowUsers(!showUsers)}
        >
          {showUsers ? <IoChevronDown /> : <IoChevronForward />}
          Mis conversaciones
        </h2>
      </div>

      {/* LISTA USUARIOS */}
      {showUsers && (
        <ul className="flex-1 overflow-y-auto">
          {privateChats.map((chat) => (
            <li
              key={chat.chatId}
              className={`flex items-center p-4 cursor-pointer border-l-4 ${
                selectedUser?.chatId === chat.chatId
                  ? darkMode
                    ? "bg-blue-900 border-blue-500"
                    : "bg-blue-100 border-blue-600"
                  : darkMode
                  ? "hover:bg-gray-700 border-transparent"
                  : "hover:bg-gray-100 border-transparent"
              }`}
              onClick={() => onSelectUser(chat.participants[0])}
            >
              <div className="relative mr-4">
                <IoPersonCircle
                  className={`w-12 h-12 ${darkMode ? "text-gray-600" : "text-gray-400"}`}
                />

                <FaCircle
                  className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 ${
                    chat.participants[0].estado === "conectado"
                      ? "border-green-500"
                      : "border-gray-400"
                  } ${darkMode ? "border-gray-800" : "border-white"}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span
                  className={`font-semibold truncate ${darkMode ? "text-white" : "text-gray-800"}`}
                >
                  {chat.participants[0].nombre}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ENCABEZADO GRUPOS */}
      <div
        className={`p-4 border-b flex items-center justify-between ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h2
          className={`text-xl font-bold flex items-center gap-2 cursor-pointer ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
          onClick={() => setShowGroups(!showGroups)}
        >
          {showGroups ? <IoChevronDown /> : <IoChevronForward />}
          Grupos
        </h2>
        <button
          className={`p-2 rounded-full ${
            darkMode
              ? "text-gray-400 hover:text-white hover:bg-gray-700"
              : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
          }`}
          onClick={() => setCreateGroup(true)}
        >
          <CiCirclePlus size={28} />
        </button>
      </div>

      {/* LISTA GRUPOS */}
      {showGroups && (
        <ul className="flex-1 overflow-y-auto">
          {groups.length > 0 ? (
            groups.map((group) => (
              <li
                key={group.id}
                className={`flex items-center p-4 cursor-pointer border-l-4 ${
                  selectedGroup?.id === group.id
                    ? darkMode
                      ? "bg-blue-900 border-blue-500"
                      : "bg-blue-100 border-blue-600"
                    : darkMode
                    ? "hover:bg-gray-700 border-transparent"
                    : "hover:bg-gray-100 border-transparent"
                }`}
                onClick={() => onSelectGroup(group)}
              >
                <div className="relative mr-4">
                  {group.avatar ? (
                    <img
                      src={group.avatar}
                      alt={`Avatar de ${group.name}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <IoPersonCircle
                      className={`w-12 h-12 ${darkMode ? "text-gray-600" : "text-gray-400"}`}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`font-semibold truncate ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {group.nombre}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p className={`p-4 text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              No perteneces a ningun grupo.
            </p>
          )}
        </ul>
      )}

      {/* MODAL CREAR GRUPO */}
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
