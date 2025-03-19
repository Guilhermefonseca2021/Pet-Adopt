import api from "../utils/api";

export const petControllers = () => ({
  getAllPets: async () => {
    const response = await api.get("/pets");
    if (response) {
      return response.data;
    }
  },
});
