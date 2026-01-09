import { api } from '@api';

export async function loginUser(email, password) {
  try {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    return response.data.data;
  }
  catch (error) {
    // console.log(error?.response?.data || error);
    alert('Erro ao tentar entrar na conta. Verifique suas credenciais.');
  }
}