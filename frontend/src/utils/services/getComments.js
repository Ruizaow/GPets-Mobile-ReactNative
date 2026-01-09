import { api } from '@api';
import { useEffect, useState } from 'react';

export function getComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadComments() {
    try {
      const response = await api.get(`/comments?postId=${postId}`);
      setComments(response.data.data);
    }
    catch (error) {
      console.error('Erro ao carregar comentários', error);
      setComments([]);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComments();
  }, [postId]);

  return { comments, setComments, loading };
}