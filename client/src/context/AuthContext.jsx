import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AUTH_API_URL } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const logout = async () => {
    try {
      await axios.post(`${AUTH_API_URL}/logout`, {}, { withCredentials: true });
    } catch (err) {
      // ignore network errors but still clear local state
    } finally {
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
