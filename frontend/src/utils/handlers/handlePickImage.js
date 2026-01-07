import * as ImagePicker from 'expo-image-picker';

export async function handlePickImage(onChangeImage) {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    alert('Precisamos de permissão para acessar sua galeria.');
    return;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
  });
  if (!result.canceled) {
    onChangeImage(result.assets[0].uri);
  }
}