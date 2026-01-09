import { StyleSheet, View, Text, Platform } from 'react-native';
import { Trash } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { GoBackHeader } from '@components/goBackHeader';
import { SelectState } from '@components/selectState';
import { Map } from '@components/map';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function LocationStep({ location, onChange, onGoBack, onGoNext, onDiscard }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

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

        onChange({ address: formattedAddress, latitude, longitude });
      } else {
        onChange({ address: 'Endereço não encontrado', latitude, longitude });
      }
    }
    catch (error) {
      onChange({ address: 'Erro ao obter endereço' });
    }
  }

  return (
    <View style={[styles.stepContainer, { backgroundColor: theme.background }]}>
      <GoBackHeader
        headerTitle={'Reportar animal'}
        onPress={onGoBack}
        showLineDivision={false}
        icon={Trash}
        iconColor={colors.red}
        onPressIcon={onDiscard}
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
          <Map
            useMarkers={false}
            onPressLocation={handleLocationPress}
            coordinateLat={location.latitude}
            coordinateLng={location.longitude}
          />
        </View>
        <Text style={[styles.addressText, {color: theme.primaryText}]}>
          {location.address || 'Toque no mapa para selecionar o local'}
        </Text>

        <View style={styles.continueButton}>
          <Button
            text='Continuar'
            variant={Boolean(location.latitude) ? 'blueBeige' : 'disabled'}
            size={'custom'}
            onPress={onGoNext}
            isDisabled={!Boolean(location.latitude)}
          />
        </View>
      </View>
      
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
  mapView: {
    marginVertical: 12,
    width: 343,
    height: 310,
    borderRadius: 16,
    overflow: 'hidden',
    ...(Platform.OS !== 'web' ? {
      borderWidth: 1,
    } : {
      borderWidth: 2,
    }),
  },
  addressText: {
    ...fontStyles.subtitle_2,
    marginBottom: 20
  },
  continueButton: {
    flexDirection: 'row',
  }
});