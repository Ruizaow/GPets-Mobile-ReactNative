import './map.web.css';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { colors } from '@styles/colors.js';

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapClickHandler({ enabled, onClick }) {
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

function ZoomController({ onReady }) {
  const map = useMap();

  useEffect(() => {
    if (map) onReady(map);
  }, [map, onReady]);

  return null;
}

export function Map({ posts, useMarkers = true, onPressLocation, isReadOnly = false, coordinateLat, coordinateLng }) {
  const mapRef = useRef(null);
  const [marker, setMarker] = useState(null);

  const center = [
    coordinateLat ?? -4.9708,
    coordinateLng ?? -39.0150,
  ];

  /* Atualiza centro quando props mudarem */
  useEffect(() => {
    if (typeof coordinateLat === 'number' && typeof coordinateLng === 'number' && mapRef.current) {
      const newMarker = {
        latitude: coordinateLat,
        longitude: coordinateLng,
      };
      setMarker(newMarker);
      mapRef.current.flyTo([coordinateLat, coordinateLng], mapRef.current.getZoom(), {
        duration: 0.3
      });
    }
  }, [coordinateLat, coordinateLng]);

  function handleMapClick(coords) {
    if (useMarkers) return;

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
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer
        center={center}
        zoom={16}
        zoomControl={false}
        style={{ width: '100%', height: '100%', zIndex: 0, }}
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
          coordinateLat &&
          coordinateLng && (
            <Marker
              position={[coordinateLat, coordinateLng]}
              icon={defaultIcon}
            />
          )
        }

        {/* Modo interativo */}
        {!isReadOnly &&
          useMarkers ?
            posts.map((post, index) => {
              const postMarker = { latitude: post.coordinateLat, longitude: post.coordinateLng }
              return (
                <Marker key={index} icon={defaultIcon}
                  position={[postMarker.latitude, postMarker.longitude]}
                >
                  <Popup>{post.address}</Popup>
                </Marker>
              )
            }
          ) : marker && (
            <Marker icon={defaultIcon}
              position={[marker.latitude, marker.longitude]}
            />
          )
        }
      </MapContainer>

      {!isReadOnly && (
        <div style={styles.zoomControls}>
          <button style={styles.zoomButton} className='zoom-button' onClick={zoomIn}>+</button>
          <button style={styles.zoomButton} className='zoom-button' onClick={zoomOut}>−</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  zoomControls: {
    position: 'absolute',
    right: 16,
    bottom: 32,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    zIndex: 1000,
    pointerEvents: 'auto'
  },
  zoomButton: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    backgroundColor: colors.white,
    border: 'none',
    fontSize: 24,
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    transition: 'opacity 0.15s ease, transform 0.1s ease'
  },
};