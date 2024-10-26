<template>
  <UForm :schema="v.safeParser(schema)" :state="state" class="space-y-4" @submit="onSubmit">
    <!-- Email field with validation -->
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <!-- Password field with validation -->
    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <!-- Submit button -->
    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '#ui/types'

// Define the validation schema using valibot
const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),  // email must be a valid email string
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))  // password with minimum length of 8
})

// Infer the TypeScript type from the schema for type safety
type Schema = v.InferOutput<typeof schema>

// Reactive state for the form fields
const state = reactive<Partial<Schema>>({
  email: '',
  password: ''
})

// Toast setup for user feedback
const toast = useToast()

// Form submission handler
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: 'The form has been submitted.',
    color: 'success'
  })
  console.log(event.data) // Log the form data on successful submission
}
</script>
