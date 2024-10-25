// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/devtools',
    '@nuxtjs/leaflet',
    'nuxt-mapbox',
  ],
  mapbox: {
    accessToken: 'pk.eyJ1IjoiamFrdWJrb2plIiwiYSI6ImNraW00cDJmdzBvYjczMXA5dzJwZHRyY20ifQ.yk8SaFKG2QFChkFWgZaCEA'
  },
  css: ['~/assets/index.css'],
})
