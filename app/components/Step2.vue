<!-- components/Step2.vue -->
<template>
  <div>
    <h2>Residential Information</h2>
    <UForm :schema="v.safeParser(step2Schema)" :state="residentialState" @submit="submitStep" class="space-y-4">
      <UFormField label="Address" name="address">
        <UInput v-model="residential.address" placeholder="Address" />
      </UFormField>

      <UFormField label="City" name="city">
        <UInput v-model="residential.city" placeholder="City" />
      </UFormField>

      <UFormField label="Postal Code" name="postalCode">
        <UInput v-model="residential.postalCode" placeholder="Postal Code" />
      </UFormField>

      <UButton type="submit">Next</UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot';
import { useFormStore } from '@/stores/useFormStore';

const store = useFormStore();
const residential = store.formData.residential;

const residentialState = reactive({
  address: residential.address,
  city: residential.city,
  postalCode: residential.postalCode
});

const submitStep = async (event) => {
  // Store the data back in the store
  Object.assign(residential, event.data);
};
</script>
