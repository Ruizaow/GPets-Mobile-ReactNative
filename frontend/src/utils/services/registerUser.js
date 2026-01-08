import { api } from '@api';

export async function registerUser(userRole, getUserData, showSuccessMessage) {
  try {
    const { name, email, cnpj, address, password } = getUserData();

    const response = await api.post('/users', {
      name, email, cnpj, address, password, role: userRole
    });

    if (response.status !== 200 && response.status !== 201) {
      throw new Error('Erro ao cadastrar usuário');
    }

    showSuccessMessage();
  } catch (error) {
    // console.log(error?.response?.data || error);
    
    const backendMessage =
      'Erro: ' + error?.response?.data?.error?.message ||
      'Erro ao cadastrar. Tente novamente.';

    alert(backendMessage);
  }
}