import axios from "axios";

const utils = {
  createUser: async (nombre) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user`, { nombre });
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  },

  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log(formData);

      // Enviar el archivo al backend
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/uploadMedia`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.url) {
        return response.data.url;
      } else {
        throw new Error("El servidor no devolvió una URL válida");
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      throw error;
    }
  },
};

export default utils;
