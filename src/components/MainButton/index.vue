<script setup lang="ts">
</script>

<template>
  <button 
    v-bind="$attrs"
    class="bg-[#121212] text-white flex items-center gap-3 py-2 px-4 rounded-md"
  >
    <slot name="icon"></slot>
    <slot name="label"></slot>
  </button>
</template>