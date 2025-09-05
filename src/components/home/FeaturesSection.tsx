import React from 'react';
import Image from 'next/image';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  step: number;
}

const FeatureCard = ({ icon, title, description, step }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-6">
        <Image
          src={icon}
          alt={`${title} icon`}
          width={32}
          height={32}
          className="dark:invert"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3">{step}. {title}</h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default function FeaturesSection() {
  const features = [
    {
      icon: '/file.svg',
      title: 'Conecte via API',
      description: 'Integre facilmente com nossa API REST para enviar logs do seu sistema em tempo real.',
      step: 1
    },
    {
      icon: '/globe.svg',
      title: 'Centralize seus dados',
      description: 'Todos os seus logs são armazenados de forma segura e organizados para fácil acesso.',
      step: 2
    },
    {
      icon: '/window.svg',
      title: 'Obtenha insights',
      description: 'Converse com nosso chatbot via WhatsApp para receber análises e insights sobre seus dados.',
      step: 3
    }
  ];

  return (
    <section id="como-funciona" className="py-16 px-6 sm:px-10 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Como o Logzone funciona</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.step}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              step={feature.step}
            />
          ))}
        </div>
      </div>
    </section>
  );
}