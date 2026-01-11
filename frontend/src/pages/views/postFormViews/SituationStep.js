import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import { Trash } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { SelectState } from '@components/selectState';
import { Modal } from '@components/modal';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function SituationStep({ value, onChange, onGoNext, onDiscard, hasUnsavedChanges, navigation }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const [showModal, setShowModal] = useState(false);

  function handleSelectSituation(val) {
    onChange(val === value ? null : val);
  }
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
        headerTitle={'Reportar animal'}
        onPress={handleGoBack}
        showLineDivision={false}
        icon={Trash}
        iconColor={colors.red}
        onPressIcon={onDiscard}
      />
      <SelectState selectedState={'Situação'}/>
      <View style={styles.content}>
        <Text style={[fontStyles.title_3, {color: theme.primaryText}]}>
          Qual a situação do animal?
        </Text>
        <Text style={[fontStyles.subtitle_2, {color: theme.primaryText}]}>
          Antes de continuarmos, diga-nos a situação em que o animal se encontra.
        </Text>
        <View style={styles.buttons}>
          <Button
            text='Perdido'
            textColor={value === 'Perdido' ? theme.background : theme.stateButtonText}
            bgColor={value === 'Perdido' ? theme.selectedStateButton : theme.stateButton}
            borderColor={value === 'Perdido' ? 'transparent' : theme.postPetButtonBorder}
            height={48}
            onPress={() => handleSelectSituation('Perdido')}
          />
          <Button
            text='Desabrigado'
            textColor={value === 'Desabrigado' ? theme.background : theme.stateButtonText}
            bgColor={value === 'Desabrigado' ? theme.selectedStateButton : theme.stateButton}
            borderColor={value === 'Desabrigado' ? 'transparent' : theme.postPetButtonBorder}
            height={48}
            onPress={() => handleSelectSituation('Desabrigado')}
          />
        </View>
        
        <View style={styles.continueButton}>
          <Button
            text='Continuar'
            textColor={value ? theme.iconBackground : theme.background}
            bgColor={value ? colors.blue : colors.disabled}
            height={48}
            onPress={onGoNext}
            isDisabled={value ? false : true}
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 24,
    gap: 12
  },
  continueButton: {
    flexDirection: 'row',
  }
});