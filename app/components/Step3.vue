<!-- components/Step3.vue -->
<template>
  <div>
    <h2 class="text-2xl mb-2">Select the Size of the Container Stand</h2>
    <p class="mb-6">The size of the container stand is chosen based on the number of residents in the apartment unit. Based on the specified number of residents, we have selected a recommended container stand for you.</p>
    <UForm ref="form" :schema="v.safeParser(step3Schema)" :state="buildingState" @submit="nextStep" @error="(e)=>{console.log(e)}"
           class="space-y-4 flex flex-col">

      <h2 class="text-2xl">Typ kontajnerového stojiska</h2>
      <UFormField label="" name="container">
      <UCard v-for="container in containerOptions" :key="container.id" @click="selectedContainer = container" class="mb-4 hover:bg-gray-50 cursor-pointer" :class="{'bg-green-100 hover:bg-green-100': selectedContainer.id === container.id}">
        <div class="flex gap-8 items-center">
          <img :src="container.image" class="rounded-md size-32 object-contain" />
          <div>
            <h3 class="text-xl font-bold">
              {{container.title}}
            </h3>
            <div v-html="container.description" />
          </div>
          <div class="ml-auto" v-if="selectedContainer.id === container.id">
            <UIcon name="i-heroicons-check-circle" class="text-green-500 size-12" />
          </div>
        </div>
      </UCard>
      </UFormField>

      <h2 class="text-2xl">Umiestnenie kontajnerového stojiska</h2>
      <p>Umiestnite kontajnerové stojisko na zelenú časť mapy. Pomocou posuvníka pod mapou môžete zmeniť orientáciu kontajnerového stojiska.</p>
      <UFormField label="" name="map">
        <Map :container="selectedContainer.id" v-model="buildingState.map" :center="[17.150450, 48.157436]" />
      </UFormField>

      <div class="flex justify-end gap-2 mt-6">
        <NextButton/>
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot';
import { reactive } from 'vue';
import { useFormStore } from '@/stores/useFormStore';
import type { FormSubmitEvent } from '#ui/types';

const emit = defineEmits(['submit', 'previous'])

const store = useFormStore();
const building = store.formData.building;
const layout = store.formData.containerLayout;

const buildingState = reactive({
  map: undefined
});

const containerOptions = ref([
  { id: 1, image: '/sm.png', title: 'Kapacita CA 60 Obyvateľov (5m x 3m)', description: `<ul class="list-disc list-inside">
              <li>1x 1100L komunálny odpad</li>
              <li>1x 1100L papier</li>
              <li>1x 1100L plast</li>
              <li>1x sklo</li>
            </ul>` },
  { id: 2, image: '/md.png', title: 'Kapacita CA 150 Obyvateľov (5.5m x 3.5m)', description: `<ul class="list-disc list-inside">
              <li>2x 1100L komunálny odpad</li>
              <li>1x 1100L papier</li>
              <li>1x 1100L plast</li>
              <li>1x sklo</li>
            </ul>` },
  { id: 3, image: '/lg.png', title: 'Kapacita CA 200 Obyvateľov (6m x 4m)', description: `<ul class="list-disc list-inside">
              <li>2x 1100L komunálny odpad</li>
              <li>2x 1100L papier</li>
              <li>2x 1100L plast</li>
              <li>1x sklo</li>
            </ul>` },
  { id: 4, image: '/xl.png', title: 'Kapacita CA 200 Obyvateľov (6.5m x 4.5m)', description: `<ul class="list-disc list-inside">
              <li>2x 1100L komunálny odpad</li>
              <li>2x 1100L papier</li>
              <li>2x 1100L plast</li>
              <li>1x sklo</li>
              <li>1x textil</li>
            </ul>` },
]);

const selectedContainer = ref(containerOptions.value[0]);

const form = useTemplateRef('form')

watch(buildingState, async (newValue, oldValue) => {
  try {
    const data = await $fetch('/api/checkPosition', {
      method: 'POST',
      body: {
        boundingBox: newValue.map
      }
    })
    if(!data.valid) {
      form.value.setErrors([{name: 'map', message: 'The selected location is not suitable for the container stand'}])
      buildingState.map = undefined
    } else {
      form.value.setErrors([])
    }
  } catch (error) {
    form.value.setErrors([{name: 'map', message: 'The selected location is not suitable for the container stand'}])
    buildingState.map = undefined
    }
})

const increment = (key) => {
  layout[key]++;
};

const decrement = (key) => {
  if (layout[key] > 0) layout[key]--;
};

const previousStep = () => {
  emit('previous')
}

type Schema = v.InferOutput<typeof step3Schema>

const nextStep = async (event: FormSubmitEvent<Schema>) => {
  // Store the data back in the store
  Object.assign(building, buildingState);
  emit('submit')
};
</script>
