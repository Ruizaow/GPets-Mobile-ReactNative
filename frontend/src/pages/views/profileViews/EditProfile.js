import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { ProfilePicture } from '@components/profilePicture';
import { FormInputField } from '@components/formInputField';
import { KebabMenu } from '@components/kebabMenu';
import { Modal } from '@components/modal';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { hasAtLeastOneLetter, isEmailValid } from '@utils/textInputValidation';
import { formatPhone } from '@utils/phone';
import { handlePickImage } from '@handlers/handlePickImage';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { updateUser } from '@services/updateUser';

export default function EditProfile({ loadedUser, updateLoadedUser, onCancel, onSave }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const [form, setForm] = useState(loadedUser);
  const [showModal, setShowModal] = useState(false);
  const [kebabMenu, setKebabMenu] = useState(false);
  const [uploading, setUploading] = useState(false);

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }
  function updateImage(uri) {
    setForm(prev => ({ ...prev, imageUrl: uri }))
  }

  const hasUnsavedChanges =
    JSON.stringify(form) !== JSON.stringify(loadedUser);
  
  function handleGoBack() {
    if (hasUnsavedChanges) {
      setShowModal(true);
    } else {
      onCancel();
    }
  }
  
  const isFormValid =
    hasAtLeastOneLetter(form.name) &&
    isEmailValid(form.email)

  return (
    <View style={[styles.profileContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={'Editar Perfil'}
        onPress={handleGoBack}
        showLineDivision={false}
      />
      <View style={styles.content}>
        <View style={styles.editPicture}>
          {uploading ? (
            <View style={styles.loadingBackground}>
              <ActivityIndicator size='large' color={theme.primaryText}/>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setKebabMenu(true)}>
              <ProfilePicture loadedUser={form} size={120}/>
            </TouchableOpacity>
          )}
          
          <Text style={[fontStyles.postTitle, { color: theme.primaryText } ]}>Editar foto</Text>
        </View>

        <View style={styles.textInputs}>
          <FormInputField
            label='Nome'
            required
            value={form.name}
            onChangeText={text => updateField('name', text)}
          />
          <FormInputField
            label='Descrição'
            value={form.bio}
            onChangeText={text => updateField('bio', text)}
          />
          <FormInputField
            label='E-mail'
            required
            value={form.email}
            onChangeText={text => updateField('email', text)}
          />
          <FormInputField
            label='Telefone de contato'
            value={form.phone}
            onChangeText={text =>
              updateField('phone', formatPhone(text))
            }
            keyboardType='number-pad'
            placeholder='(+DD) 99999-9999'
          />
        </View>

        <View style={styles.continueButton}>
          <Button
            text='Concluir'
            variant={isFormValid && !uploading ? 'blueBeige' : 'disabled'}
            size={'custom'}
            isDisabled={!isFormValid || uploading}
            onPress={async () => await updateUser(loadedUser, form, updateLoadedUser, onSave)}
          />
        </View>
      </View>
      
      {showModal && (
        <Modal
          text={`Deseja sair sem consolidar suas alterações?`}
          confirmButton={`Sim, voltar`}
          onClose={() => setShowModal(false)}
          onConfirm={onCancel}
        />
      )}
      {kebabMenu && (
        <KebabMenu
          type={'profilePicture'}
          data={form}
          onClose={() => setKebabMenu(false)}
          onDelete={() => updateImage(null)}
          onChangeImage={() => handlePickImage({
            onChangeImage: updateImage,
            onStart: () => setUploading(true),
            onFinish: () => setUploading(false)
          })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1
  },
  content: {
    paddingHorizontal: 32,
    gap: 16
  },
  editPicture: {
    alignItems: 'center',
    gap: 4,
  },
  loadingBackground: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputs: {
    gap: 12,
    marginBottom: 24
  },
  continueButton: {
    flexDirection: 'row'
  }
});