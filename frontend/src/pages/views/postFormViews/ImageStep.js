import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Trash, ImagePlus, X } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { SelectState } from '@components/selectState';
import { Modal } from '@components/modal';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { handlePickImage } from '@handlers/handlePickImage';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function ImageStep({ postType, imageUri, onChangeImage, onGoBack, onGoNext, onDiscard, hasUnsavedChanges, navigation }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const isEvent = postType === 'Evento/publicidade';

  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  function handleGoBack() {
    if (hasUnsavedChanges()) {
      setShowModal(true);
    } else {
      navigation.navigate('Home');
    }
  }

  return (
    <View style={[styles.stepContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={postType}
        onPress={isEvent ? handleGoBack : onGoBack}
        showLineDivision={false}
        icon={Trash}
        iconColor={colors.red}
        onPressIcon={onDiscard}
      />
      <SelectState selectedState={'Foto'} postType={postType}/>

      <View style={styles.content}>
        {isEvent ? (
          <View style={styles.titles}>
            <Text style={[fontStyles.title_3, {color: theme.primaryText}]}>
              Destaque sua publicação
            </Text>
            <Text style={[fontStyles.subtitle_2, {color: theme.primaryText}]}>
              Adicione uma imagem. Uma boa foto é crucial para atrair a atenção da comunidade!
            </Text>
          </View>
        ) : (
          <View style={styles.titles}>
            <Text style={[fontStyles.title_3, {color: theme.primaryText}]}>
              Queremos ver o pet
            </Text>
            <Text style={[fontStyles.subtitle_2, {color: theme.primaryText}]}>
              Adicione uma foto do pet. A colaboração da comunidade GPets será mais eficaz.
            </Text>
          </View>
        )}

        <View style={styles.imageField}>
          {imageUri ? (
            <>
              <TouchableOpacity style={styles.deleteImageIcon} onPress={() => onChangeImage(null)}>
                <X size={24} color={colors.white}/>
              </TouchableOpacity>
              <Image style={styles.imagePreview} source={{ uri: imageUri }} resizeMode='cover'/>
            </>
          ) : (
            uploading ? (
              <ActivityIndicator size='large' color={theme.primaryText}/>
             ) : (
              <TouchableOpacity style={styles.addButton} onPress={() => handlePickImage({
                onChangeImage,
                onStart: () => setUploading(true),
                onFinish: () => setUploading(false)
              })}>
                <ImagePlus size={24} color={colors.white}/>
                <View style={styles.buttonText}>
                  <Text style={styles.label}>Adicionar imagem</Text>
                  <Text style={styles.mandatory}>*</Text>
                </View>
              </TouchableOpacity>
            )
          )}
        </View>

        <View style={styles.continueButton}>
          <Button
            text='Continuar'
            variant={imageUri && !uploading ? 'blueBeige' : 'disabled'}
            size={'custom'}
            onPress={onGoNext}
            isDisabled={!imageUri || uploading}
          />
        </View>
      </View>

      {showModal && (
        <Modal
          text={`Deseja voltar? Suas alterações serão perdidas`}
          confirmButton={`Sim, voltar`}
          onClose={() => setShowModal(false)}
          onConfirm={() => navigation.navigate('Home')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1
  },
  content: {
    marginTop: 32,
    paddingHorizontal: 32,
    gap: 12
  },
  titles: {
    gap: 12
  },
  imageField: {
    width: 343,
    height: 310,
    backgroundColor: colors.grey,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  deleteImageIcon: {
    backgroundColor: colors.black,
    borderRadius: 100,
    opacity: 0.75,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    right: 0,
    top: 0,
    margin: 10
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 12
  },
  addButton: {
    width: 212,
    height: 48,
    backgroundColor: colors.blue,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6
  },
  buttonText: {
    flexDirection: 'row',
  },
  label: {
    ...fontStyles.subtitle_1,
    color: colors.white
  },
  mandatory: {
    ...fontStyles.subtitle_1,
    color: colors.red
  },
  continueButton: {
    flexDirection: 'row',
  }
});