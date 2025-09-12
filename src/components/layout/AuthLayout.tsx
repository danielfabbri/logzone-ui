import React from 'react';
import AuthHeader from './AuthHeader';
import Footer from './Footer';


interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AuthHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}