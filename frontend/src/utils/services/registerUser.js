import { api } from '@api';

export async function registerUser(userRole, getUserData, showSuccessMessage) {
  try {
    const { name, email, cnpj, address, password } = getUserData();

    await api.post('/users', {
      name, email, cnpj, address, password, role: userRole
    });

    showSuccessMessage();
  }
  catch (error) {
    // console.log(error?.response?.data || error);
    
    const backendMessage =
      'Erro: ' + error?.response?.data?.error?.message ||
      'Erro ao cadastrar usuário. Tente novamente.';

    alert(backendMessage);
  }
}