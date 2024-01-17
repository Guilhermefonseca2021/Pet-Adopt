import api from "../utils/api";

export const useAuth = () => ({
  validateToken: async (token: string) => {
    try {
      const response = await api.get(`/users/checkuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Erro ao validar token:", error);
    }
  },
  login: async (email: string, password: string) => {
    const response = await api.post("/users/login", { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string, confirmpassword: string, phone: string) => {
    const response = await api.post("/users/register", { name, email, password, confirmpassword, phone});
    return response.data;
  },
  logout: async () => {
    const response = await api.post("/users/logout");
    return response.data;
  },
  updateUser: async (image: File, name: string, email: string, password: string, confirmpassword: string, phone: string) => {
    const response = await api.patch('/users/edit/:id', { image, name, email, password, confirmpassword, phone});
    return response.data;
  },
});
