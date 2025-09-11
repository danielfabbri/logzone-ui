import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/home/HeroSection';

describe('HeroSection', () => {
  it('renderiza título, descrição e botões', () => {
    render(<HeroSection />);

    // Título principal
    expect(screen.getByText(/Centralize seus logs/i)).toBeInTheDocument();
    expect(screen.getByText(/Obtenha insights/i)).toBeInTheDocument();

    // Descrição
    expect(screen.getByText(/Conecte-se via REST API para registrar/i)).toBeInTheDocument();
    expect(screen.getByText(/Acesse insights via chatbot no WhatsApp/i)).toBeInTheDocument();

    // Botões
    expect(screen.getByRole('link', { name: /Começar agora/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Como funciona/i })).toBeInTheDocument();
  });
});
