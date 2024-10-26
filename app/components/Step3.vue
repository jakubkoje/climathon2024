<!-- components/Step3.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">Vyberte si typ a umiestnenie kontajnerového stojiska</h2>
    <p class="mb-6">Veľkosť kontajnerového stojiska sa vyberá podľa počtu obyvateľov v bytovej jednotke. Na základe zadaného počtu obyvateľov sme pre vás vybrali odporúčané kontajnerové stojisko.</p>
    <UForm :schema="v.safeParser(step3Schema)" :state="buildingState" @submit="submitStep" class="space-y-4 flex flex-col">

      <UFormField label="Typ kontajnerového stojiska" name="container">
      <UCard v-for="container in containerOptions" :key="container.id" @click="selectedContainer = container" class="mb-4 hover:bg-gray-50 cursor-pointer" :class="{'bg-green-100 hover:bg-green-100': selectedContainer.id === container.id}">
        <div class="flex gap-8 items-center">
          <UAvatar src="https://placehold.co/400x400" class="rounded-md size-32" />
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

      <UFormField label="Umiestnenie kontajnerového stojiska" name="map">
        <Map :container="selectedContainer.id" />
      </UFormField>
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

const containerOptions = ref([
  { id: 1, title: 'Kapacita CA 60 Obyvateľov (5m x 3m)', description: `<ul class="list-disc list-inside">
              <li>1x 1100L komunálny odpad</li>
              <li>1x 1100L papier</li>
              <li>1x 1100L plast</li>
              <li>1x sklo</li>
            </ul>` },
  { id: 2, title: 'Kapacita CA 150 Obyvateľov (5.5m x 3.5m)', description: `<ul class="list-disc list-inside">
              <li>2x 1100L komunálny odpad</li>
              <li>1x 1100L papier</li>
              <li>1x 1100L plast</li>
              <li>1x sklo</li>
            </ul>` },
  { id: 3, title: 'Kapacita CA 200 Obyvateľov (6m x 4m)', description: `<ul class="list-disc list-inside">
              <li>2x 1100L komunálny odpad</li>
              <li>2x 1100L papier</li>
              <li>2x 1100L plast</li>
              <li>1x sklo</li>
            </ul>` },
  { id: 4, title: 'Kapacita CA 200 Obyvateľov (6.5m x 4.5m)', description: `<ul class="list-disc list-inside">
              <li>2x 1100L komunálny odpad</li>
              <li>2x 1100L papier</li>
              <li>2x 1100L plast</li>
              <li>1x sklo</li>
              <li>1x textil</li>
            </ul>` },
]);

const selectedContainer = ref(containerOptions.value[0]);

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
