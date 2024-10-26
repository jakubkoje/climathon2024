<template>
  <div class="bg-white w-full h-full text-black">
    <h1 class="text-3xl py-16">Žiadost o zmenu kontajnerového stojiska</h1>
    <div class="grid grid-cols-12 gap-16">
      <div class="col-span-4">
        <Stepper :steps="steps" :activeStep="activeStep" @changeStep="changeStep"/>
      </div>
      <div class="flex-1 col-span-8">
        <FormSection :activeStep="activeStep" @next="nextStep" @previous="previousStep" @submit="submitAll"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFormStore } from '~/stores/useFormStore';
import Stepper from '~/components/Stepper.vue';
import FormSection from '~/components/FormSection.vue';

const formStore = useFormStore();

// Steps for the sidebar
const steps = [
  { title: 'Information about the Administrator of the building' },
  { title: 'Information about the building' },
  { title: 'Select size of the garbage stand' },
  { title: 'Recapitulation' },
];

// Active step tracker
const activeStep = ref(formStore.currentStep);

// Change the current step
const changeStep = (index: number) => {
  activeStep.value = index;
  formStore.currentStep = index;
};

// Go to the next step
const nextStep = () => {
  if (activeStep.value < steps.length - 1) {
    activeStep.value++;
    formStore.nextStep();
  }
};

// Go to the previous step
const previousStep = () => {
  if (activeStep.value > 0) {
    activeStep.value--;
    formStore.previousStep();
  }
};

// Submit
const submitAll = () => {
  console.log(formStore.formData)
};
</script>
