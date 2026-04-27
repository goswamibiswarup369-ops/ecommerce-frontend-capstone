import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AUTH_KEY = "ecom_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    else localStorage.removeItem(AUTH_KEY);
  }, [user]);

  const login = (fakeUser) => setUser(fakeUser);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
