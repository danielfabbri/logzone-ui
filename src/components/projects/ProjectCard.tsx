import React from 'react';
import Link from 'next/link';

// import { useRouter } from 'next/router';
// const router = useRouter();
// const { id, name, description } = router.query;
interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  logsCount: number;
  createdAt: string;
}

export default function ProjectCard({
  id,
  name,
  description,
  logsCount,
  createdAt,
}: ProjectCardProps) {
  return (
    <Link href={`/project/${id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{logsCount} logs</span>
          <span>Criado em {new Date(createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    </Link>
  );
}
