// src/components/UploadLayout.jsx
import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa"; // Nuevo ícono para la subida de archivos

export default function UploadLayout({ darkMode, onClose, onUploadFile }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUploadFile(file);
      setFile(null);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        className={`p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-4 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800 text-gray-100 border-gray-700"
            : "bg-white text-gray-900 border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Subir Archivo</h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-full transition-colors duration-300 ${
              darkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            }`}
          >
            <IoCloseCircleOutline size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`h-full w-full flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed cursor-pointer transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                : "bg-gray-50 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FaFileUpload
              className={`text-6xl mb-2 transition-colors duration-300 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <p className="text-lg font-semibold text-center">Arrastra y suelta tu archivo aquí</p>
            <p className={`text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              o haz clic para seleccionar un archivo
            </p>
            <div className="relative w-full h-full">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />
            </div>
          </div>

          {file && (
            <div
              className={`p-4 rounded-lg transition-colors duration-300 ${
                darkMode ? "bg-gray-700 text-white" : "bg-blue-100 text-blue-800"
              }`}
            >
              <p className="font-semibold truncate">Archivo seleccionado:</p>
              <span className="text-sm">{file.name}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-600 text-white hover:bg-gray-500"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!file}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-300 ${
                !file
                  ? "bg-gray-400 cursor-not-allowed"
                  : darkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Subir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
