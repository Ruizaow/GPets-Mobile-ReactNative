import { api } from '@api';
import { useEffect, useState } from 'react';
import { usePosts } from '@context/PostsContext';

export function getPosts() {
  const { feedPosts, setFeedPosts } = usePosts();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await api.get('/posts');
        setFeedPosts(response.data.data);
      }
      catch (error) {
        console.error('Erro ao carregar posts', error);
        setFeedPosts([]);
      }
      finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return { posts: feedPosts, loading };
}