export const toRadians = (degrees) => degrees * (Math.PI / 180);

export const toCoordinate = (x, y, center) => {
  const lng = x / 71100 + center[0];
  const lat = y / 111320 + center[1];
  return [lng, lat];
};

export const toMeters = (lng, lat, center) => {
  const x = (lng - center[0]) * 71100; // Approx for this latitude
  const y = (lat - center[1]) * 111320;
  return [x, y];
};
