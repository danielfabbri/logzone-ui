import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthLayout from '../../components/layout/AuthLayout';
import LogsTable from '../../components/projects/LogsTable';
import EditProjectModal from '../../components/projects/EditProjectModal';
import DownloadClientButton from '../../components/projects/DownloadClientButton';

// Dados de exemplo para logs
interface Log {
  id: string;
  projectId: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
}

const MOCK_LOGS: Log[] = [
  {
    id: '1',
    projectId: '1',
    timestamp: '2023-07-10T14:30:00Z',
    level: 'info',
    message: 'Usuário realizou login com sucesso',
    source: 'auth-service'
  },
  {
    id: '2',
    projectId: '2',
    timestamp: '2023-07-10T14:35:00Z',
    level: 'warning',
    message: 'Tentativa de acesso a recurso não autorizado',
    source: 'api-gateway'
  },
  {
    id: '3',
    projectId: '3',
    timestamp: '2023-07-10T14:40:00Z',
    level: 'error',
    message: 'Falha na conexão com o banco de dados',
    source: 'db-service'
  }
] as const; // ou Log[]

export default function ProjectPage() {
const router = useRouter();
const { id, name, description, logsCount, createdAt } = router.query;
  
  interface Project {
  id: string;
  name: string;
  description: string;
  apiKey: string;
  createdAt: string;
}

const [project, setProject] = useState<Project | null>(null);


const [logs, setLogs] = useState<Log[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Usuário mockado
  const mockUser = {
    username: 'João Silva'
  };

  useEffect(() => {
  if (!router.isReady) return;
  const { id, name, description, logsCount, createdAt } = router.query;
  if (!id || !name || !description || !logsCount || !createdAt) return;
  const logsCountNumber = Array.isArray(logsCount) ? parseInt(logsCount[0]) : parseInt(logsCount);
  const projectFromQuery = {
  id: Array.isArray(id) ? id[0] : id,
  name: Array.isArray(name) ? name[0] : name,
  description: Array.isArray(description) ? description[0] : description,
  createdAt: Array.isArray(createdAt) ? createdAt[0] : createdAt,
  logsCount: logsCountNumber,
  apiKey: 'default_api_key', // valor padrão
};

setProject(projectFromQuery);

  // Se quiser, você pode criar logs fake com base no logsCount
  const projectLogs = Array.from({ length: logsCountNumber }, (_, i) => ({
    id: `${i + 1}`,
    projectId: projectFromQuery.id,
    timestamp: new Date().toISOString(),
    level: 'info' as const,
    message: `Log ${i + 1} do projeto`,
    source: 'from-query',
  }));

  setLogs(projectLogs);

}, [router.isReady, router.query]);


  // const handleUpdateProject = (projectData) => {
  //   // Simulando atualização do projeto
  //   setProject({
  //     ...project,
  //     name: projectData.name,
  //     description: projectData.description
  //   });
  // };

  if (!project) {
    return (
      <AuthLayout username={mockUser.username}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout username={mockUser.username}>
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
          onSubmit={(projectData) => {
            // Implement project update logic here
            setProject({
              ...project,
              name: projectData.name,
              description: projectData.description
            });
          }}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          // onSubmit={handleUpdateProject}
          project={project}
        />
      )}
    </AuthLayout>
  );
}