<!-- components/Step3.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">Vyberte si typ kontajnerového stojiska</h2>
    <p class="mb-6">Veľkosť kontajnerového stojiska sa vyberá podľa počtu obyvateľov v bytovej jednotke. Na základe zadaného počtu obyvateľov sme pre vás vybrali odporúčané kontajnerové stojisko.</p>
    <UForm :schema="v.safeParser(step3Schema)" :state="buildingState" @submit="submitStep" class="space-y-4">

      <UCard class="mb-4">
        <div class="flex gap-8">
          <UAvatar src="https://placehold.co/400x400" class="rounded-md size-32" />
          <div>
            <h3 class="text-xl font-bold">
              Kapacita CA 150 Obyvateľov
            </h3>
            <ul class="list-disc list-inside">
              <li>2x 1100L komunálny odpad</li>
              <li>1x 1100L papier</li>
              <li>1x 1100L plast</li>
              <li>1x sklo</li>
            </ul>
          </div>
        </div>
      </UCard>
      <UCard class="mb-4">
        <div class="flex gap-8">
          <UAvatar src="https://placehold.co/400x400" class="rounded-md size-32" />
          <div>
            <h3 class="text-xl font-bold">
              Kapacita CA 150 Obyvateľov
            </h3>
            <ul class="list-disc list-inside">
              <li>2x 1100L komunálny odpad</li>
              <li>1x 1100L papier</li>
              <li>1x 1100L plast</li>
              <li>1x sklo</li>
            </ul>
          </div>
        </div>
      </UCard>
      <UCard class="mb-4">
        <div class="flex gap-8">
          <UAvatar src="https://placehold.co/400x400" class="rounded-md size-32" />
          <div>
            <h3 class="text-xl font-bold">
              Kapacita CA 150 Obyvateľov
            </h3>
            <ul class="list-disc list-inside">
              <li>2x 1100L komunálny odpad</li>
              <li>1x 1100L papier</li>
              <li>1x 1100L plast</li>
              <li>1x sklo</li>
            </ul>
          </div>
        </div>
      </UCard>
      <UCard class="mb-4">
        <div class="flex gap-8">
          <UAvatar src="https://placehold.co/400x400" class="rounded-md size-32" />
          <div>
            <h3 class="text-xl font-bold">
              Kapacita CA 150 Obyvateľov
            </h3>
            <ul class="list-disc list-inside">
              <li>2x 1100L komunálny odpad</li>
              <li>1x 1100L papier</li>
              <li>1x 1100L plast</li>
              <li>1x sklo</li>
            </ul>
          </div>
        </div>
      </UCard>

      <UFormField label="Address" name="address">
        <UInput v-model="buildingState.address" placeholder="Address" />
      </UFormField>

      <UFormField label="Postal Code" name="postalCode">
        <UInput v-model="buildingState.postalCode" placeholder="Postal Code" />
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
