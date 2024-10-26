<template>
  <div class="flex flex-col gap-4">
    <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex items-center gap-4 cursor-pointer"
        @click="$emit('changeStep', index)"
    >
      <div
          :class="twMerge('flex min-w-8 justify-center items-center rounded-full size-8 border',
          `${index == activeStep ? 'text-white bg-black': 'text-black bg-white'}`)">
        {{ index + 1 }}
      </div>
      <div class="text-xl">{{ step.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

const props = defineProps({
  steps: Array,
  activeStep: Number
});

const emit = defineEmits(['changeStep']);
</script>
