const EARTH_RADIUS = 6378137; // Radius of Earth in meters (WGS84 ellipsoid)

export const toRadians = (degrees) => degrees * (Math.PI / 180);

export const toDegrees = (radians) => radians * (180 / Math.PI);

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

export const toLocalTangentPlane = (lng, lat, center) => {
  const [lngCenter, latCenter] = center;

  // Convert everything to radians
  const lngRad = toRadians(lng);
  const latRad = toRadians(lat);
  const lngCenterRad = toRadians(lngCenter);
  const latCenterRad = toRadians(latCenter);

  // Calculate differences
  const deltaLng = lngRad - lngCenterRad;
  const deltaLat = latRad - latCenterRad;

  // Calculate distances in meters using the Haversine approximation
  const x = EARTH_RADIUS * deltaLng * Math.cos(latCenterRad); // East direction
  const y = EARTH_RADIUS * deltaLat; // North direction

  return [x, y];
};

export const fromLocalTangentPlane = (x, y, center) => {
  const [lngCenter, latCenter] = center;

  // Convert center coordinates to radians
  const latCenterRad = toRadians(latCenter);

  // Convert from meters to radians
  const deltaLng = x / (EARTH_RADIUS * Math.cos(latCenterRad));
  const deltaLat = y / EARTH_RADIUS;

  // Calculate the final longitude and latitude in radians, then convert to degrees
  const lng = toDegrees(toRadians(lngCenter) + deltaLng);
  const lat = toDegrees(toRadians(latCenter) + deltaLat);

  return [lng, lat];
};
