import { api } from '@api';

export async function createPost(postData, showSuccessMessage) {
  try {
    await api.post('/posts', postData);
    showSuccessMessage();
  }
  catch (error) {
    console.log(error?.response?.data || error);
    alert('Erro ao criar publicação. Tente novamente.');
  }
}