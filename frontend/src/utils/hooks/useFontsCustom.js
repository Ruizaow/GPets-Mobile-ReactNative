import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';

export function useFontsCustom() {
  const [loaded, setLoaded] = useState(false);

  const [fontsLoaded] = useFonts({
    'Geologica-Regular': require('../../assets/fonts/Geologica-Regular.ttf'),
    'Geologica-Medium': require('../../assets/fonts/Geologica-Medium.ttf'),
    'Geologica-Bold': require('../../assets/fonts/Geologica-Bold.ttf'),
  });

  useEffect(() => {
    try {
      if (fontsLoaded) {
        setLoaded(true);
      }
    } catch (err) {
      setLoaded(false);
    }
  }, [fontsLoaded]);

  return { loaded };
}