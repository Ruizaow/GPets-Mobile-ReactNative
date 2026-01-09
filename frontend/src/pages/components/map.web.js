import { StyleSheet, View, Text } from 'react-native';

export function Map() {
  return (
    <View style={styles.mapContainer}>
      <Text>Mapa disponível apenas no versão mobile.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  },
});