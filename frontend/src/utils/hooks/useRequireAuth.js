import { useAuth } from '@context/AuthContext';

export function useRequireAuth(openLoginModal) {
  const { isAuthenticated } = useAuth();

  function requireAuth(action) {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    action();
  }

  return { requireAuth };
}