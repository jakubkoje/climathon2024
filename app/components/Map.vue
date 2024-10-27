<template>
  <MapboxMap
    class="!relative !w-full aspect-[3/2] border border-gray-300 rounded-lg overflow-hidden"
    map-id="map"
    :options="{
        style: 'mapbox://styles/jakubkoje/cm2pdg972007d01qwciof9hbn',
        center: initialCenter,
        zoom: 20
      }"
  />

  <USlider :min="0" :max="359" :default-value="50" v-model="rotation" class="my-4" />
</template>

<script setup lang="ts">
const props = defineProps<{ container: number, center: number[] }>();
const model = defineModel()
const rotation = ref(0);

const initialCenter = [...props.center];

const latitudeOffset = ref(0.00002703);
const longitudeOffset = ref(0.00007243);

const boxCoordinates = computed(() => [
  [center[0] - longitudeOffset.value / 2, center[1] - latitudeOffset.value / 2], // Bottom-left
  [center[0] - longitudeOffset.value / 2, center[1] + latitudeOffset.value / 2], // Top-left
  [center[0] + longitudeOffset.value / 2, center[1] + latitudeOffset.value / 2], // Top-right
  [center[0] + longitudeOffset.value / 2, center[1] - latitudeOffset.value / 2], // Bottom-right
  [center[0] - longitudeOffset.value / 2, center[1] - latitudeOffset.value / 2]  // Closing the loop
]);

let center = [...props.center];


const containers = {
  1: {
    image: 'sm.png',
    latitudeOffset: 0.00002703,
    longitudeOffset: 0.00007243
  },
  2: {
    image: 'md.png',
    latitudeOffset: 0.00003153,
    longitudeOffset: 0.00007967
  },
  3: {
    image: 'lg.png',
    latitudeOffset: 0.00003604,
    longitudeOffset: 0.00008691
  },
  4: {
    image: 'xl.png',
    latitudeOffset: 0.00004054,
    longitudeOffset: 0.00009416
  },
};

let originalCoords = [...boxCoordinates.value];

useMapbox('map', (map) => {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  canvas.style.pointerEvents = 'none';
  const context = canvas.getContext('2d');

  const img = new Image();
  img.onload = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(rotation.value * (Math.PI / 180)); // Apply current rotation angle
    context.translate(-canvas.width / 2, -canvas.height / 2);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context.restore();
  };

  img.src = containers[props.container].image;

  map.addSource('canvas-source', {
    type: 'canvas',
    canvas: canvas,
    coordinates: boxCoordinates.value.slice(0, 4)
  });

  map.addLayer({
    id: 'canvas-layer',
    type: 'raster',
    source: 'canvas-source'
  });

  map.addSource('box', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [boxCoordinates.value]
      }
    }
  });

  map.addLayer({
    id: 'box-layer',
    type: 'fill',
    source: 'box',
    paint: {
      'fill-color': '#0000FF',
      'fill-opacity': 0
    }
  });

  model.value = map.getSource('box')._data.geometry.coordinates[0];


  let isDragging = false;
  let startCoords = null;

  map.on('mousedown', 'box-layer', (e) => {
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
    console.log(originalCoords);
    model.value = originalCoords;
  });

  const getRotatedCoordinates = (center, angle) => {
    const cos = Math.cos(toRadians(angle));
    const sin = Math.sin(toRadians(angle));

    return originalCoords.map(([lng, lat]) => {
      const [x, y] = toLocalTangentPlane(lng, lat, center);
      const xNew = x * cos - y * sin;
      const yNew = x * sin + y * cos;

      return fromLocalTangentPlane(xNew, yNew, center);
    });
  };

  const rotateBox = (newAngle) => {
    const newCoordinates = getRotatedCoordinates(center, newAngle);
    updateBoxAndCanvas(newCoordinates);

    originalCoords = newCoordinates;
    model.value = originalCoords;

    // Redraw image with new rotation angle
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(newAngle * (Math.PI / 180));
    context.translate(-canvas.width / 2, -canvas.height / 2);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context.restore();
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
    const angleDiff = newValue - oldValue;
    rotateBox(angleDiff);
  });

  watch(
    () => props.container,
    (newContainer) => {
      img.src = containers[newContainer].image;
      latitudeOffset.value = containers[newContainer].latitudeOffset;
      longitudeOffset.value = containers[newContainer].longitudeOffset;

      const newCoordinates = [
        [center[0] - longitudeOffset.value / 2, center[1] - latitudeOffset.value / 2],
        [center[0] - longitudeOffset.value / 2, center[1] + latitudeOffset.value / 2],
        [center[0] + longitudeOffset.value / 2, center[1] + latitudeOffset.value / 2],
        [center[0] + longitudeOffset.value / 2, center[1] - latitudeOffset.value / 2],
        [center[0] - longitudeOffset.value / 2, center[1] - latitudeOffset.value / 2]
      ];

      updateBoxAndCanvas(newCoordinates);
      originalCoords = newCoordinates;
      model.value = originalCoords;

      // Ensure new image is drawn with rotation
      img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  );
});
</script>
