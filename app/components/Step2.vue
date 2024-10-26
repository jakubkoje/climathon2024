<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl">Information about the building</h2>
    <UForm
        :schema="v.safeParser(step2Schema)"
        :state="residentialState"
        @submit="nextStep"
        class="space-y-4"
    >
      <UFormField label="Address" name="address">
        <MapboxCustomGeocoder v-model="residentialState.address" />
      </UFormField>

      <div class="flex justify-end gap-2 mt-6">
        <NextButton />
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot';
import { reactive, ref } from 'vue';
import { useFormStore } from '@/stores/useFormStore';
import MapComponent from './MapComponent.vue';
import { geocodeAddress } from '~/utils/geocode';
import type { FormSubmitEvent } from '#ui/types';
import { MapboxAddressAutofill, MapboxSearchBox, MapboxGeocoder, config, autofill } from '@mapbox/search-js-web'
onMounted(() => {
// autofill({
//   options: {
//     country: 'sk'
//   }
// })
  })

const result = ref(null);

const emit = defineEmits(['submit', 'previous'])

const store = useFormStore();
const step2 = store.formData.step2;

const residentialState = reactive({
  address: step2.address,
});

const location = ref(null);
const error = ref(null);

const onAddressChange = async () => {
  if (residentialState.address && residentialState.postalCode) {
    try {
      error.value = null;
      location.value = await geocodeAddress(
          residentialState.address,
          residentialState.postalCode
      );
    } catch (err) {
      error.value = err.message;
      location.value = null;
    }
  }
};

const previousStep = () => {
  emit('previous')
}

type Schema = v.InferOutput<typeof step2Schema>

const nextStep = async (event: FormSubmitEvent<Schema>) => {
  Object.assign(step2, event.data);
  emit('submit')
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>
