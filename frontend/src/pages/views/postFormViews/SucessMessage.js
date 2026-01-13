import { StyleSheet, View, Text } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { useHomeView } from '@context/HomeViewContext';
import { Button } from '@components/button';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function LocationStep({ navigation }) {
  const { theme } = useTheme();
  const { setCurrentView } = useHomeView();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  function handleContinue() {
    setCurrentView('Feed');
    navigation.navigate('Home');
  }
  
  return (
    <View style={styles.stepContainer}>
      <View style={styles.content}>
        <View style={styles.checkSection}>
          <View style={[styles.checkBackground, { backgroundColor: theme.background } ]}/>
          <View style={styles.checkIcon}>
            <Check size={88} color={colors.green} />
          </View>
        </View>

        <View style={styles.textArea}>
          <Text style={[styles.title, { color: theme.background } ]}>
            Publicação Postada com Sucesso
          </Text>
          <Text style={[styles.description, { color: theme.background } ]}>Agradecemos o seu registro. Desejamos boa sorte!</Text>
        </View>

        <View style={styles.continueButton}>
          <View style={styles.button}>
            <Button
              text='Continuar'
              textColor={theme.primaryText}
              bgColor={theme.background}
              onPress={handleContinue}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    backgroundColor: colors.green
  },
  content: {
    marginTop: 160,
    paddingHorizontal: 32,
    alignItems: 'center'
  },
  checkSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkBackground: {
    width: 100,
    height: 100,
    marginTop: -10,
    borderRadius: 50,
    position: 'absolute',
  },
  checkIcon: {
    zIndex: 1
  },
  textArea: {
    gap: 8,
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    ...fontStyles.title_2
  },
  description: {
    textAlign: 'center',
    ...fontStyles.subtitle_2
  },
  continueButton: {
    width: '100%'
  },
  button: {
    flexDirection: 'row'
  }
});