<!-- components/Step2.vue -->
<template>
  <div>
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

      <UButton type="submit">Next</UButton>
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
</style>
