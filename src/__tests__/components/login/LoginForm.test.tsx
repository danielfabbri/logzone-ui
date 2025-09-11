import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/login/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

// Mock do toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock do useAuth
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock do useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginForm', () => {
  const pushMock = jest.fn();
  const loginMock = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ login: loginMock });
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza campos de email e senha', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
  });

  it('valida campos vazios', async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    expect(await screen.findByText('Email é obrigatório')).toBeInTheDocument();
    expect(await screen.findByText('Senha é obrigatória')).toBeInTheDocument();
  });

  it('chama login e redireciona ao submeter formulário válido', async () => {
    loginMock.mockResolvedValueOnce(undefined); // simula login bem-sucedido

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'teste@teste.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: '12345678' } });

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    // Espera login ser chamado
    await waitFor(() => {
        expect(loginMock).toHaveBeenCalledWith('teste@teste.com', '12345678');
    });

    // Espera push do router ser chamado
    await waitFor(() => {
        expect(pushMock).toHaveBeenCalledWith('/projects');
    });
  });
});
