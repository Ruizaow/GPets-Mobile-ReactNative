import { StyleSheet, View, Text, Image } from 'react-native';
import { useTheme } from '@context/ThemeContext';
import { Button } from '@components/button';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function SelectPost({ navigation }) {
  const { theme } = useTheme();

  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.selectPost}>
      <Image style={styles.logo} source={require('@assets/images/gpets-icon-blue.png')}/>
      <Text style={[styles.text, { color: theme.primaryText }]}>
        Que tipo de postagem {'\n'}você deseja fazer hoje?
      </Text>
      <View style={styles.buttons}>
        <Button text='Evento/publicidade' variant='blue' size={'medium'} onPress={() => navigation.navigate('PostForm')}/>
        <Button text='Reportar animal' variant='goToMap' size={'medium'} onPress={() => navigation.navigate('PostForm')}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectPost: {
    alignItems: 'center',
    marginTop: 48
  },
  logo: {
    marginBottom: 24
  },
  text: {
    ...fontStyles.title_3,
    marginBottom: 24
  },
  buttons: {
    gap: 12
  }
});