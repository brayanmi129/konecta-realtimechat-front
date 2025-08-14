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
};

export default utils;
