import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthHeader from '@/components/layout/AuthHeader';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

// Mock do useAuth
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock do useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('AuthHeader', () => {
  const pushMock = jest.fn();
  const logoutMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'Wendell' },
      logout: logoutMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('mostra menu do usuário quando logado e executa ações', async () => {
    const user = userEvent.setup();

    render(<AuthHeader username="Wendell" />);

    // Botão do usuário
    const userButton = screen.getByRole('button', { name: /Wendell/i });
    await user.click(userButton);

    // Clica em "Perfil" e verifica navegação
    const perfilButton = await screen.findByRole('button', { name: 'Perfil' });
    await user.click(perfilButton);
    expect(pushMock).toHaveBeenCalledWith('/account');

    // Reabre o menu para clicar em "Sair"
    await user.click(userButton);

    // Botão "Sair"
    const sairButton = await screen.findByRole('button', { name: 'Sair' });
    await user.click(sairButton);
    expect(logoutMock).toHaveBeenCalled();
  });

  it('mostra link de login quando não há usuário', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    render(<AuthHeader username="" />);
    const loginLink = screen.getByRole('link', { name: 'Entrar' });
    expect(loginLink).toBeInTheDocument();
  });
});
