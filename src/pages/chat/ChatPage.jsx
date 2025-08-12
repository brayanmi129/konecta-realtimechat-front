// src/pages/ChatPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "./components/UserList";
import MessageArea from "./components/MessageArea";
import MessageInput from "./components/MessageInput";
import { MdNotificationsNone, MdLogout, MdSearch, MdDarkMode, MdLightMode } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";

export default function ChatPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState([
    { id: 1, nick: "Juan", isOnline: true, avatar: "" },
    { id: 2, nick: "María", isOnline: false, avatar: "" },
    { id: 3, nick: "Pedro", isOnline: true, avatar: "" },
    { id: 4, nick: "Ana", isOnline: true, avatar: "" },
    { id: 5, nick: "Luis", isOnline: true, avatar: "" },
    { id: 6, nick: "Sofía", isOnline: true, avatar: "" },
    { id: 7, nick: "Carlos", isOnline: true, avatar: "" },
    { id: 8, nick: "Laura", isOnline: true, avatar: "" },
    { id: 9, nick: "David", isOnline: true, avatar: "" },
    { id: 10, nick: "Elena", isOnline: true, avatar: "" },
    { id: 11, nick: "Manuel", isOnline: true, avatar: "" },
    { id: 12, nick: "Isabel", isOnline: true, avatar: "" },
    { id: 13, nick: "Ricardo", isOnline: true, avatar: "" },
    { id: 14, nick: "Lucía", isOnline: true, avatar: "" },
  ]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const nick = localStorage.getItem("nick");
    if (!nick) {
      navigate("/");
    } else {
      setCurrentUser(nick);
    }
  }, [navigate]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([
      {
        text: "¡Hola! ¿Cómo estás?",
        sender: user.nick,
        receiver: currentUser,
        timestamp: "10:00 AM",
      },
      {
        text: "Todo bien, ¿y tú?",
        sender: currentUser,
        receiver: user.nick,
        timestamp: "10:01 AM",
      },
    ]);
  };

  const handleSendMessage = (messageText) => {
    if (messageText.trim() === "") return;
    const newMessage = {
      text: messageText,
      sender: currentUser,
      receiver: selectedUser.nick,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
  };

  const handleLogout = () => {
    localStorage.removeItem("nick");
    navigate("/");
  };

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
    >
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
            onSelectUser={handleSelectUser}
            selectedUser={selectedUser}
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

      <div
        className={`w-3/4 flex flex-col ${
          darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
        }`}
      >
        {selectedUser ? (
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
                  {selectedUser.nick}
                </h2>
              </div>
            </div>
            <MessageArea messages={messages} currentUser={currentUser} darkMode={darkMode} />
            <MessageInput onSendMessage={handleSendMessage} darkMode={darkMode} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <h1 className="text-3xl font-bold mb-4">¡Bienvenido!</h1>
            <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Selecciona un usuario de la lista para empezar a chatear.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
