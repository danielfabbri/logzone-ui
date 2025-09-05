import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-10 px-6 sm:px-10 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Logzone</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Centralize seus logs e obtenha insights valiosos através do nosso chatbot no WhatsApp.
          </p>
        </div>
        
        <div>
          <h4 className="text-md font-semibold mb-4">Produto</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Recursos
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Preços
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-md font-semibold mb-4">Empresa</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Contato
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-md font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Termos de Serviço
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Logzone. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}