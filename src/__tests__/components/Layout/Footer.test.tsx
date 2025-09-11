import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer', () => {
  it('renderiza o footer corretamente', () => {
    render(<Footer />);

    // Verifica o título principal
    expect(screen.getByText('Logzone')).toBeInTheDocument();

    // Verifica se o texto do parágrafo está lá
    expect(
      screen.getByText(/Centralize seus logs e obtenha insights valiosos/i)
    ).toBeInTheDocument();

    // Verifica se alguns links existem
    expect(screen.getByText('Recursos')).toBeInTheDocument();
    expect(screen.getByText('Preços')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Sobre nós')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText('Termos de Serviço')).toBeInTheDocument();
    expect(screen.getByText('Política de Privacidade')).toBeInTheDocument();

    // Verifica se o copyright do ano atual está presente
    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()} Logzone`, 'i'))
    ).toBeInTheDocument();
  });
});
