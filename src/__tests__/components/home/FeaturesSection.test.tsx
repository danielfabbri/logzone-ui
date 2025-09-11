import { render, screen } from '@testing-library/react';
import FeaturesSection from '@/components/home/FeaturesSection';

describe('FeaturesSection', () => {
  it('renderiza título e todos os cards de features', () => {
    render(<FeaturesSection />);

    // Título da seção
    expect(screen.getByText(/Como o Logzone funciona/i)).toBeInTheDocument();

    // Cards
    expect(screen.getByText(/Conecte via API/i)).toBeInTheDocument();
    expect(screen.getByText(/Centralize seus dados/i)).toBeInTheDocument();
    expect(screen.getByText(/Obtenha insights/i)).toBeInTheDocument();

    // Descrições
    expect(screen.getByText(/Integre facilmente com nossa API REST/i)).toBeInTheDocument();
    expect(screen.getByText(/Todos os seus logs são armazenados/i)).toBeInTheDocument();
    expect(screen.getByText(/Converse com nosso chatbot via WhatsApp/i)).toBeInTheDocument();
  });
});
