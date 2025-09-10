// src/contexts/AuthContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('user');
            return saved ? JSON.parse(saved) : null;
        }
        return null;
    });
    const [token, setToken] = useState<string | null>(null);

  // Carrega token do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    }
  }, []);

  const fetchUser = async (jwt: string) => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/auth/me', {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:3000/api/v1/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export function useAuth() {
const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
