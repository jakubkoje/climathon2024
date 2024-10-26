<template>
  <div class="flex flex-col">
    <div
        v-for="(step, index) in steps"
        :key="index"
        class="flex items-center py-2 cursor-pointer"
        @click="$emit('changeStep', index)"
    >
      <div
          :class="twMerge('flex justify-center items-center mr-2 rounded-full size-8 border',
          `${index == activeStep ? 'text-white bg-black': 'text-black bg-white'}`)">
        {{ index + 1 }}
      </div>
      <div class="text-xl">{{ step.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { twMerge } from 'tailwind-merge';

const props = defineProps({
  steps: Array,
  activeStep: Number
});

const emit = defineEmits(['changeStep']);
</script>
