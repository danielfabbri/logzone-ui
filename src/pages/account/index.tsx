import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/components/layout/AuthLayout";
import toast from "react-hot-toast";
import api from "@/services/apiService";

export default function AccountPage() {
  const { user, updateUser } = useAuth(); // se você tiver uma função para atualizar o user global
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setCompany(user.company || "");
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Chama a API para atualizar usuário
      await api.put(`/users/${user?.id}`, {
        name,
        email,
        company,
        ...(password && { password }), // só envia senha se tiver preenchido
      });

      toast.success("Perfil atualizado com sucesso!");
      
      // Atualiza o usuário no contexto
      if (updateUser) updateUser(email, password, company);

      setPassword(""); // limpa o campo senha
    } catch (err: unknown) {
       // Aqui substituímos o `any` por `unknown`
      const error = err as { response?: { data?: { message?: string } } };
      console.error(error);
      toast.error(error.response?.data?.message || "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null; // evita renderizar sem usuário

  return (
    <AuthLayout >
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>

        <label className="block mb-2 text-sm font-medium">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-md bg-gray-50 dark:bg-gray-900"
        />

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-md bg-gray-50 dark:bg-gray-900"
        />

         <label className="block mb-2 text-sm font-medium">Empresa</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded-md bg-gray-50 dark:bg-gray-900"
        />

        <label className="block mb-2 text-sm font-medium">Senha (opcional)</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite uma nova senha"
          className="w-full px-3 py-2 mb-4 border rounded-md bg-gray-50 dark:bg-gray-900"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </AuthLayout>
  );
}
