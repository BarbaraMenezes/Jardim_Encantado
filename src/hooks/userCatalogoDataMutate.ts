import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { CatalogoData } from '../interface/CatalogoData';

const API_URL = 'http://localhost:8080';

// Função para criar um novo item
const postData = async (data: CatalogoData) => {
  return axios.post(`${API_URL}/catalogo`, data);
};

// Função para atualizar um item existente
const updateData = async (data: CatalogoData) => {
  if (!data.id) {
    throw new Error("Item ID is required for updating");
  }
  return axios.put(`${API_URL}/catalogo/${data.id}`, data);
};

// Função para deletar um item existente
const deleteData = async (id: number) => {
  return axios.delete(`${API_URL}/catalogo/${id}`);
};

export function useCatalogoDataMutate() {
  const queryClient = useQueryClient();

  // Mutate para criar um item
  const createMutation = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      // Invalida a consulta para garantir que os dados mais recentes sejam recuperados
      queryClient.invalidateQueries({ queryKey: ['catalogo-data'] });
    },
  });

  // Mutate para atualizar um item
  const updateMutation = useMutation({
    mutationFn: updateData,
    retry: 2,
    onSuccess: () => {
      // Invalida a consulta para garantir que os dados mais recentes sejam recuperados
      queryClient.invalidateQueries({ queryKey: ['catalogo-data'] });
    },
  });

  // Mutate para deletar um item
  const deleteMutation = useMutation({
    mutationFn: deleteData,
    retry: 2,
    onSuccess: () => {
      // Invalida a consulta para garantir que os dados mais recentes sejam recuperados
      queryClient.invalidateQueries({ queryKey: ['catalogo-data'] });
    },
    onError: (error: any) => {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    },
  });

  return { createMutation, updateMutation, deleteMutation };
}
