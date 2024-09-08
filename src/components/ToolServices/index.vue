<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { Navigate } from "../../types/Navigate";
import Typography from "../Typography/index.vue";
import openAi from "../../assets/img/openai.jpg";

defineProps<Navigate>();

const redirect = useRouter();

const toRouter = (path: string) => {
  redirect.push(path);
};
</script>

<template>
  <div @click="toRouter(router)" class="card">
    <header class="flex items-start justify-between">
      <div class="bg-black p-2 rounded-full">
        <Icon :icon="`tabler:${icon}`" class="text-white" />
      </div>
      <div class="w-7 ml-8">
        <img :src="openAi" alt="openai"><!-- Repassar via props -->
      </div>
    </header>
    <h3 class="font-semibold text-zinc-900 my-2">{{ description }}</h3>
    <div>
      <Typography tag="p" variant="body" class="text-gray-500">
        {{ content }}
      </Typography>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  @apply shadow-md 
    bg-white 
    w-[30%] 
    rounded-[18px] 
    p-2 
    h-[10.5rem] 
    cursor-pointer 
    border-2 
    border-white 
    hover:border-slate-300;
}
</style>
