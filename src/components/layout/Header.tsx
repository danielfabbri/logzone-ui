import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 px-6 sm:px-10 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold">Logzone</Link>
      </div>
      <nav className="flex items-center gap-6">
        <Link href="/" className="font-medium hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </Link>
        <Link href="/documentation" className="font-medium hover:text-blue-600 dark:hover:text-blue-400">
          Documentation
        </Link>
        <Link href="/register" className="font-medium hover:text-blue-600 dark:hover:text-blue-400">
          Registrar
        </Link>
        <Link 
          href="/login" 
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 font-medium transition-colors"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}