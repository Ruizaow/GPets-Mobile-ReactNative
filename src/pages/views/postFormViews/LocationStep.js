import { StyleSheet, View, Text } from 'react-native';
import { Trash } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { SelectState } from '@components/selectState';
import { Map } from '@components/map';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function LocationStep({ onBack, onGoToImageStep }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  const [addressText, setAddressText] = useState('Toque no mapa para selecionar o local');
  const [hasLocation, setHasLocation] = useState(false);

  async function handleLocationPress({ latitude, longitude }) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'MeuAppReactNative/1.0 (meuemail@email.com)',
            'Accept': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (data?.address) {
        const { road, house_number, city, town, village, state, postcode } = data.address;
        
        const street = road || 'Rua não identificada';
        const number = house_number
          ? `, ${house_number}`
          : '';
        const cityValue = city || town || village;
        const cityName = cityValue
          ? `\n${cityValue} - `
          : '\n';
        const cep = postcode
          ? `, ${postcode}`
          : '';

        const formattedAddress = `${street}${number}${cityName}${state}${cep}`;

        setAddressText(formattedAddress);
      } else {
        setAddressText('Endereço não encontrado');
      }
      setHasLocation(true);
    }
    catch (error) {
      setAddressText('Erro ao obter endereço');
    }
  }

  return (
    <View style={[styles.situationStep, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={'Reportar animal'}
        onPress={onBack}
        showLineDivision={false}
        icon={Trash}
        iconColor={colors.red}
      />
      <SelectState selectedState={'Local'}/>
      <View style={styles.content}>
        <Text style={[fontStyles.title_3, {color: theme.primaryText}]}>
          Onde ele foi visto pela última vez?
        </Text>
        <Text style={[fontStyles.subtitle_2, {color: theme.primaryText}]}>
          Informe clicando no mapa abaixo:
        </Text>
        <View style={[styles.mapView, { borderColor: theme.primaryText }]}>
          <Map useMarkers={false} onPressLocation={handleLocationPress}/>
        </View>
        <Text style={[styles.adressText, {color: theme.primaryText}]}>
          {addressText}
        </Text>
        {hasLocation && (
          <View style={styles.continueButton}>
            <Button text='Continuar' variant='blueBeige' size={'custom'} onPress={onGoToImageStep}/>
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
  mapView: {
    marginTop: 12,
    marginBottom: 12,
    width: 343,
    height: 310,
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden'
  },
  adressText: {
    ...fontStyles.subtitle_2,
    marginBottom: 16
  },
  continueButton: {
    flexDirection: 'row',
  }
});