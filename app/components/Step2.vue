<!-- components/Step2.vue -->
<template>
  <div class="flex flex-col gap-10">
    <h2>Residential Information</h2>
    <UForm
        :schema="v.safeParser(step2Schema)"
        :state="residentialState"
        @submit="submitStep"
        class="space-y-4"
    >
      <UFormField label="Address" name="address">
        <UInput
            v-model="residentialState.address"
            placeholder="Address"
            @blur="onAddressChange"
        />
      </UFormField>

      <UFormField label="Postal Code" name="postalCode">
        <UInput
            v-model="residentialState.postalCode"
            placeholder="Postal Code"
            @blur="onAddressChange"
        />
      </UFormField>

      <div class="flex justify-end gap-2 mt-6">
        <button
            type="button"
            @click="previousStep"
            class="flex items-center prev-button px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <span class="mr-2">&larr;</span>
          Previous step
        </button>

        <button
            type="button"
            @click="nextStep"
            class="flex items-center next-button px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2"
        >
          Next step
          <span class="ml-2">&rarr;</span>
        </button>
      </div>
    </UForm>

    <MapComponent v-if="location" :lat="location.lat" :lon="location.lon" />

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot';
import { reactive, ref } from 'vue';
import { useFormStore } from '@/stores/useFormStore';
import MapComponent from './MapComponent.vue';
import { geocodeAddress } from '~/utils/geocode';

const store = useFormStore();
const residential = store.formData.residential;

const residentialState = reactive({
  address: residential.address || '',
  postalCode: residential.postalCode || '',
});

const location = ref(null);
const error = ref(null);

const onAddressChange = async () => {
  if (residentialState.address && residentialState.postalCode) {
    try {
      error.value = null;
      location.value = await geocodeAddress(
          residentialState.address,
          residentialState.postalCode
      );
    } catch (err) {
      error.value = err.message;
      location.value = null;
    }
  }
};

const nextStep = () => {

}

const previousStep = () => {

}

const submitStep = async (event) => {
  // Store the data back in the store
  Object.assign(residential, event.data);
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}

.prev-button {
  border: 1px solid #F4CDCA;
}

.next-button {
  background-color: #F4CDCA;
}
</style>
