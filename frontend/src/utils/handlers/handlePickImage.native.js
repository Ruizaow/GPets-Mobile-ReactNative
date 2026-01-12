import * as ImagePicker from 'expo-image-picker';
import { uploadImageToCloudinary } from '@services/uploadImageToCloudinary';

export async function handlePickImage({ onChangeImage, onStart, onFinish }) {
  try {
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

    if (result.canceled) {
      return;
    }
    const localUri = result.assets[0].uri;

    onStart?.();

    const cloudinaryUrl = await uploadImageToCloudinary(localUri);

    if (!cloudinaryUrl) {
      alert('Erro ao enviar imagem.');
      return;
    }
    
    onChangeImage(cloudinaryUrl);
  }
  finally {
    onFinish?.();
  }
}