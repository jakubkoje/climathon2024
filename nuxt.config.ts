// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  colorMode: {
    preference: 'light'
  },
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxt/ui', '@nuxt/devtools', '@nuxtjs/leaflet', 'nuxt-mapbox', '@pinia/nuxt'],
  mapbox: {
    accessToken: 'pk.eyJ1IjoiamFrdWJrb2plIiwiYSI6ImNraW00cDJmdzBvYjczMXA5dzJwZHRyY20ifQ.yk8SaFKG2QFChkFWgZaCEA'
  },
  css: ['~/assets/index.css'],
  runtimeConfig: {
    drizzle: {
      databaseUrl: 'postgresql://postgres:postgres@188.245.91.0:5432/postgres'
    },
    firebase: {
      apiKey: "AIzaSyCx7IV5CKwvEqDhdEGAs_PwaHvX0mktweM",
      authDomain: "climathon2024-73064.firebaseapp.com",
      projectId: "climathon2024-73064",
      storageBucket: "climathon2024-73064.appspot.com",
      messagingSenderId: "178277372862",
      appId: "1:178277372862:web:3d5c58a1cc1701045a9fef"
    }
  }
})