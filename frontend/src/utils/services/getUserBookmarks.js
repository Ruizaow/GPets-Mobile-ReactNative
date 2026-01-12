import { api } from '@api';
import { useEffect, useState } from 'react';
import { usePosts } from '@context/PostsContext';

export function getUserBookmarks(userId) {
  const { bookmarkedPosts, setBookmarkedPosts } = usePosts();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookmarks() {
      try {
        const response = await api.get(`/users/${userId}/bookmarks`);
        setBookmarkedPosts(response.data.data);
      }
      catch (error) {
        console.error('Erro ao carregar posts salvos', error);
        setBookmarkedPosts([]);
      }
      finally {
        setLoading(false);
      }
    }

    loadBookmarks();
  }, []);

  return { posts: bookmarkedPosts, loading };
}