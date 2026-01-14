import { StyleSheet, View, Text, Platform, useWindowDimensions } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { useTheme } from '@context/ThemeContext';
import { Map } from '@components/map';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { useFontsCustom } from '@hooks/useFontsCustom';
import { getPosts } from '@services/getPosts';

export default function MapView({ postMarker, setPostMarker, setShowPostMarkerModal }) {
  const { theme } = useTheme();
  const { petPosts, loading } = getPosts();
  const { height } = useWindowDimensions();
  const fontsLoaded = useFontsCustom();

  const mapHeight = height - 128;

  const Subtitle = ({ color, text }) => {
    return (
      <View style={styles.subtitle}>
        <MapPin size={24} color={color}/>
        <Text style={[fontStyles.subtitle_1, { color: theme.primaryText }]}>{text}</Text>
      </View>
    );
  }

  if (!fontsLoaded || loading) return null;

  return (
    <View style={[styles.mapContainer, { height: mapHeight }]}>
      <View style={[styles.mapView, { borderColor: theme.primaryText }]}>
        <Map
          posts={petPosts}
          coordinateLat={postMarker?.coordinateLat}
          coordinateLng={postMarker?.coordinateLng}
          onPressMarker={(post) => {
            setPostMarker(post);
            setShowPostMarkerModal(true);
          }}
        />
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
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 148
  },
  mapView: {
    width: 343,
    flex: 1,
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