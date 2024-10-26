<template>
  <h1>Hello world!</h1>
  <UButton>Click me</UButton>
  <MapboxMap
    style="position: relative; width: 100%; height: 900px; border: 1px solid #ccc;"
    map-id="map"
    @click="onMapClick"
    :options="{
        style: 'mapbox://styles/jakubkoje/cm2pdg972007d01qwciof9hbn', // style URL
        center: [17.150450, 48.157436], // starting position
        zoom: 20 // starting zoom
      }"
  >
<!--    <MapboxGeocoder :options="{-->
<!--      countries: 'SK',-->
<!--      proximity: [17.107748, 48.148598],-->
<!--      bbox: [17.107748, 48.148598, 17.147278, 48.158005]-->
<!--    }" />-->
  </MapboxMap>
  <USlider :min="0" :max="359" :default-value="50" v-model="rotation" />
</template>

<script setup lang="ts">
import {useMapbox} from "#imports";

const {data, error} = await useFetch('/api/waters', {
  body: { x: 48.158005, y: 17.147278, minimumDistance: 40 },
})

console.log("Log: ", data);

const onMapClick = (e: any) => {
  console.log(e.lngLat)
}

const rotation = ref(0);

let center = [17.150450, 48.157436];  // Center point of the box

// Calculate the coordinates for a 3x5 meter box
const latitudeOffset = 0.000027;
const longitudeOffset = 0.000070;

const boxCoordinates = [
  [center[0] - longitudeOffset / 2, center[1] - latitudeOffset / 2], // Bottom-left
  [center[0] + longitudeOffset / 2, center[1] - latitudeOffset / 2], // Bottom-right
  [center[0] + longitudeOffset / 2, center[1] + latitudeOffset / 2], // Top-right
  [center[0] - longitudeOffset / 2, center[1] + latitudeOffset / 2], // Top-left
  [center[0] - longitudeOffset / 2, center[1] - latitudeOffset / 2]  // Closing point
];
let originalCoords = [...boxCoordinates];  // Store the original coordinates

useMapbox('map', (map) => {
  map.addSource('box', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [boxCoordinates]
      }
    }
  });

  // Add the box as a layer
  map.addLayer({
    id: 'box-layer',
    type: 'fill',
    source: 'box',
    layout: {},
    paint: {
      'fill-color': '#0000FF',
      'fill-opacity': 0.5
    }
  });

  // Add draggable functionality
  let isDragging = false;
  let startCoords = null;

  map.on('mousedown', 'box-layer', (e) => {
    e.preventDefault();
    isDragging = true;
    startCoords = e.lngLat;
  });

  map.on('mousemove', (e) => {
    if (!isDragging) return;

    // Calculate the new center based on the drag movement
    const dx = e.lngLat.lng - startCoords.lng;
    const dy = e.lngLat.lat - startCoords.lat;

    // Reset the box to the original unrotated state and translate it based on drag
    const translatedCoordinates = originalCoords.map(coord => [
      coord[0] + dx,
      coord[1] + dy
    ]);

    map.getSource('box').setData({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [translatedCoordinates]
      }
    });

    // Update center to new drag position
    center = [e.lngLat.lng, e.lngLat.lat];
  });

  map.on('mouseup', () => {
    isDragging = false;
    originalCoords = map.getSource('box')._data.geometry.coordinates[0]; // Update original coordinates
  });


// Function to calculate rotated coordinates
  const getRotatedCoordinates = (center, angle) => {
    const cos = Math.cos(toRadians(angle));
    const sin = Math.sin(toRadians(angle));

    return originalCoords.map(([lng, lat]) => {
      const [x, y] = toMeters(lng, lat, center);

      // Apply rotation
      const xNew = x * cos - y * sin;
      const yNew = x * sin + y * cos;

      // Convert back to lat/lng
      return toCoordinate(xNew, yNew, center);
    });
  };

  const rotateBox = (newAngle) => {
    const newCoordinates = getRotatedCoordinates(center, newAngle);

    map.getSource('box').setData({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [newCoordinates]
      }
    });
    originalCoords = newCoordinates;
  };

  watch(rotation, (newValue, oldValue) => {
    console.log("Log: ", newValue);
    const rotationOffset = newValue - oldValue;
    rotateBox(rotationOffset);
  });

  map.loadImage(
    '/bin.png',
    (err, image) => {
      // Throw an error if something goes wrong.
      if (err) throw err;

      // Add the image to the map style.
      map.addImage('pattern', image);

      // Create a new layer and style it using `fill-pattern`.
      map.addLayer({
        'id': 'pattern-layer',
        'type': 'fill',
        'source': 'box',
        'paint': {
          'fill-pattern': 'pattern'
        }
      });
    }
  );
})



// Example of rotating the box with a button click or other event
onMounted(() => {
});


// 5x5, 4x5,
</script>
