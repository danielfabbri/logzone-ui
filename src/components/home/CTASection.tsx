import React from 'react';
import { LinkButton } from '../ui/Button';

export default function CTASection() {
  return (
    <section className="py-16 px-6 sm:px-10 bg-blue-600 dark:bg-blue-800 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Pronto para transformar seus logs em insights?</h2>
        <p className="text-xl mb-8">Registre-se hoje e comece a centralizar seus logs.</p>
        <LinkButton 
          href="/register" 
          variant="secondary"
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          Criar conta grátis
        </LinkButton>
      </div>
    </section>
  );
}