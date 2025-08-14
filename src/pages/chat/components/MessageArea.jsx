import React, { useEffect, useRef } from "react";

export default function MessageArea({ messages, currentUser, darkMode, isGroup }) {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      console.log(messages);
    }
  }, [messages]);
  return (
    <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {messages.map((message, index) => {
        const isOwnMessage = message.usuario_id === currentUser.id;

        // Si el contenido es null y hay una url, mostrar la imagen
        if (message.contenido === null && message.archivo_url) {
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
                {isGroup && !isOwnMessage && (
                  <p className="font-bold mb-1">{message.usuario_nombre}</p>
                )}
                <img
                  src={message.archivo_url}
                  alt="Imagen enviada"
                  className="max-w-full h-auto rounded mb-2"
                />
                <span className="block text-right text-xs mt-1 opacity-70">
                  {new Date(message.creado).toLocaleString("es-CO", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
            </div>
          );
        }

        // Si no, mostrar el mensaje de texto como antes
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
              {isGroup && !isOwnMessage && (
                <p className="font-bold mb-1">{message.usuario_nombre}</p>
              )}

              <p>{message.contenido}</p>
              <span className="block text-right text-xs mt-1 opacity-70">
                {new Date(message.creado).toLocaleString("es-CO", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
