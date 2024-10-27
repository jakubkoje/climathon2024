<template>
  <div>
    <h2 class="text-lg font-bold mb-4">Recapitulation</h2>
    <UForm class="space-y-4 py-4">
      <UCard class="m-2 mb-4 bg-gray-50 border-none	">
        <div class="flex gap-8 flex-col">
          <h3 class="text-lg font-semibold mb-2">
            Information about the Administrator of the building
          </h3>
          <p><strong>Name:</strong> {{ store.formData.step1.firstName }} {{ store.formData.step1.lastName }}</p>
          <p>
            <strong>Address:</strong><br />
            {{ store.formData.step1.address }}<br />
            {{ store.formData.step1.city }}, {{ store.formData.step1.postalCode }}
          </p>
          <p><strong>Email:</strong> {{ store.formData.step1.email }}</p>
          <p><strong>Phone number:</strong> {{ store.formData.step1.phone }}</p>
        </div>
      </UCard>

      <UCard class="m-2 mb-4 bg-gray-50 border-none	">
        <div class="flex gap-8 flex-col">
          <h3 class="text-lg font-semibold mb-2">Information about the building</h3>
          <p>
            <strong>Address:</strong><br />
            {{ store.formData.step2.address.place_name }}<br />
            {{ store.formData.building.postalCode }}
          </p>
        </div>
      </UCard>

      <UCard class="m-2 mb-4 bg-gray-50 border-none	">
        <div class="flex gap-8 flex-col">
          <h3 class="text-lg font-semibold mb-2">Selected Container</h3>
          <p><strong>Position of the container:</strong></p>
          <div class="border border-gray-300 rounded-lg overflow-hidden mb-2">
            <img
                src="https://placehold.co/400x200"
                alt="Map with container position"
                class="w-full"
            />
          </div>
        </div>
      </UCard>

      <div class="flex justify-end gap-2 mt-6">
        <UButton @click="saveRequest" :ui="{ base: 'bg-white hover:bg-neutral-100 hover:opacity-80 h-[2.5rem] px-8 text-black border border-2 border-[#F4CDCA]'}">
          Save request
        </UButton>
        <UButton @click="sendEmail" :ui="{ base: 'bg-[#F4CDCA] hover:bg-[#F4CDCA] hover:opacity-80 h-[2.5rem] px-8 text-black'}" type="submit">
          Save and send via email
          <span class="ml-2">&rarr;</span>
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/useFormStore';
import * as v from "valibot";
import GeoJSON from "geojson";

const store = useFormStore();

const submitStep = () => {
  console.log('Final Submission:', store.formData);
};

const saveRequest = async () => {
  try {
    const response = await $fetch('/api/storage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: imageUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to save request');
    }

    const result = await response.json();
    console.log('Request saved:', result);
  } catch (error) {
    console.error('Error saving request:', error);
  }
};

const sendEmail = () => {

};

const { public: { mapbox: { accessToken } } } = useRuntimeConfig();

// https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/geojson({"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[[[17.149888834217904,48.158094410545345],[17.149888834217904,48.15709656033857],[17.1524243341743,48.15709656033857],[17.1524243341743,48.158094410545345],[17.149888834217904,48.158094410545345]]],"type":"Polygon"}}]})/auto/500x300?access_token=pk.eyJ1IjoiamFrdWJrb2plIiwiYSI6ImNraW00cDJmdzBvYjczMXA5dzJwZHRyY20ifQ.yk8SaFKG2QFChkFWgZaCEA
const imageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/geojson(${encodeURI(JSON.stringify(GeoJSON.parse({
    boundingBox: [toRaw(store.formData.building.map)]
  },
  {
    Polygon: 'boundingBox'
  })))})/auto/1280x853?access_token=${accessToken}`;
</script>

<style scoped></style>
