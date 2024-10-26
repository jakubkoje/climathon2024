<template>
  <h1>Hello world!</h1>
  <UButton>Click me</UButton>
  <MapboxMap
    style="position: relative; width: 100%; height: 900px; border: 1px solid #ccc;"
    map-id="map"
    @click="onMapClick"
    :options="{
        style: 'mapbox://styles/jakubkoje/cm2pdg972007d01qwciof9hbn', // style URL
        center: [17.107748, 48.148598], // starting position
        zoom: 5 // starting zoom
      }"
  >
  </MapboxMap>
</template>

<script setup lang="ts">
const {data, error} = await useFetch('/api/waters', {
  body: { x: 48.158005, y: 17.147278, minimumDistance: 40 },
})

console.log("Log: ", data);

const onMapClick = (e: any) => {
  console.log(e.lngLat)
}
</script>
