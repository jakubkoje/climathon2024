<!-- components/Step1.vue -->
<template>
  <div>
    <h2>Information about the Administrator of the building</h2>
    <UForm :schema="v.safeParser(step1Schema)" :state="adminState" @submit="submitStep" class="space-y-4">
      <UFormField label="First Name" name="firstName">
        <UInput v-model="admin.firstName" placeholder="First Name"/>
      </UFormField>

      <UFormField label="Last Name" name="lastName">
        <UInput v-model="admin.lastName" placeholder="Last Name"/>
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="admin.email" type="email" placeholder="Email"/>
      </UFormField>

      <UFormField label="Phone Number" name="phone">
        <UInput v-model="admin.phone" type="tel" placeholder="Phone"/>
      </UFormField>

      <UButton type="submit">Next</UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot';
import { useFormStore } from '@/stores/useFormStore';

const store = useFormStore();
const admin = store.formData.administrator;

const adminState = reactive({
  firstName: admin.firstName,
  lastName: admin.lastName,
  email: admin.email,
  phone: admin.phone
});

const submitStep = async (event) => {
  // Store the data back in the store
  Object.assign(admin, event.data);
};
</script>
