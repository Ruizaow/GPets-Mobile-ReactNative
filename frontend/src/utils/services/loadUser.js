import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadUser(setUser, setLoading) {
  try {
    const storedUser = await AsyncStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  } catch (error) {
    console.error('Erro ao carregar usuário', error);
  } finally {
    setLoading(false);
  }
}