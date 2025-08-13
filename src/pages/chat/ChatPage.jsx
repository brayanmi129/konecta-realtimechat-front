// src/pages/ChatPage.jsx
import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "./components/UserList";
import MessageArea from "./components/MessageArea";
import MessageInput from "./components/MessageInput";
import { MdNotificationsNone, MdLogout, MdSearch, MdDarkMode, MdLightMode } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import utils from "../../utils/chatFunctions";

export default function ChatPage() {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState([
    { id: 1, nombre: "Juan", isOnline: true, avatar: "" },
    { id: 2, nombre: "María", isOnline: false, avatar: "" },
    { id: 3, nombre: "Pedro", isOnline: true, avatar: "" },
    { id: 4, nombre: "Ana", isOnline: true, avatar: "" },
    { id: 5, nombre: "Luis", isOnline: true, avatar: "" },
    { id: 6, nombre: "Sofía", isOnline: true, avatar: "" },
    { id: 7, nombre: "Carlos", isOnline: true, avatar: "" },
    { id: 8, nombre: "Laura", isOnline: true, avatar: "" },
    { id: 9, nombre: "David", isOnline: true, avatar: "" },
    { id: 10, nombre: "Elena", isOnline: true, avatar: "" },
    { id: 11, nombre: "Manuel", isOnline: true, avatar: "" },
    { id: 12, nombre: "Isabel", isOnline: true, avatar: "" },
    { id: 13, nombre: "Ricardo", isOnline: true, avatar: "" },
    { id: 14, nombre: "Lucía", isOnline: true, avatar: "" },
  ]);

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Grupo de Amigos",
      members: [{ nombre: "Juan" }, { nombre: "María" }, { nombre: "Pedro" }],
    },
    {
      id: 2,
      name: "Grupo de Trabajo",
      members: [{ nombre: "Luis" }, { nombre: "Sofía" }, { nombre: "Carlos" }],
    },
    {
      id: 3,
      name: "Grupo Familiar",
      members: [{ nombre: "Ana" }, { nombre: "Elena" }, { nombre: "Manuel" }],
    },
  ]);

  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    } else {
      setCurrentUser(user.nombre);
      const UserList = await utils.getConnected();
      setOnlineUsers(UserList[0]);
    }
  }, [navigate, users]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    console.log("Usuario seleccionado:", user);
    setSelectedGroup(null);

    // Ejemplo: aquí luego traerías mensajes desde backend con currentUser y user.nombre
    setMessages([
      {
        text: "¡Hola! ¿Cómo estás?",
        sender: user.nombre,
        receiver: currentUser,
        timestamp: "10:00 AM",
      },
      {
        text: "Todo bien, ¿y tú?",
        sender: currentUser,
        receiver: user.nombre,
        timestamp: "10:01 AM",
      },
    ]);
  };

  const handleGroup = (group) => {
    setSelectedGroup(group);
    setSelectedUser(null);

    // Ejemplo: aquí luego traerías mensajes desde backend con group.name
    setMessages([
      {
        text: "¡Hola! ¿Cómo estás?",
        sender: group.members[0].nombre,
        receiver: group.name,
        timestamp: "10:00 AM",
      },
      {
        text: "Todo bien, ¿y tú?",
        sender: currentUser,
        receiver: group.name,
        timestamp: "10:01 AM",
      },
    ]);
  };

  const handleSendMessage = (messageText) => {
    if (messageText.trim() === "") return;

    const receiver = selectedUser ? selectedUser.nombre : selectedGroup?.name;

    const newMessage = {
      text: messageText,
      sender: currentUser,
      receiver,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
  };

  const handleLogout = () => {
    localStorage.removeItem("nombre");
    navigate("/");
  };

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Panel lateral */}
      <div
        className={`w-1/4 flex flex-col border-r ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } bg-[rgb(40,0,200)]`}
        >
          <h2 className="text-2xl font-bold text-white">Konecta ChatApp</h2>
          <button className="text-white hover:text-yellow-300 transition-colors">
            <MdNotificationsNone size={24} />
          </button>
        </div>

        <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="relative">
            <MdSearch
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className={`w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                  : "bg-white border-gray-300 placeholder-gray-400"
              }`}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <UserList
            users={users}
            groups={groups}
            onSelectGroup={handleGroup}
            onSelectUser={handleSelectUser}
            selectedUser={selectedUser}
            selectedGroup={selectedGroup}
            darkMode={darkMode}
          />
        </div>

        <div
          className={`p-5 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } flex items-center justify-between`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[rgb(40,0,200)] rounded-full flex items-center justify-center text-white font-bold">
              {currentUser.charAt(0).toUpperCase()}
            </div>
            <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
              {currentUser}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              className={`p-2 ${
                darkMode
                  ? "text-gray-400 hover:text-yellow-400"
                  : "text-gray-500 hover:text-yellow-500"
              } transition-colors rounded-full`}
              title="Alternar tema"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
            </button>
            <button
              onClick={handleLogout}
              className={`p-2 ${
                darkMode ? "text-gray-400 hover:text-red-400" : "text-gray-500 hover:text-red-500"
              } transition-colors rounded-full`}
              title="Cerrar sesión"
            >
              <MdLogout size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Área de chat */}
      <div
        className={`w-3/4 flex flex-col ${
          darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
        }`}
      >
        {selectedUser || selectedGroup ? (
          <>
            <div
              className={`flex items-center justify-between p-4 border-b shadow-sm ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-4">
                <IoPersonCircle
                  className={`w-12 h-12 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
                />
                <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>
                  {selectedUser ? selectedUser.nombre : selectedGroup?.name}
                </h2>
              </div>
            </div>
            <MessageArea
              messages={messages}
              currentUser={currentUser}
              darkMode={darkMode}
              isGroup={!!selectedGroup}
            />

            <MessageInput onSendMessage={handleSendMessage} darkMode={darkMode} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h1 className="text-3xl font-bold mb-4">¡Bienvenido!</h1>
            <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Selecciona un usuario o grupo de la lista para empezar a chatear.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
