<template>
  <div>
    <UForm :schema="v.safeParser(step1Schema)" :state="firstStepState" @submit="nextStep" class="space-y-4">
      <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-4">
          <h2 class="text-2xl">Information about the Administrator of the Building</h2>
          <div class="flex gap-4">
            <UFormField :ui="{root: 'grow'}" label="First Name" name="firstName">
              <UInput v-model="firstStepState.firstName"/>
            </UFormField>
            <UFormField :ui="{root: 'grow'}" label="Last Name" name="lastName">
              <UInput v-model="firstStepState.lastName"/>
            </UFormField>
          </div>

          <UFormField label="Email" name="email">
            <UInput v-model="firstStepState.email" type="email" placeholder="example@email.com"/>
          </UFormField>

          <UFormField label="Phone Number" name="phone">
            <UInput v-model="firstStepState.phone" type="tel" placeholder="+421 123 123 123"/>
          </UFormField>
        </div>
        <div class="flex flex-col gap-4">
          <h2 class="text-2xl">Residential Info</h2>
          <UFormField label="Address" name="address">
            <UInput v-model="firstStepState.address"/>
          </UFormField>

          <UFormField label="City" name="city">
            <UInput v-model="firstStepState.city"/>
          </UFormField>

          <UFormField label="Postal Code" name="postalCode">
            <UInput v-model="firstStepState.postalCode"/>
          </UFormField>
        </div>
      </div>

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
import NextButton from '~/components/NextButton.vue';
import type { FormSubmitEvent } from '#ui/types';
import { exampleUsage } from '~~/server/api/pdf/screenshot';

const emit = defineEmits(['submit'])

const store = useFormStore();
const step1 = store.formData.step1;

const firstStepState = reactive({
  firstName: step1.firstName,
  lastName: step1.lastName,
  email: step1.email,
  phone: step1.phone,
  address: step1.address,
  city: step1.city,
  postalCode: step1.postalCode
});

type Schema = v.InferOutput<typeof step1Schema>

const nextStep = async (event: FormSubmitEvent<Schema>) => {
  // Store the data back in the store
  // Object.assign(step1, event.data);
  // emit('submit')
  exampleUsage()
};
</script>
