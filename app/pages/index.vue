<template>
  <h1>Hello world!</h1>
  <UButton>Click me</UButton>
  <MapboxMap
    style="position: relative; width: 100%; height: 400px; border: 1px solid #ccc;"
    map-id="map"
    :options="{
        style: 'mapbox://styles/jakubkoje/cm2pdg972007d01qwciof9hbn', // style URL
        center: [17.107748, 48.148598], // starting position
        zoom: 5 // starting zoom
      }"
  >
  </MapboxMap>
</template>

<script setup lang="ts">
const {data} = await useFetch('/api/test', {server: false})
watch(data, () => {
  console.log(data.value[0].geojson)
})
</script>
