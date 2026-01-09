import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useRef, useState } from 'react';
import { mockedMarkers } from '@constants/mockDataMarker';

export function Map({ useMarkers=true, onPressLocation, isReadOnly=false, coordinateLat, coordinateLng }) {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

  const [region, setRegion] = useState({
    latitude: coordinateLat || -4.9708,
    longitude: coordinateLng || -39.0150,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    if (typeof coordinateLat === 'number' && typeof coordinateLng === 'number') {
      const newMarker = {
        latitude: coordinateLat,
        longitude: coordinateLng
      };
      setMarker(newMarker);

      const newRegion = {
        ...region,
        latitude: coordinateLat,
        longitude: coordinateLng,
      };
      setRegion(newRegion);

      mapRef.current?.animateToRegion(newRegion, 1);
    }
  }, [coordinateLat, coordinateLng]);

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
        scrollEnabled={!isReadOnly}
        zoomEnabled={!isReadOnly}
        rotateEnabled={!isReadOnly}
        pitchEnabled={!isReadOnly}
        onPress={isReadOnly ? undefined : handleMapPress}
      >
        {/* Modo readonly — marker fixo */}
        {isReadOnly &&
          coordinateLat && coordinateLng && (
            <Marker coordinate={{ latitude: coordinateLat, longitude: coordinateLng }}/>
          )
        }
        {/* Modo interativo padrão */}
        {!isReadOnly &&
          useMarkers ?
            mockedMarkers.map((_marker, index) => (
              <Marker key={index} coordinate={_marker} onPress={() => onMarkerSelected(_marker)}/>
            )
          ) : marker && (
            <Marker coordinate={marker} />
          )
        }
      </MapView>

      {!isReadOnly && (
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
            <Text style={styles.zoomText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
            <Text style={styles.zoomText}>−</Text>
          </TouchableOpacity>
        </View>
      )}
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