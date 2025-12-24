import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setInitialLoading(false);
  }, []);

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const res = await axios.post("/auth/login", { email, password });

      const { token, role, name, _id } = res.data;
      const userData = { _id, name, email, role };

      setToken(token);
      setUser(userData);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading: authLoading,
        isAdmin: user?.role === "admin",
        isUser: user?.role === "user",
      }}
    >
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
