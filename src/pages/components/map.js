import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRef, useState } from 'react';
import { mockedMarkers } from '@constants/mockDataMarker';

export function Map({useMarkers = true, onPressLocation}) {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

  const [region, setRegion] = useState({
    latitude: -4.9708,
    longitude: -39.0150,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  function handleMapPress(event) {
    if (useMarkers) return;

    const { latitude, longitude } = event.nativeEvent.coordinate;

    const newMarker = { latitude, longitude };
    setMarker(newMarker);

    const newRegion = {
      ...region,
      latitude,
      longitude,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);

    onPressLocation?.(newMarker);
  }

  function getZoomCenter() {
    if (marker) {
      return {
        latitude: marker.latitude,
        longitude: marker.longitude,
      };
    }
    return {
      latitude: region.latitude,
      longitude: region.longitude,
    };
  }

  function zoomIn() {
    const center = getZoomCenter();

    const newRegion = {
      ...center,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };

    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  }

  function zoomOut() {
    const center = getZoomCenter();

    const newRegion = {
      ...center,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };
    
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 300);
  }

  function onMarkerSelected(marker) {
    Alert.alert(marker.name);
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={styles.mapView}
        initialRegion={region}
        onPress={handleMapPress}
      >
        {useMarkers ?
          mockedMarkers.map((marker, index) => (
            <Marker key={index} coordinate={marker} onPress={() => onMarkerSelected(marker)}/>
          )
        ) : marker && (
          <Marker coordinate={marker} />
        )}
      </MapView>

      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <Text style={styles.zoomText}>−</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  },
  mapView: {
    width: '100%',
    height: '100%'
  },
  zoomControls: {
    position: 'absolute',
    right: 16,
    bottom: 32,
    gap: 12,
  },
  zoomButton: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  zoomText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});