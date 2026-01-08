import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function logoutUser(navigation) {
  try {
    await SecureStore.deleteItemAsync('token');
    await AsyncStorage.removeItem('user');
    navigation.navigate('Start');
  } catch (error) {
    alert('Erro ao tentar sair da conta.');
  }
};