export async function uploadImageToCloudinary (image) {
  const data = new FormData();

  if (typeof image === 'string') {
    // MOBILE
    data.append('file', {
      uri: image,
      type: 'image/jpeg',
      name: 'upload.jpg'
    });
  } else {
    // WEB
    data.append('file', image);
  }
  data.append('upload_preset', 'public_upload');
  data.append('cloud_name', 'dzzsvcvlj');
  
  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dzzsvcvlj/image/upload',
      {
        method: 'POST',
        body: data
      }
    );

    const json = await response.json();
    return json.secure_url ?? null;
  }
  catch (error) {
    // console.log('Erro ao enviar imagem para o Cloudinary:', error);
    return null;
  }
}