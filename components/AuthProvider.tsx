"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  affiliateCode: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login for development
    if (email === 'admin@raziatech.com' && password === 'admin123') {
      setUser({
        id: '1',
        email,
        name: 'Admin User',
        role: 'ADMIN',
        affiliateCode: 'ADMIN001'
      });
      return true;
    }
    
    if (email === 'affiliate@test.com' && password === 'affiliate123') {
      setUser({
        id: '2',
        email,
        name: 'Test Affiliate',
        role: 'AFFILIATE',
        affiliateCode: 'AFF001'
      });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration
    setUser({
      id: Math.random().toString(),
      email,
      name,
      role: 'AFFILIATE',
      affiliateCode: Math.random().toString(36).substring(2, 10).toUpperCase()
    });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
