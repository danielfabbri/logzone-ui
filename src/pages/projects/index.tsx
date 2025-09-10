import React, { useState, useEffect } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import ProjectCard from '../../components/projects/ProjectCard';
import NewProjectModal from '../../components/projects/NewProjectModal';
import { getProjects } from '../../services/projectService';
import api from '../../services/apiService';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

interface Project {
  id: string;
  name: string;
  description: string;
  logsCount: number;
  createdAt: string;
}

console.log("Página de projetos")

export default function ProjectsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return; // só continua se user existir
    console.log("useEffect disparou");
  
    getProjects().then((data: { data: any[] }) => {
      console.log("Projetos vindos da API:", data);
      const mappedProjects = data.data.map(p => ({
        id: p._id,
        name: p.name,
        description: p.description,
        logsCount: p.logsCount ?? 0,
        createdAt: p.createdAt,
      }));
      setProjects(mappedProjects);
    });
  }, [user]);

  const handleCreateProject = async (projectData: { name: string; description: string }) => {
    try {
      await api.post('/projects', projectData);
      const data = await getProjects(); // pega a lista atualizada do backend
      const mappedProjects = (data.data as any[]).map(p => ({
        id: p._id, // e aqui
        name: p.name,
        description: p.description,
        logsCount: p.logsCount ?? 0,
        createdAt: p.createdAt,
      }));
      setProjects(mappedProjects);
      setIsNewProjectModalOpen(false);
      toast.success("Projeto criado com sucesso!");
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    }
  };

  if (!user) return null; 

  return (
    <AuthLayout username={user.name}>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meus Projetos</h1>
        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Novo Projeto
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="text-gray-500">Nenhum projeto encontrado.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              logsCount={project.logsCount}
              createdAt={project.createdAt}
            />
          ))
        )}
      </div>
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </AuthLayout>
  );
}
