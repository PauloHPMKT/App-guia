<script setup lang="ts">
import { Icon } from "@iconify/vue";
// import MainButton from "../Button/index.vue";
import { Breadcrumb } from "../../types/Breadcrumb.types";

const props = defineProps<{
  buttons: Breadcrumb.Buttons[];
}>();

const emit = defineEmits(["actions"]);

const actions = (prop: string) => {
  emit("actions", prop);
};
</script>

<template>
  <div class="flex gap-2">
    <button
      v-for="(button, index) in props.buttons"
      :key="index"
      @click="actions(button.action)"
      class="breadCrumbDefaultStyle"
    >
      <p class="text-sm">{{ button.label }}</p>
      <Icon :icon="`${button.icon}`" class="ms-2 text-[18px] font-bold" />
    </button>
  </div>
</template>

<style scoped>
.breadCrumbDefaultStyle {
  @apply text-gray-500 
    font-semibold 
    flex 
    items-center 
    justify-center 
    h-8 
    rounded-3xl 
    hover:text-gray-800 
    transition-all 
    duration-300
}
</style>
