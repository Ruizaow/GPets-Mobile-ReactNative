import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MapPin } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { useMapContext } from '@context/MapContext';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { zoomIn, zoomOut } from '@utils/mapZoom';

export function Map({ posts, postStatus, onPressLocation, onPressMarker, isReadOnly=false, coordinateLat, coordinateLng }) {
  const { mapState, updateMapState } = useMapContext();
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

  function getMarkerColor(status) {
    switch (status) {
      case 'Perdido': return colors.red;
      case 'Desabrigado': return colors.yellow;
      case 'Encontrado': return colors.green;
      case 'Resgatado': return colors.blue;
      default: return colors.grey;
    }
  }

  function getRegion() {
    if (typeof coordinateLat === 'number' && typeof coordinateLng === 'number') {
      return { latitude: coordinateLat, longitude: coordinateLng}
    }
    if (posts) {
      return { latitude: mapState.latitude, longitude: mapState.longitude }
    }
    return { latitude: -4.9708, longitude: -39.0150 }
  }
  
  const [region, setRegion] = useState({
    latitude: getRegion().latitude,
    longitude: getRegion().longitude,
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
    if (posts) return;

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

  function handleRegionChangeComplete(newRegion) {
    setRegion(newRegion);

    updateMapState({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
      zoom: Math.round(Math.log2(360 / newRegion.longitudeDelta)),
    });
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={styles.mapView}
        initialRegion={region}
        onRegionChangeComplete={posts && handleRegionChangeComplete}
        scrollEnabled={!isReadOnly}
        zoomEnabled={!isReadOnly}
        rotateEnabled={!isReadOnly}
        pitchEnabled={!isReadOnly}
        onPress={isReadOnly ? undefined : handleMapPress}
      >
        {/* Modo readonly — marker fixo */}
        {isReadOnly &&
          coordinateLat && coordinateLng && (
            <Marker
              coordinate={{ latitude: coordinateLat, longitude: coordinateLng }}
            >
              <MapPin size={32} color={getMarkerColor(postStatus)} fill={colors.white}/>
            </Marker>
          )
        }
        {/* Modo interativo padrão */}
        {!isReadOnly &&
          posts ?
            posts.map((post) => {
              const postMarker = { latitude: post.coordinateLat, longitude: post.coordinateLng }
              return (
                <Marker
                  key={post.id}
                  coordinate={postMarker}
                  onPress={() => onPressMarker?.(post)}
                >
                  <MapPin size={32} color={getMarkerColor(post.status)} fill={colors.white}/>
                </Marker>
              );
            }
          ) : marker && (
            <Marker coordinate={marker}>
              <MapPin size={32} color={getMarkerColor(postStatus)} fill={colors.white}/>
            </Marker>
          )
        }
      </MapView>

      {!isReadOnly && (
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomButton} onPress={() => zoomIn(marker, region, setRegion, mapRef)}>
            <Text style={styles.zoomText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={() => zoomOut(marker, region, setRegion, mapRef)}>
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
    borderRadius: 100,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  zoomText: {
    ...fontStyles.title_2
  },
});