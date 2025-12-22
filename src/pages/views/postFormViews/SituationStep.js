import { StyleSheet, View, Text } from 'react-native';
import { Trash } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { SelectState } from '@components/selectState';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function SituationStep({ navigation, onGoToLocationStep }) {
  const { theme } = useTheme();
  const [selectedSituation, setSelectedSituation] = useState(null);

  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  function handleSelectSituation(value) {
    setSelectedSituation(prev =>
      prev === value ? null : value
    );
  }

  return (
    <View style={[styles.situationStep, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={'Reportar animal'}
        onPress={() => navigation.navigate('Home')}
        showLineDivision={false}
        icon={Trash}
        iconColor={colors.red}
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
            size={'custom'}
            variant={selectedSituation === 'Perdido' ? 'blue' : 'goToMap'}
            onPress={() => handleSelectSituation('Perdido')}
          />
          <Button
            text='Desabrigado'
            size={'custom'}
            variant={selectedSituation === 'Desabrigado' ? 'blue' : 'goToMap'}
            onPress={() => handleSelectSituation('Desabrigado')}
          />
        </View>
        {selectedSituation && (
          <View style={styles.continueButton}>
            <Button text='Continuar' variant='blueBeige' size={'custom'} onPress={onGoToLocationStep}/>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  situationStep: {
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