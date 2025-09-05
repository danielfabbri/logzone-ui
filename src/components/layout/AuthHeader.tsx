import Link from 'next/link';
import { useState } from 'react';

interface AuthHeaderProps {
  username: string;
}

export default function AuthHeader({ username }: AuthHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 px-6 sm:px-10 flex justify-between items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="flex items-center">
        <Link href="/projects" className="text-2xl font-bold">Logzone</Link>
      </div>
      <nav className="flex items-center gap-6">
        <Link href="/projects" className="font-medium hover:text-blue-600 dark:hover:text-blue-400">
          Projetos
        </Link>
        <div className="relative">
          <button 
            onClick={toggleMenu}
            className="flex items-center gap-2 font-medium hover:text-blue-600 dark:hover:text-blue-400"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              {username.charAt(0).toUpperCase()}
            </div>
            <span>{username}</span>
          </button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-800">
              <Link 
                href="/logout" 
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Sair
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}