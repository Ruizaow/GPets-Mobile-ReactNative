import { api } from '@api';

export async function deletePost(postId, onSuccess) {
  try {
    await api.delete(`/posts/${postId}`);
    onSuccess?.();
  }
  catch (error) {
    console.log(error?.response?.data || error);
    alert('Erro ao deletar publicação: ' + error?.response?.data?.error?.message);
  }
}