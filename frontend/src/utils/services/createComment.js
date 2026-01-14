import { api } from '@api';

export async function createComment(commentData) {
  try {
    const response = await api.post('/comments', commentData);
    return response.data.data;
  }
  catch (error) {
    // console.log(error?.response?.data || error);
    alert('Erro ao criar comentário. Tente novamente.');
    return null;
  }
}