<template>
  <div class="bg-white w-full h-full text-black">
    <h1 class="text-3xl py-16">Žiadost o zmenu kontajnerového stojiska</h1>
    <div class="flex gap-10">
      <div class="p-10 w-1/2">
        <Stepper :steps="steps" :activeStep="activeStep" @changeStep="changeStep"/>
      </div>
      <div class="form-content w-1/2">
        <h2>{{ steps[activeStep].title }}</h2>
        <FormSection :activeStep="activeStep" @next="nextStep" @previous="previousStep"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Stepper from '~/components/Stepper.vue'
import FormSection from '~/components/FormSection.vue'

interface Step {
  title: string
}

// Steps for the sidebar
const steps: Step[] = [
  { title: 'Druh priznania' },
  { title: 'Údaje o daňovnikovi' },
  { title: 'Daň z pozemkov' },
  { title: 'Daň zo stavieb (stavba slúžiaca na jeden účel)' },
  { title: 'Daň zo stavieb (stavba slúžiaca na viaceré účely)' },
  { title: 'Daň z bytov a z nebytových priestorov (v bytovom dome)' },
  { title: 'Zníženie alebo oslobodenie od dane' },
  { title: 'Sumár' }
]

// Active step tracker
const activeStep = ref(0)

// Change the current step
const changeStep = (index: number) => {
  activeStep.value = index
}

// Go to the next step
const nextStep = () => {
  if (activeStep.value < steps.length - 1) activeStep.value++
}

// Go to the previous step
const previousStep = () => {
  if (activeStep.value > 0) activeStep.value--
}
</script>
