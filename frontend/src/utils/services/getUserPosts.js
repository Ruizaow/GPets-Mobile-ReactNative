import { api } from '@api';
import { useEffect, useState } from 'react';

export function getUserPosts(userId) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setPosts([]);
      setLoading(false);
      return;
    }

    async function loadUserPosts() {
      try {
        const response = await api.get(`/users/${userId}/posts`);
        setPosts(response.data.data);
        console.log(posts)
      }
      catch (error) {
        console.error('Erro ao carregar posts do usuário', error);
        setPosts([]);
      }
      finally {
        setLoading(false);
      }
    }

    loadUserPosts();
  }, [userId]);

  return { posts, setPosts, loading };
}