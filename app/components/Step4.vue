<!-- components/Step4.vue -->
<template>
  <div>
    <h2>Recommended Options</h2>
    <div v-for="(option, index) in options" :key="index">
      <input type="radio" :value="option" v-model="selectedContainer" />
      <label>{{ option }}</label>
    </div>
    <UButton @click="submitStep">Submit All</UButton>
  </div>
</template>

<script setup lang="ts">
import { useFormStore } from '@/stores/useFormStore';

const store = useFormStore();
const selectedContainer = store.formData.recommendedOptions.selectedContainer;

const options = ["Container A", "Container B", "Container C", "Container D"];

const submitStep = () => {
  // Store the selected container in the store
  store.formData.recommendedOptions.selectedContainer = selectedContainer;
  // You might want to handle the final submission here
  console.log('Final Submission:', store.formData);
};
</script>
