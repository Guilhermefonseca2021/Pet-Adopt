import api from "../utils/api";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export const useAuth = () => ({
  login: async (email: string, password: string) => {
    const response = await api.post("/users/login", { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string, confirmpassword: string, phone: string) => {
    const response = await api.post("/users/register", { name, email, password, confirmpassword, phone});
    return response.data;
  },
});
