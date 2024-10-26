<!-- components/Step3.vue -->
<template>
  <div>
    <h2>Information about the Building</h2>
    <UForm :schema="v.safeParser(step3Schema)" :state="buildingState" @submit="submitStep" class="space-y-4">
      <UFormField label="Address" name="address">
        <UInput v-model="buildingState.address" placeholder="Address" />
      </UFormField>

      <UFormField label="Postal Code" name="postalCode">
        <UInput v-model="buildingState.postalCode" placeholder="Postal Code" />
      </UFormField>

      <h3>Current Layout of Containers</h3>
      <label>
        1100L:
        <button @click="decrement('container1100L')">-</button>
        {{ layout.container1100L }}
        <button @click="increment('container1100L')">+</button>
      </label>
      <label>
        240L:
        <button @click="decrement('container240L')">-</button>
        {{ layout.container240L }}
        <button @click="increment('container240L')">+</button>
      </label>
      <label>
        120L:
        <button @click="decrement('container120L')">-</button>
        {{ layout.container120L }}
        <button @click="increment('container120L')">+</button>
      </label>

      <UButton type="submit">Next Step</UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot';
import { reactive } from 'vue';
import { useFormStore } from '@/stores/useFormStore';

const store = useFormStore();
const building = store.formData.building;
const layout = store.formData.containerLayout;

const buildingState = reactive({
  address: building.address,
  postalCode: building.postalCode
});

const increment = (key) => {
  layout[key]++;
};

const decrement = (key) => {
  if (layout[key] > 0) layout[key]--;
};

const submitStep = async (event) => {
  // Store the data back in the store
  Object.assign(building, buildingState);
};
</script>
