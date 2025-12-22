import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '@components/button';
import { BackArrow } from '@components/backArrow';
import { colors } from '@styles/colors';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function SelectUser({ navigation, onSelectOng }) {
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.backSection}><BackArrow text={'Voltar'} onPress={() => navigation.navigate('Start')}/></View>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <View style={styles.textArea}>
            <Text style={[fontStyles.title_2, { color: colors.dark }]}>
              Antes de continuarmos, {'\n'}gostaríamos de saber em {'\n'}qual perfil você se encaixa 
            </Text>
            <Text style={[fontStyles.subtitle_1, { color: colors.dark }]}>
              Selecione uma das opções abaixo:
            </Text>
          </View>
          <View style={styles.buttonArea}>
            <Button text='Pessoa Física' variant='disabled'/>
            <Button text='ONG’s' variant='blue' onPress={onSelectOng}/>
          </View>
          <StatusBar style='auto'/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
    justifyContent: 'center'
  },
  backSection: {
    marginHorizontal: 32,
    marginTop: 80
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 256
  },
  textArea: {
    alignItems: 'start',
    gap: 16,
    marginBottom: 32
  },
  buttonArea: {
    gap: 10
  }
});