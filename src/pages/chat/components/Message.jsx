import React from "react";

export default function Message({ message, currentUser }) {
  const isSentByCurrentUser = message.sender === currentUser;

  return (
    <div className={`flex mb-4 ${isSentByCurrentUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isSentByCurrentUser ? "bg-[rgb(40,0,200)] text-white" : "bg-gray-300 text-black"
        }`}
      >
        <div className="text-sm">{message.text}</div>
        <div className="text-xs text-right mt-1 opacity-75">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
