import api from './apiService';

console.log("Serviço de projetos")

export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    return [];
  }
};