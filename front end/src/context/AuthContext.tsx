import { createContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { useAuth } from "../hooks/useAuth";

export type AuthContextType = {
  user: User | null;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState();
  console.log(token);
  const api = useAuth();

  useEffect(() => {});

  async function login(email: string, password: string) {
    const data = await api.login(email, password);
    if (data) {
      setUser(data.user);
      setToken(data.token);

      return true;
    }

    return false;
  }
  
  async function register(name: string, email: string, password: string) {
    const data = await api.register(name, email, password);

    if (data.user) {
      setUser(data.user);
      setToken(data.token);
      return true;
    }

    return false;
  }

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}
