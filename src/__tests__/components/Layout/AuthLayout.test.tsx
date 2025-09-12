import { render, screen } from '@testing-library/react';
import AuthLayout from '@/components/layout/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';

jest.mock('@/contexts/AuthContext');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('AuthLayout', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'Wendell' },
      logout: jest.fn(),
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renderiza o AuthHeader, Footer e children', () => {
    render(
      <AuthLayout >
        <div>Conteúdo teste</div>
      </AuthLayout>
    );

    // Verifica se o nome do usuário aparece no header
    expect(screen.getByText('Wendell')).toBeInTheDocument();

    // Verifica se o conteúdo filho aparece
    expect(screen.getByText('Conteúdo teste')).toBeInTheDocument();

    // Verifica se o footer existe (um texto que sempre está lá)
    expect(screen.getByText(/Centralize seus logs/i)).toBeInTheDocument();
  });
});
