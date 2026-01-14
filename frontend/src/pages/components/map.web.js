import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { useMapContext } from '@context/MapContext';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { isSameCoordinate } from '@utils/coordinateComparison';

import red from '@assets/markers/marker_red.png';
import yellow from '@assets/markers/marker_yellow.png';
import green from '@assets/markers/marker_green.png';
import blue from '@assets/markers/marker_blue.png';
import grey from '@assets/markers/marker_grey.png';

const markerIcons = {
  Perdido: new Icon({ iconUrl: red.uri, shadowUrl: null, iconSize: [23, 28], iconAnchor: [11, 28] }),
  Desabrigado: new Icon({ iconUrl: yellow.uri, shadowUrl: null, iconSize: [23, 28], iconAnchor: [11, 28] }),
  Encontrado: new Icon({ iconUrl: green.uri, shadowUrl: null, iconSize: [23, 28], iconAnchor: [11, 28] }),
  Resgatado: new Icon({ iconUrl: blue.uri, shadowUrl: null, iconSize: [23, 28], iconAnchor: [11, 28] }),
  default: new Icon({ iconUrl: grey.uri, shadowUrl: null, iconSize: [23, 28], iconAnchor: [11, 28] })
};
const markerIconsLarge = {
  Perdido: new Icon({ iconUrl: red.uri, iconSize: [34.5, 42], iconAnchor: [22.5, 42] }),
  Desabrigado: new Icon({ iconUrl: yellow.uri, iconSize: [34.5, 42], iconAnchor: [22.5, 42] }),
  Encontrado: new Icon({ iconUrl: green.uri, iconSize: [34.5, 42], iconAnchor: [22.5, 42] }),
  Resgatado: new Icon({ iconUrl: blue.uri, iconSize: [34.5, 42], iconAnchor: [22.5, 42] }),
  default: new Icon({ iconUrl: grey.uri, iconSize: [34.5, 42], iconAnchor: [22.5, 42] }),
};

const MapEvents = () => {
  const map = useMap();
  const { updateMapState } = useMapContext();

  useEffect(() => {
    map.on('moveend', () => {
      const center = map.getCenter();
      const zoom = map.getZoom();

      updateMapState({
        latitude: center.lat,
        longitude: center.lng,
        zoom,
      });
    });
  }, [map]);

  return null;
};

const MapClickHandler = ({ enabled, onClick }) => {
  useMapEvents({
    click(e) {
      if (!enabled) return;
      onClick({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    },
  });
  return null;
}

const ZoomController = ({ onReady }) => {
  const map = useMap();

  useEffect(() => {
    if (map) onReady(map);
  }, [map, onReady]);

  return null;
}

export function Map({ posts, postStatus, onPressLocation, onPressMarker, isReadOnly = false, coordinateLat, coordinateLng }) {
  const { mapState } = useMapContext();
  const [marker, setMarker] = useState(null);
  const mapRef = useRef(null);

  function getCenter() {
    if (typeof coordinateLat === 'number' && typeof coordinateLng === 'number') {
      return { latitude: coordinateLat, longitude: coordinateLng}
    }
    if (posts) {
      return { latitude: mapState.latitude, longitude: mapState.longitude }
    }
    return { latitude: -4.9708, longitude: -39.0150 }
  }
  const center = [getCenter().latitude, getCenter().longitude]

  function getMarkerIcon(status) {
    return markerIcons[status] || markerIcons.default;
  }
  function getMarkerIconByHighlight(status, isHighlighted) {
    if (isHighlighted) {
      return markerIconsLarge[status] || markerIconsLarge.default;
    }
    return markerIcons[status] || markerIcons.default;
  }
  
  useEffect(() => {
    if (typeof coordinateLat !== 'number' || typeof coordinateLng !== 'number') return;

    const newMarker = {
      latitude: coordinateLat,
      longitude: coordinateLng,
    };
    setMarker(newMarker);
    
    if (mapRef.current) {
      mapRef.current.flyTo([coordinateLat, coordinateLng], mapRef.current.getZoom(), {
        duration: 0.3
      });
    }
  }, [coordinateLat, coordinateLng]);

  function handleMapClick(coords) {
    if (posts) return;

    setMarker(coords);
    mapRef.current?.flyTo([coords.latitude, coords.longitude], mapRef.current.getZoom(), {
      duration: 0.3
    });

    onPressLocation?.(coords);
  }

  function zoomIn() {
    mapRef.current?.zoomIn();
  }
  function zoomOut() {
    mapRef.current?.zoomOut();
  }

  return (
    <div style={styles.mapContainer}>
      <MapContainer
        center={center}
        zoom={mapState.zoom}
        zoomControl={false}
        style={styles.map}
        scrollWheelZoom={!isReadOnly}
        dragging={!isReadOnly}
        doubleClickZoom={!isReadOnly}
      >
        {posts && <MapEvents/>}
        <ZoomController onReady={(map) => (mapRef.current = map)}/>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* Modo readonly — marker fixo */}
        {isReadOnly &&
          coordinateLat && coordinateLng && (
            <Marker
              icon={getMarkerIcon(postStatus)}
              position={[coordinateLat, coordinateLng]}
            />
          )
        }
        {/* Modo interativo */}
        {!isReadOnly && (
          <MapClickHandler
            enabled={!isReadOnly}
            onClick={handleMapClick}
          />
        )}
        {!isReadOnly &&
          posts ?
            posts.map((post) => {
              const position = [post.coordinateLat, post.coordinateLng];
              const isHighlighted =
                typeof coordinateLat === 'number' &&
                typeof coordinateLng === 'number' &&
                isSameCoordinate(
                  post.coordinateLat, post.coordinateLng,
                  coordinateLat, coordinateLng
                );
              return (
                <Marker
                  key={post.id}
                  icon={getMarkerIconByHighlight(post.status, isHighlighted)}
                  position={position}
                  zIndexOffset={isHighlighted ? 1000 : 0}
                  eventHandlers={{click: () => onPressMarker?.(post)}}
                />
              )
            }
          ) : marker && (
            <Marker
              icon={getMarkerIcon(postStatus)}
              position={[marker.latitude, marker.longitude]}
            />
          )
        }
      </MapContainer>

      {!isReadOnly && (
        <div style={styles.zoomControls}>
          <button
            style={styles.zoomButton}
            onMouseDown={(e) => {
              e.currentTarget.style.opacity = '0.6';
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={zoomIn}>+</button>

          <button
            style={styles.zoomButton}
            onMouseDown={(e) => {
              e.currentTarget.style.opacity = '0.6';
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={zoomOut}>−</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  mapContainer: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: 0
  },
  zoomControls: {
    position: 'absolute',
    right: 16,
    bottom: 28,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    zIndex: 1000,
    pointerEvents: 'auto'
  },
  zoomButton: {
    width: 44,
    height: 44,
    borderRadius: 100,
    backgroundColor: colors.white,
    border: 'none',
    outline: 'none',
    fontSize: 24,
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    transition: 'opacity 0.15s ease, transform 0.1s ease',
    ...fontStyles.title_2
  }
};