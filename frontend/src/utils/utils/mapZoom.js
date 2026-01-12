function getZoomCenter(marker, region) {
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

export function zoomIn(marker, region, setRegion, mapRef) {
  const center = getZoomCenter(marker, region);

  const newRegion = {
    ...center,
    latitudeDelta: region.latitudeDelta / 2,
    longitudeDelta: region.longitudeDelta / 2,
  };

  setRegion(newRegion);
  mapRef.current?.animateToRegion(newRegion, 300);
}

export function zoomOut(marker, region, setRegion, mapRef) {
  const center = getZoomCenter(marker, region);

  const newRegion = {
    ...center,
    latitudeDelta: region.latitudeDelta * 2,
    longitudeDelta: region.longitudeDelta * 2,
  };
    
  setRegion(newRegion);
  mapRef.current?.animateToRegion(newRegion, 300);
}