import React, { createContext, useContext, useState, useEffect } from "react";
import { AdminInfo } from "@/lib/adminApi";

interface AuthContextType {
  adminInfo: AdminInfo | null;
  login: (data: AdminInfo) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminInfo");
    if (storedAdmin) {
      setAdminInfo(JSON.parse(storedAdmin));
    }
  }, []);

  const login = (data: AdminInfo) => {
    setAdminInfo(data);
    localStorage.setItem("adminInfo", JSON.stringify(data));
  };

  const logout = () => {
    setAdminInfo(null);
    localStorage.removeItem("adminInfo");
  };

  return (
    <AuthContext.Provider value={{ adminInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
