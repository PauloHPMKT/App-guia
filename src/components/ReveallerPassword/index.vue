<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { ReveallerPasswordProps } from "../../types/ReveallerPassword";

defineProps<ReveallerPasswordProps>();

const emit = defineEmits(["toggleRevealer"]);

const toggleRevealer = () => {
  emit("toggleRevealer");
};
</script>

<template>
  <span @click="toggleRevealer" style="cursor: pointer">
    <Icon icon="tabler:eye" v-if="is_password" class="centralize dark:text-text-dark" />
    <Icon icon="tabler:eye-off" v-else class="centralize dark:text-text-dark" />
  </span>
</template>

<style scoped>
.centralize {
  display: flex;
  align-items: center;
}
</style>
