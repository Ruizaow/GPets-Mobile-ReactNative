import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@api';

export async function loginUser(getUserData, navigation) {
  try {
    const { email, password } = getUserData();

    const response = await api.post('/auth/login', {
      email, password
    });
      
    const { data } = response.data;
    await SecureStore.setItemAsync('token', data.token);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));

    navigation.navigate('Home');
  } catch (error) {
    // console.log(error?.response?.data || error);
    alert('Erro ao tentar entrar. Verifique suas credenciais.');
  }
}