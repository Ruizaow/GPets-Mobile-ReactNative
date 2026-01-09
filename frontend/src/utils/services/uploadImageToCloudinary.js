export async function uploadImageToCloudinary (imageUri) {
  const data = new FormData();
  data.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  });
  data.append("upload_preset", "public_upload");
  data.append("cloud_name", "dzzsvcvlj");
  
  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dzzsvcvlj/image/upload",
      {
        method: "POST",
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const json = await response.json();

    if (!json.secure_url) {
      console.log('Resposta Cloudinary:', json);
      return null;
    }

    return json.secure_url;
  }
  catch (error) {
    console.log("Erro ao enviar imagem para o Cloudinary:", error);
    return null;
  }
}