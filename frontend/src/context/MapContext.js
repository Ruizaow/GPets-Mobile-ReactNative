import { createContext, useContext, useState } from 'react';

const MapContext = createContext({});

export function MapProvider({ children }) {
  const [mapState, setMapState] = useState({
    latitude: -4.9708,
    longitude: -39.0150,
    zoom: 16,
  });

  function updateMapState(partial) {
    setMapState(prev => ({ ...prev, ...partial }));
  }

  return (
    <MapContext.Provider value={{ mapState, updateMapState }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  return useContext(MapContext);
}