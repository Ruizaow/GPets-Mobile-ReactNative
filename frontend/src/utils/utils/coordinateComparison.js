export function isSameCoordinate(lat1, lng1, lat2, lng2) {
  const EPSILON = 0.00001;
  return (
    Math.abs(lat1 - lat2) < EPSILON &&
    Math.abs(lng1 - lng2) < EPSILON
  );
}