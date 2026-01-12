import { api } from '@api';
import { storage } from '@services/storage';

export async function updateUser(loadedUser, newUserData, setUser, exitUpdateForm) {
  try {
    const { name, bio, email, phone, address, imageUrl } = newUserData;

    const response = await api.put(`/users/${loadedUser.id}`, {
      name, bio, email, phone, address, imageUrl
    });

    const updatedUser = response.data.data;
    await storage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    exitUpdateForm();
  }
  catch (error) {
    console.log(error?.response?.data || error);

    const backendMessage =
      'Erro: ' + error?.response?.data?.error?.message ||
      'Erro ao atualizar usuário. Tente novamente.';
    
    alert(backendMessage);
  }
};