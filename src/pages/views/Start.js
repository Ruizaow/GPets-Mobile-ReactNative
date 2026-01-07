import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from '@components/button';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';

export default function Start({ navigation }) {
  const fontsLoaded = useFontsCustom();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await SecureStore.getItemAsync('token');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Erro ao verificar autenticação', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  if (!fontsLoaded || loading) return null;

  function handleContinue() {
    navigation.navigate(isAuthenticated ? 'Home' : 'Auth');
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('@assets/images/dog-background.jpg')}/>
      <BlurView intensity={0} tint='dark' style={styles.blurBackground}>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']}
          style={styles.gradient}
        />
      </BlurView>
      <View style={styles.content}>
        <Image source={require('@assets/images/gpets-icon-dark.png')}/>
        <View style={styles.textButton}>
          <View>
            <Text style={fontStyles.title_1}>Ajuda mútua</Text>
            <Text style={fontStyles.title_1}>Encontros felizes</Text>
          </View>
          <View style={styles.buttonSection}>
            <Button text='Continuar' variant='green' size='customStart' onPress={handleContinue}/>
          </View>
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
    width: '100%'
  },
  background: {
    position: 'absolute',
    width: 1000,
    height: 1000,
    marginRight: 0
  },
  blurBackground: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    bottom: 0
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: 28
  },
  textButton: {
    gap: 20
  },
  buttonSection: {
    flexDirection: 'row',
    width: '100%'
  }
});