<template>
  <div id="map" :style="mapStyle"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  name: 'MapComponent',
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      mapStyle: {
        height: '400px',
        width: '100%',
      },
      marker: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.lon, this.lat],
        zoom: 16,
      });

      this.map.addControl(new mapboxgl.NavigationControl());

      this.marker = new mapboxgl.Marker().setLngLat([this.lon, this.lat]).addTo(this.map);
    },
    updateMap() {
      if (this.map) {
        this.map.setCenter([this.lon, this.lat]);
        this.marker.setLngLat([this.lon, this.lat]);
      }
    },
  },
  watch: {
    lat() {
      this.updateMap();
    },
    lon() {
      this.updateMap();
    },
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style scoped>
#map {

}
</style>
