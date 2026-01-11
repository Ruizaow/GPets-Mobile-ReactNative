import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import { colors } from '@styles/colors.js';
import { fontStyles } from '@styles/fonts';
import { Icon } from 'leaflet';
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
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

  const center = [
    coordinateLat ?? -4.9708,
    coordinateLng ?? -39.0150,
  ];

  function getMarkerIcon(status) {
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
        zoom={16}
        zoomControl={false}
        style={styles.map}
        scrollWheelZoom={!isReadOnly}
        dragging={!isReadOnly}
        doubleClickZoom={!isReadOnly}
      >
        <ZoomController onReady={(map) => (mapRef.current = map)}/>

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {!isReadOnly && (
          <MapClickHandler
            enabled={!isReadOnly}
            onClick={handleMapClick}
          />
        )}

        {/* Modo readonly */}
        {isReadOnly &&
          coordinateLat && coordinateLng && (
            <Marker
              icon={getMarkerIcon(postStatus)}
              position={[coordinateLat, coordinateLng]}
            />
          )
        }

        {/* Modo interativo */}
        {!isReadOnly &&
          posts ?
            posts.map((post) => {
              const position = [post.coordinateLat, post.coordinateLng]
              return (
                <Marker
                  key={post.id}
                  icon={getMarkerIcon(post.status)}
                  position={position}
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