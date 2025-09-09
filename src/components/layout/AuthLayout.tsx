import React from 'react';
import AuthHeader from './AuthHeader';
import Footer from './Footer';
import { useAuth } from '@/contexts/AuthContext';

interface AuthLayoutProps {
  children: React.ReactNode;
  username: string;
}

export default function AuthLayout({ children, username }: AuthLayoutProps) {
  const { user } = useAuth(); // pega o usuário logado do contexto

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AuthHeader username={user?.name || 'Visitante'} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}