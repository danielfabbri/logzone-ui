import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthLayout from '../../components/layout/AuthLayout';
import LogsTable from '../../components/projects/LogsTable';
import EditProjectModal from '../../components/projects/EditProjectModal';
import DownloadClientButton from '../../components/projects/DownloadClientButton';
import api from '@/services/apiService';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

// Dados de exemplo para logs
interface Log {
  id: string;
  projectId: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  apiKey: string;
  createdAt: string;
}




export default function ProjectPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState<Project | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
    
    
  
 
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) return;
    if (!router.isReady) return;
    if (!id) return;
  
    console.log("chegou aqui, chamando API com id:", id);
  
    api.get(`/projects/${id}`)
      .then(res => {
        console.log("Resposta da API:", res.data);
        setProject(res.data.data); // <- aqui o ajuste
        setLogs(res.data.data.logs || []);
      })
      .catch(err => {
        console.error("Erro ao buscar projeto:", err);
        toast.error("Não foi possível carregar o projeto.");
      });
  }, [router.isReady, id, user]);
  
  


  // const handleUpdateProject = (projectData) => {
  //   // Simulando atualização do projeto
  //   setProject({
  //     ...project,
  //     name: projectData.name,
  //     description: projectData.description
  //   });
  // };

  const handleEditProject = async (projectData: { name: string; description: string }) => {
    if (!project) return;
  
    try {
      // Chamada para o backend
      await api.put(`/projects/${project.id}`, projectData);
  
      // Atualiza apenas o projeto selecionado
      setProject({ ...project, ...projectData });
  
      toast.success("Projeto atualizado com sucesso!");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
      toast.error("Não foi possível atualizar o projeto.");
    }
  };
  

  if (!mounted || !user || !project) {
    return (
      <AuthLayout username={user?.name || ''}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AuthLayout>
    );
  }
  

  return (
    <AuthLayout username={user.name}>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Criado em 
            </p>
          </div>
          <div className="flex gap-3">
            <DownloadClientButton projectId={project.id} apiKey={project.apiKey} />
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Editar Projeto
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Logs do Projeto</h2>
        <LogsTable logs={logs} />
      </div>

      {project && (
        <EditProjectModal
          onSubmit={handleEditProject}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          // onSubmit={handleUpdateProject}
          project={project}
        />
      )}
    </AuthLayout>
  );
}