import { uploadImageToCloudinary } from '@services/uploadImageToCloudinary';

export async function handlePickImage({ onChangeImage, onStart, onFinish }) {
  return new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async event => {
      const file = event.target.files[0];
      if (!file) return;

      onStart?.();

      try {
        const cloudinaryUrl = await uploadImageToCloudinary(file);
        if (!cloudinaryUrl) {
          alert('Erro ao enviar imagem.');
          return;
        }
        onChangeImage(cloudinaryUrl);
      }
      finally {
        onFinish?.();
        resolve();
      }
    };

    input.click();
  });
}