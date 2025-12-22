import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from '@components/button';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function Start({ navigation }) {
  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded) return null;
  
  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('@assets/images/dog-background.jpg')}/>
      <BlurView intensity={0} tint='dark' style={styles.blurBackground}>
        <LinearGradient
          colors={[
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0.6)'
          ]}
          style={styles.gradient}
        />
      </BlurView>
      <View style={styles.content}>
        <Image source={require('@assets/images/gpets-icon-dark.png')}/>
        <View style={styles.textArea}>
          <View>
            <Text style={fontStyles.title_1}>Ajuda mútua</Text>
            <Text style={fontStyles.title_1}>Encontros felizes</Text>
          </View>
          <Button text='Continuar' variant='green' onPress={() => navigation.navigate('Auth')}/>
        </View>
      </View>
      <StatusBar style='auto'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    width: 1000,
    height: 1000,
  },
  blurBackground: {
    position: 'absolute',
    width: '100%',
    height: '30%',
    bottom: 0,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80
  },
  textArea: {
    gap: 20
  },
});