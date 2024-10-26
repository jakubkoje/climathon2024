<template>
  <h1>Hello world!</h1>
  <UButton>Click me</UButton>
  <MapboxMap
    style="position: relative; width: 100%; height: 900px; border: 1px solid #ccc;"
    map-id="map"
    @click="onMapClick"
    :options="{
        style: 'mapbox://styles/jakubkoje/cm2pdg972007d01qwciof9hbn',
        center: [17.150450, 48.157436],
        zoom: 20
      }"
  />
  <USlider :min="0" :max="359" :default-value="50" v-model="rotation" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useFetch } from '#imports';
import { useMapbox } from '#imports';

const { data, error } = await useFetch('/api/waters', {
  body: { x: 48.158005, y: 17.147278, minimumDistance: 40 },
});

console.log("Log: ", data);

const onMapClick = (e: any) => {
  console.log(e.lngLat);
};

const rotation = ref(0);

let center = [17.150450, 48.157436];
const latitudeOffset = 0.000027;
const longitudeOffset = 0.000070;

const boxCoordinates = [
  [center[0] - longitudeOffset / 2, center[1] - latitudeOffset / 2], // Bottom-left
  [center[0] - longitudeOffset / 2, center[1] + latitudeOffset / 2], // Top-left
  [center[0] + longitudeOffset / 2, center[1] + latitudeOffset / 2], // Top-right
  [center[0] + longitudeOffset / 2, center[1] - latitudeOffset / 2], // Bottom-right
  [center[0] - longitudeOffset / 2, center[1] - latitudeOffset / 2]  // Closing the loop
]

let originalCoords = [...boxCoordinates];

useMapbox('map', (map) => {
  // Create a canvas element for the CanvasSource
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  canvas.style.pointerEvents = 'none';
  const context = canvas.getContext('2d');

  const img = new Image();
  img.onload = () => {
    // Clear any existing drawings and draw the image
    context.clearRect(0, 0, canvas.width, canvas.height);
    // rotate the image 90 degrees
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(Math.PI / 2);
    context.translate(-canvas.width / 2, -canvas.height / 2);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

  };
  img.src = '/bin.png';

  // Add the canvas as a source
  map.addSource('canvas-source', {
    type: 'canvas',
    canvas: canvas,
    coordinates: boxCoordinates.slice(0, 4)
  });

  // Ensure the layers are rendered in the correct order
  map.addLayer({
    id: 'canvas-layer',
    type: 'raster',
    source: 'canvas-source'
  });

  // Add the box source
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

  // Add the box layer on top
  map.addLayer({
    id: 'box-layer',
    type: 'fill',
    source: 'box',
    paint: {
      'fill-color': '#0000FF',
      'fill-opacity': 0.5
    }
  });

  let isDragging = false;
  let startCoords = null;

  map.on('mousedown', 'box-layer', (e) => {
    console.log("Log: ", e);
    e.preventDefault();
    isDragging = true;
    startCoords = e.lngLat;
  });

  map.on('mousemove', (e) => {
    if (!isDragging) return;

    const dx = e.lngLat.lng - startCoords.lng;
    const dy = e.lngLat.lat - startCoords.lat;

    const translatedCoordinates = originalCoords.map(coord => [
      coord[0] + dx,
      coord[1] + dy
    ]);

    updateBoxAndCanvas(translatedCoordinates);
    center = [e.lngLat.lng, e.lngLat.lat];
  });

  map.on('mouseup', () => {
    isDragging = false;
    originalCoords = map.getSource('box')._data.geometry.coordinates[0];
  });

  const getRotatedCoordinates = (center, angle) => {
    const cos = Math.cos(toRadians(angle));
    const sin = Math.sin(toRadians(angle));

    return originalCoords.map(([lng, lat]) => {
      // Convert to a local tangent plane (e.g., using UTM coordinates)
      const [x, y] = toLocalTangentPlane(lng, lat, center);

      // Apply rotation
      const xNew = x * cos - y * sin;
      const yNew = x * sin + y * cos;

      // Convert back to longitude and latitude
      return fromLocalTangentPlane(xNew, yNew, center);
    });
  };


  const rotateBox = (newAngle) => {
    const newCoordinates = getRotatedCoordinates(center, newAngle);
    updateBoxAndCanvas(newCoordinates);
    originalCoords = newCoordinates;
  };

  const updateBoxAndCanvas = (coordinates) => {
    map.getSource('box').setData({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [coordinates]
      }
    });
    map.getSource('canvas-source').setCoordinates(coordinates.slice(0, 4));
  };

  watch(rotation, (newValue, oldValue) => {
    console.log('AAA')
    const angleDiff = newValue - oldValue;
    rotateBox(angleDiff);
  });
});

</script>
