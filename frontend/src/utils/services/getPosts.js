import { api } from '@api';
import { useEffect, useState } from 'react';

export function getPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await api.get('/posts');
        setPosts(response.data.data);
      }
      catch (error) {
        console.error('Erro ao carregar posts', error);
        setPosts([]);
      }
      finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return { posts, setPosts, loading };
}