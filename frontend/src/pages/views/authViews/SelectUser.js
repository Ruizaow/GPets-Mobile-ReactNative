import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { Button } from '@components/button';
import { BackArrow } from '@components/backArrow';
import { colors } from '@styles/colors';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function SelectUser({ onBackToLogin, onSelectUser, onSelectOng }) {
  const { theme } = useTheme();
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.backSection}>
        <BackArrow text={'Voltar'} onPress={onBackToLogin}/>
      </View>

      <View style={styles.content}>
        <View style={styles.textArea}>
          <Text style={[fontStyles.title_2, { color: theme.primaryText }]}>
            Antes de continuarmos, gostaríamos de saber em qual perfil você se encaixa 
          </Text>
          <Text style={[fontStyles.subtitle_1, { color: theme.primaryText }]}>
            Selecione uma das opções abaixo:
          </Text>
        </View>
        <View style={styles.buttonArea}>
          <View style={styles.button}>
            <Button
              text='Pessoa Física'
              textColor={theme.disabled}
              bgColor={colors.disabled}
              onPress={onSelectUser}
              isDisabled={true}
            />
          </View>
          <View style={styles.button}>
            <Button
              text='ONG’s'
              textColor={theme.iconBackground}
              bgColor={colors.blue}
              onPress={onSelectOng}
            />
          </View>
        </View>

        <StatusBar style='auto'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32
  },
  backSection: {
    marginTop: 80
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 256
  },
  textArea: {
    width: '100%',
    alignItems: 'start',
    gap: 16,
    marginBottom: 32
  },
  buttonArea: {
    width: '100%',
    gap: 10
  },
  button: {
    flexDirection: 'row'
  }
});