<template>
  <h1>Hello world!</h1>
  <UButton>Click me</UButton>
<!--  <LMap-->
<!--    style="height: 350px"-->
<!--    :zoom="6"-->
<!--    :center="[48.148598, 17.107748]"-->
<!--    :use-global-leaflet="false"-->
<!--  >-->
<!--    <LTileLayer-->
<!--      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"-->
<!--      attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"-->
<!--      layer-type="base"-->
<!--      name="OpenStreetMap"-->
<!--    />-->
<!--    <LGeoJson-->
<!--      :geojson="data[0].geojson"-->
<!--      :options-style="{opacity: 0.5}"-->
<!--    />-->
<!--  </LMap>-->
  <MapboxMap
    style="position: relative; width: 100%; height: 400px; border: 1px solid #ccc;"
    map-id="{ID}"
    :options="{
        style: 'mapbox://styles/mapbox/light-v11', // style URL
        center: [17.107748, 48.148598], // starting position
        zoom: 5 // starting zoom
      }"
  >
    <MapboxSource
      source-id="{ID}"
      :source="{
          type: 'geojson-layer',
          data: data[0].geojson,
        }"
    />
  </MapboxMap>
</template>

<script setup lang="ts">
const {data} = await useFetch('/api/test')
console.log(data.value[0].geojson)
</script>
