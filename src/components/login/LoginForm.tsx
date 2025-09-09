'use client';

import { useState } from 'react';
import Link from 'next/link';
import FormInput from '../ui/FormInput';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext'; // ✅ importar contexto
import { AxiosError } from 'axios';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();
  const { login } = useAuth(); // ✅ pegar função login do contexto
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Senha é obrigatória';
    else if (formData.password.length < 8) newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password); // ✅ login pelo contexto
      toast.success('Login efetuado com sucesso!');
      router.push('/projects'); // redireciona após login
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error('Erro ao efetuar login:', axiosError);
      toast.error(axiosError.response?.data?.message || 'Email ou senha incorretos');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Faça login</h2>
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
        <Button type="submit" disabled={isSubmitting} fullWidth>
          {isSubmitting ? 'Processando...' : 'Entrar'}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
        Ainda não tem conta?{' '}
        <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </>
  );
}
