<!-- FormSection.vue -->
<template>
  <div>
    <Step1 v-if="activeStep === 0" @submit="nextStep" />
    <Step2 v-if="activeStep === 1" @submit="nextStep" />
    <Step3 v-if="activeStep === 2" @submit="nextStep" />
    <Step4 v-if="activeStep === 3" @submit="submitAll" />
  </div>
</template>

<script setup lang="ts">
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';
import Step3 from './Step3.vue';
import Step4 from './Step4.vue';

const props = defineProps(['activeStep']);
const emit = defineEmits(['next', 'previous', 'submit']);

const nextStep = () => {
  emit('next');
};

const previousStep = () => {
  emit('previous');
};

const submitAll = () => {
  emit('submit');
};
</script>
