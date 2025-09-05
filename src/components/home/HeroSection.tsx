import React from 'react';
import { LinkButton } from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
        Centralize seus logs.<br />
        <span className="text-blue-600 dark:text-blue-400">Obtenha insights.</span>
      </h1>
      <p className="text-lg sm:text-xl max-w-2xl mb-10 text-gray-600 dark:text-gray-300">
        Conecte-se via REST API para registrar e centralizar os logs do seu sistema. 
        Acesse insights via chatbot no WhatsApp e tome decisões baseadas em dados.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <LinkButton href="/register" size="lg">
          Começar agora
        </LinkButton>
        <LinkButton href="#como-funciona" variant="outline" size="lg">
          Como funciona
        </LinkButton>
      </div>
    </section>
  );
}