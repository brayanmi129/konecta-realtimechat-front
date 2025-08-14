// src/pages/ChatPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "./components/UserList";
import MessageArea from "./components/MessageArea";
import MessageInput from "./components/MessageInput";
import { MdNotificationsNone, MdLogout, MdSearch, MdDarkMode, MdLightMode } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import io from "socket.io-client";

export default function ChatPage() {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [chatSelected, setChatSelected] = useState(null);

  const socketRef = useRef(null);
  const chatSelectedRef = useRef(chatSelected);

  useEffect(() => {
    chatSelectedRef.current = chatSelected;
  }, [chatSelected]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    setCurrentUser(user);

    if (!socketRef.current) {
      const socketInstance = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000");
      socketRef.current = socketInstance;

      socketRef.current.emit("login", { id: user.id, nombre: user.nombre });

      socketRef.current.on("onlineUsers", (users) => {
        const filteredUsers = users.filter((useronline) => useronline.id !== user.id);
        setOnlineUsers(filteredUsers);
      });

      socketRef.current.on("groups", (newGroups) => {
        setGroups(newGroups);
      });

      socketRef.current.on("messageToChat", (newMessage) => {
        console.log("Nuevo mensaje", newMessage);
        if (chatSelectedRef.current && newMessage?.chat_id === chatSelectedRef.current) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [navigate]);

  useEffect(() => {
    if (!chatSelected || !socketRef.current) return;

    socketRef.current.emit("joinChat", chatSelected);

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leaveChat", chatSelected);
      }
    };
  }, [chatSelected]);

  const handleSelectUser = (user) => {
    console.log("Usuario seleccionado", user);
    setSelectedUser(user);
    setSelectedGroup(null);
    setMessages([]);

    if (!socketRef.current) return;

    socketRef.current.emit(
      "getMessages",
      { currentUserId: currentUser.id, otherUserId: user.id },
      (chatInfo) => {
        console.log("Infooo chat", chatInfo);
        if (chatInfo && chatInfo.messages && chatInfo.chatId) {
          setMessages(chatInfo.messages);
          setChatSelected(chatInfo.chatId);
        } else {
          console.warn("Respuesta inválida de getMessages", chatInfo);
        }
      }
    );
  };

  const handleGroup = (group) => {
    setSelectedGroup(group);
    setSelectedUser(null);
    setMessages([]);

    if (!socketRef.current) return;

    const chatId = group.id;
    setChatSelected(chatId);

    socketRef.current.emit(
      "getMessages",
      { id: chatId, isGroup: true, currentUserId: currentUser.id },
      (chatInfo) => {
        console.log("Infoooo grupo", chatInfo);
        if (chatInfo && chatInfo.messages && chatInfo.chatId) {
          setMessages(chatInfo.messages);
          setChatSelected(chatInfo.chatId);
        } else {
          console.warn("Respuesta inválida de getMessages", chatInfo);
        }
      }
    );
  };

  const handleSendMessage = (messageText) => {
    if (!messageText.trim() || !socketRef.current || !chatSelected) return;

    const newMessage = {
      chat_id: chatSelected,
      usuario_id: currentUser.id,
      contenido: messageText,
      archivo_url: null,
      archivo_tipo: null,
      archivo_nombre: null,
      creado: new Date().toISOString(),
      sender_name: currentUser.nombre,
    };

    socketRef.current.emit("sendMessage", newMessage);
  };

  const handleLogout = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    localStorage.removeItem("user");
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
        {/* Header */}
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

        {/* Search */}
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

        {/* Lista de usuarios y grupos */}
        <div className="flex-1 overflow-y-auto">
          <UserList
            users={onlineUsers}
            groups={groups}
            onSelectGroup={handleGroup}
            onSelectUser={handleSelectUser}
            selectedUser={selectedUser}
            selectedGroup={selectedGroup}
            darkMode={darkMode}
          />
        </div>

        {/* Footer */}
        <div
          className={`p-5 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } flex items-center justify-between`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[rgb(40,0,200)] rounded-full flex items-center justify-center text-white font-bold">
              {currentUser?.nombre.charAt(0).toUpperCase()}
            </div>
            <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
              {currentUser?.nombre}
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
