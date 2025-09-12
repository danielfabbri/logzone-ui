'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormInput from '../ui/FormInput';
import { Button } from '../ui/Button';
import axios from 'axios';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Nome da empresa é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        company: formData.company
      });
      
      console.log('Usuário criado:', response.data);
  
      setSubmitSuccess(true);
  
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        company: '',
      });
    } catch (error: unknown) {
       let message = 'Ocorreu um erro ao processar seu cadastro.';

        if (axios.isAxiosError(error)) {
          // Se for erro do Axios
          message = error.response?.data?.message || message;
        } else if (error instanceof Error) {
          // Qualquer outro erro JS
          message = error.message;
        }

        console.error('Erro ao criar usuário:', message);

        setErrors({ form: message });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (submitSuccess) {
    return (
      <div className="text-center">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900">
          <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Cadastro realizado com sucesso!</h2>
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
          id="name"
          name="name"
          label="Nome completo"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        
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
          id="company"
          name="company"
          label="Empresa"
          value={formData.company}
          onChange={handleChange}
          error={errors.company}
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
        
        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar senha"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
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
        <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
          Faça login
        </Link>
      </p>
    </>
  );
}