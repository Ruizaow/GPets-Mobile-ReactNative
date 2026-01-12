import { api } from '@api';

export async function savePost(postId) {
  const response = await api.post(`/posts/${postId}/bookmark`);
  return response.data;
}
export async function unsavePost(postId) {
  const response = await api.delete(`/posts/${postId}/bookmark`);
  return response.data;
}