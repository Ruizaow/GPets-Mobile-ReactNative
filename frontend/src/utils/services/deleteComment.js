import { api } from '@api';

export async function deleteComment(commentId, onSuccess) {
  try {
    await api.delete(`/comments/${commentId}`);
    onSuccess?.();
  }
  catch (error) {
    // console.log(error?.response?.data || error);
    alert('Erro ao deletar comentário.');
  }
}