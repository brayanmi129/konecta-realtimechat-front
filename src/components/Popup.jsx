import React from "react";

const Popup = ({ mensaje, colorFondo = "#333" }) => {
  return (
    <div
      className="fixed top-5 right-5 z-50 min-w-[200px] px-6 py-4 rounded shadow-lg text-white text-base"
      style={{ backgroundColor: colorFondo }}
    >
      {mensaje}
    </div>
  );
};

export default Popup;
