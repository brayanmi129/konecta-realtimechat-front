import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import UploadLayout from "./UploadLayout"; // Assuming you have an UploadLayout component

export default function MessageInput({ onSendMessage, darkMode }) {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (file) => {
    console.log("Archivo listo para subir:", file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    onSendMessage(message);
    setMessage("");
  };

  const handleUploading = (e) => {
    setIsUploading(true);
  };

  const handleCloseUpload = () => {
    setIsUploading(false);
  };

  return (
    <div
      className={`p-4 border-t ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className={`flex-1 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
              : "bg-gray-100 text-gray-800 border border-gray-400 placeholder-gray-400"
          }`}
        />
        <button
          className="bg-transparent p-3 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={handleUploading}
        >
          <IoMdAttach size={24} />
        </button>
        <button
          type="submit"
          className="bg-[rgb(40,0,200)] text-white p-3 rounded-lg hover:bg-[rgb(50,0,220)] transition-colors"
        >
          <IoSend />
        </button>
      </form>

      {isUploading && (
        <UploadLayout
          darkMode={darkMode}
          onClose={handleCloseUpload}
          onUploadFile={handleFileUpload}
        >
          {" "}
        </UploadLayout>
      )}
    </div>
  );
}
