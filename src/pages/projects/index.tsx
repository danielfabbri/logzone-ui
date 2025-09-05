import React, { useState } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import ProjectCard from '../../components/projects/ProjectCard';
import NewProjectModal from '../../components/projects/NewProjectModal';

// Dados de exemplo para projetos
const MOCK_PROJECTS = [
  {
    id: '1',
    name: 'E-commerce App',
    description: 'Sistema de e-commerce com logs de transações e erros',
    logsCount: 1243,
    createdAt: '2023-05-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Blog CMS',
    description: 'Sistema de gerenciamento de conteúdo para blog',
    logsCount: 532,
    createdAt: '2023-06-22T14:45:00Z'
  },
  {
    id: '3',
    name: 'API Gateway',
    description: 'Gateway de API para microserviços',
    logsCount: 2891,
    createdAt: '2023-04-10T09:15:00Z'
  }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // Usuário mockado
  const mockUser = {
    username: 'João Silva'
  };

  const handleCreateProject = (projectData: { name: string; description: string }) => {
    const newProject = {
      id: `${projects.length + 1}`,
      name: projectData.name,
      description: projectData.description,
      logsCount: 0,
      createdAt: new Date().toISOString()
    };

    setProjects([...projects, newProject]);
  };

  return (
    <AuthLayout username={mockUser.username}>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meus Projetos</h1>
        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Novo Projeto
        </button>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              logsCount={project.logsCount}
              createdAt={project.createdAt}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Nenhum projeto encontrado</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Comece criando um novo projeto.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsNewProjectModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Novo Projeto
            </button>
          </div>
        </div>
      )}

      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </AuthLayout>
  );
}