import { api } from '@api';
import { useEffect, useState } from 'react';
import { usePosts } from '@context/PostsContext';

export function getUserPosts(userId) {
  const { userPosts, setUserPosts } = usePosts();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setUserPosts([]);
      setLoading(false);
      return;
    }

    async function loadUserPosts() {
      try {
        const response = await api.get(`/users/${userId}/posts`);
        setUserPosts(response.data.data);
      }
      catch (error) {
        console.error('Erro ao carregar posts do usuário', error);
        setUserPosts([]);
      }
      finally {
        setLoading(false);
      }
    }

    loadUserPosts();
  }, [userId]);

  return { posts: userPosts, loading };
}