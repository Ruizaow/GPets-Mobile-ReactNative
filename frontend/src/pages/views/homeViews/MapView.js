import { StyleSheet, View, Text, Platform } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { Map } from '@components/map';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { getPosts } from '@services/getPosts';

export default function MapView() {
  const { theme } = useTheme();
  const { posts, loading } = getPosts();

  const fontsLoaded = useFontsCustom();
  if (!fontsLoaded || loading) return null;

  function Subtitle({ color, text }) {
    return (
      <View style={styles.subtitle}>
        <MapPin size={24} color={color}/>
        <Text style={[fontStyles.subtitle_1, { color: theme.primaryText }]}>{text}</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <View style={[styles.mapView, { borderColor: theme.primaryText }]}>
        <Map posts={posts}/>
      </View>
      <View style={styles.subtitles}>
        <View style={styles.subtitles_column}>
          <Subtitle color={colors.green} text='Pet encontrado' />
          <Subtitle color={colors.red} text='Pet perdido' />
        </View>
        <View style={styles.subtitles_column}>
          <Subtitle color={colors.blue} text='Pet resgatado' />
          <Subtitle color={colors.yellow} text='Pet desabrigado' />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: 16,
    alignItems: 'center'
  },
  mapView: {
    width: 343,
    height: 532,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...(Platform.OS !== 'web' ? {
      borderWidth: 1,
    } : {
      borderWidth: 2,
    }),
  },
  subtitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 343,
  },
  subtitles_column: {
    gap: 6
  },
  subtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  }
});