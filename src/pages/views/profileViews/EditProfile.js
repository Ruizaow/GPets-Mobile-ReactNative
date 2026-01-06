import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { FormInputField } from '@components/formInputField';
import { Modal } from '@components/modal';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { hasAtLeastOneLetter } from '@utils/textInputValidation';
import { formatPhone, isPhoneValid } from '@utils/phoneUtils';
import { handlePickImage } from '@handlers/handlePickImage';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function EditProfile({ initialData, onCancel, onSave }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const [form, setForm] = useState(initialData);
  const [showModal, setShowModal] = useState(false);

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }
  function updateImage(uri) {
    setForm(prev => ({ ...prev, fotoPerfil: uri }))
  }

  const hasUnsavedChanges =
    JSON.stringify(form) !== JSON.stringify(initialData);
  
  function handleGoBack() {
    if (hasUnsavedChanges) {
      setShowModal(true);
    } else {
      onCancel();
    }
  }
  
  function isEmailValid(value) {
    if (!value) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  const isFormValid =
    form.fotoPerfil &&
    hasAtLeastOneLetter(form.nome) &&
    hasAtLeastOneLetter(form.descricao) &&
    isEmailValid(form.email) &&
    isPhoneValid(form.telefone);

  return (
    <View style={[styles.profileContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={'Editar Perfil'}
        onPress={handleGoBack}
        showLineDivision={false}
      />
      <View style={styles.content}>
        <View style={styles.editPicture}>
          <TouchableOpacity onPress={() => handlePickImage(updateImage)}>
            <Image
              source={
                typeof form.fotoPerfil === 'string'
                  ? { uri: form.fotoPerfil }
                  : form.fotoPerfil
              }
              style={[styles.profilePicture, {
                borderWidth: theme.name === 'dark' ? 1 : 0,
                borderColor: theme.name === 'dark' ? colors.white : 'transparent'
              }]}
            />
          </TouchableOpacity>
          <Text style={[fontStyles.postTitle, { color: theme.primaryText } ]}>Editar foto</Text>
        </View>

        <View style={styles.textInputs}>
          <FormInputField
            label='Nome'
            required
            value={form.nome}
            onChangeText={text => updateField('nome', text)}
          />
          <FormInputField
            label='Descrição'
            required
            value={form.descricao}
            onChangeText={text => updateField('descricao', text)}
          />
          <FormInputField
            label='E-mail'
            required
            value={form.email}
            onChangeText={text => updateField('email', text)}
          />
          <FormInputField
            label='Telefone de contato'
            value={form.telefone}
            onChangeText={text =>
              updateField('telefone', formatPhone(text))
            }
            keyboardType='number-pad'
            placeholder='(+DD) 99999-9999'
          />
        </View>

        <View style={styles.continueButton}>
          <Button
            text='Concluir'
            variant={isFormValid ? 'blueBeige' : 'disabled'}
            size={'custom'}
            isDisabled={!isFormValid}
            onPress={() => onSave(form)}
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
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 100
  },
  textInputs: {
    gap: 12,
    marginBottom: 24
  },
  continueButton: {
    flexDirection: 'row'
  }
});