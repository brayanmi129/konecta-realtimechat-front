import React, { useEffect, useRef } from "react";

export default function MessageArea({ messages, currentUser, darkMode, isGroup }) {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {messages.map((message, index) => {
        const isOwnMessage = message.usuario_id === currentUser.id;

        return (
          <div
            key={index}
            className={`flex mb-4 ${isOwnMessage ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg max-w-sm ${
                isOwnMessage
                  ? `bg-[rgb(40,0,200)] text-white ${darkMode ? "bg-[rgb(50,0,220)]" : ""}`
                  : `${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"}`
              }`}
            >
              {/* 👇 En grupos, si no es tu mensaje, muestra quién lo envió */}
              {isGroup && !isOwnMessage && <p className="font-bold mb-1">{message.usuario_id}</p>}

              <p>{message.contenido}</p>
              <span className="block text-right text-xs mt-1 opacity-70">{message.creado}</span>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
