import { createContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { useAuth } from "../hooks/useAuth";

export type AuthContextType = {
  user: User | null;
  register: (name: string, email: string, password: string, confirmpassword: string, phone: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (image: File, name: string, email: string, password: string, confirmpassword: string, phone: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const api = useAuth();

  useEffect(() => {
    async function validateToken() {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken(storageData);

        if (data.user) {
          setUser(data.user);
        }
      }
    }
    validateToken();
  }, [api]);

  async function login(email: string, password: string) {
    const data = await api.login(email, password);
    if (data) {
      setUser(data.user);
      setToken(data.token);
      return true;
    }
    
    return false;
  }

  async function setToken(token: string) {
    localStorage.setItem("authToken", token);
  }
  
  async function register(name: string, email: string, password: string, confirmpassword: string, phone: string) {
    const data = await api.register(name, email, password, confirmpassword, phone);

    if (data) {
      setUser(data.user);
      setToken(data.token);
      return true;
    }

    return false;
  }

  async function logout() {
    await api.logout();
    setUser(null);
  }

  async function updateUser(image: File, name: string, email: string, password: string, confirmpassword: string, phone: string) {
    const data = await api.updateUser(image, name, email, password, confirmpassword, phone);
    
    if (data) {
      setUser(data.user);
      setToken(data.token);

      return true;
    }

    return false;
  }

  return (
    <AuthContext.Provider value={{ user, updateUser, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
