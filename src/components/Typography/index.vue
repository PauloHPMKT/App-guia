<script setup lang="ts">
import { computed } from 'vue';
import { Typography } from '../../types/Typography';

const props = defineProps<Typography.Props>();

const computedClass = computed(() => {
  let baseClass = props.class || '';

  const variantClasses = {
    h1: `${baseClass} text-4xl font-bold`,
    h2: `${baseClass} text-3xl font-semibold`,
    h3: `${baseClass} text-2xl font-semibold`,
    body: `${baseClass} text-base`,
    caption: `${baseClass} text-sm text-gray-500`,
  };

  return variantClasses[props.variant as Typography.Tags] || baseClass;
});
</script>

<template>
  <component :is="tag" :class="computedClass">
    <slot></slot>
  </component>
</template>