// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";

export default function Login() {
  const [nick, setNick] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLError = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleLogin = () => {
    if (nick.trim() === "") {
      handleLError("Por favor, ingresa un nombre.");
    } else {
      localStorage.setItem("nick", nick);
      navigate("/chat");
    }
  };

  return (
    <div className="h-screen w-screen bg-[rgb(40,0,200)]">
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow w-80">
          <h1 className="text-2xl font-bold mb-4 text-center">Ingresar al Chat</h1>
          <input
            type="text"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            placeholder="Tu nombre o nick"
            className="w-full border rounded p-2 mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-[rgb(40,0,200)] text-white py-2 rounded"
          >
            Entrar
          </button>
        </div>
      </div>
      {error && <Popup mensaje={error} colorFondo="#f44336" />}
    </div>
  );
}
