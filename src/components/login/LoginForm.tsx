'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormInput from '../ui/FormInput';
import { Button } from '../ui/Button';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
            
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
            
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }
        
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulação de envio para API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulação de sucesso
      setSubmitSuccess(true);
      
      // Limpar formulário
      setFormData({
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setErrors({
        form: 'Ocorreu um erro ao processar seu cadastro. Tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    // Redirecionar para a página de projetos após login bem-sucedido
    if (typeof window !== 'undefined') {
      window.location.href = '/projects';
    }
    
    return (
      <div className="text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900">
          <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Login efetuado com sucesso!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enviamos um email de confirmação para você. Por favor, verifique sua caixa de entrada para ativar sua conta.
        </p>
        {/* <Button as="link" href="/" variant="primary" size="lg">
          Voltar para Home
        </Button> */}
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Crie sua conta</h2>
      
      {errors.form && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        
        <FormInput
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        
        <FormInput
          id="password"
          name="password"
          label="Senha"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
                
        <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth
          className="mt-2 mb-6"
        >
          {isSubmitting ? 'Processando...' : 'Criar conta'}
        </Button>
      </form>
      
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Já tem uma conta?{' '}
        <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </>
  );
}