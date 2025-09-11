import { render, screen } from '@testing-library/react';
import CTASection from '@/components/home/CTASection';

describe('CTASection', () => {
  it('renderiza título, texto e botão', () => {
    render(<CTASection />);
    
    expect(screen.getByText(/Pronto para transformar seus logs em insights/i)).toBeInTheDocument();
    expect(screen.getByText(/Registre-se hoje/i)).toBeInTheDocument();
    const button = screen.getByRole('link', { name: /Criar conta grátis/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/register');
  });
});
