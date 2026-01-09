import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@api';

export async function updateUser(loadedUser, newUserData, setUser, exitUpdateForm) {
  try {
    const { name, bio, email, phone, imageUrl } = newUserData;

    const response = await api.put(`/users/${loadedUser.id}`, {
      name, bio, email, phone, imageUrl
    });

    const updatedUser = response.data.data;
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
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