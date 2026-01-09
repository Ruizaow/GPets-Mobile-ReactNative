import { api } from '@api';
import { useEffect, useState } from 'react';

export function getUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadUser() {
      try {
        await api.get(`/users/${id}`).then(response => {
          setUser(response.data.data);
        });
      }
      catch (error) {
        console.error('Erro ao carregar usuário', error);
      }
      finally {
        setLoading(false);
      }
      
    }

    loadUser();
  }, [id]);

  return { user, loading };
}