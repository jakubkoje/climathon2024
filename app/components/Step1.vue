<!-- components/Step1.vue -->
<template>
  <div>
    <UForm :schema="v.safeParser(step1Schema)" :state="firstStepState" @submit="nextStep" class="space-y-4">
      <div class="flex flex-col gap-10">
        <div>
          <h2 class="text-lg">Information about the Administrator of the Building</h2>
          <div class="flex">
            <UFormField label="First Name" name="firstName">
              <UInput v-model="firstStepState.firstName" placeholder="First Name"/>
            </UFormField>
            <UFormField label="Last Name" name="lastName">
              <UInput v-model="firstStepState.lastName" placeholder="Last Name"/>
            </UFormField>
          </div>

          <UFormField label="Email" name="email">
            <UInput v-model="firstStepState.email" type="email" placeholder="Email"/>
          </UFormField>

          <UFormField label="Phone Number" name="phone">
            <UInput v-model="firstStepState.phone" type="tel" placeholder="Phone Number"/>
          </UFormField>
        </div>
        <div>
          <h2>Residential Info</h2>
          <UFormField label="Address" name="address">
            <UInput v-model="firstStepState.address" placeholder="Address"/>
          </UFormField>

          <UFormField label="City" name="city">
            <UInput v-model="firstStepState.city" placeholder="City"/>
          </UFormField>

          <UFormField label="Postal Code" name="postalCode">
            <UInput v-model="firstStepState.postalCode" placeholder="Postal Code"/>
          </UFormField>
        </div>
      </div>

      <UButton type="submit">Next Step</UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot';
import { reactive } from 'vue';
import { useFormStore } from '@/stores/useFormStore';

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

const nextStep = async (event) => {
  // Store the data back in the store
  Object.assign(step1, firstStepState);
};
</script>
