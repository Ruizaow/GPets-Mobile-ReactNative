import { api } from '@api';

export async function updatePost(postId, status) {
  const response = await api.put(`/posts/${postId}`, {
    status
  });
  return response.data.data;
}