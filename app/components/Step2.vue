<template>
  <div class="flex flex-col gap-4 pb-64">
    <h2 class="text-2xl">Information about the building</h2>
    <UForm
        :schema="v.safeParser(step2Schema)"
        :state="residentialState"
        @submit="nextStep"
        class="space-y-4"
    >
      <UFormField label="Address" name="address">
        <MapboxCustomGeocoder v-model="residentialState.address" :options="{ countries: 'sk', bbox: [16.938268,47.973709,17.287084,48.263416], placeholder: 'Search for an address'}"
        class="w-full"
        />
      </UFormField>

      <div class="flex justify-end gap-2 mt-6">
        <NextButton />
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot';
import { reactive } from 'vue';
import { useFormStore } from '@/stores/useFormStore';
import type { FormSubmitEvent } from '#ui/types';

const emit = defineEmits(['submit'])

const store = useFormStore();
const step2 = store.formData.step2;

const residentialState = reactive({
  address: step2.address,
});

type Schema = v.InferOutput<typeof step2Schema>

const nextStep = async (event: FormSubmitEvent<Schema>) => {
  Object.assign(step2, event.data);
  emit('submit')
};
</script>

<style>
.mapboxgl-ctrl-geocoder {
  width: 100% !important;
  display: block !important;
  max-width: unset !important;
  box-shadow: none !important;
}

.mapboxgl-ctrl-geocoder--input {
  box-shadow: none !important;
  border: 1px solid var(--ui-border-accented);
  border-radius: calc(var(--ui-radius)*1.5);
}

.mapboxgl-ctrl-geocoder--input:focus {
  border: 1px solid var(--ui-border-accented);
}
</style>
