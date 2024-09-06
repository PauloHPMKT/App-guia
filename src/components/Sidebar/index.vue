<script setup lang="ts">
import SidebarPlugins from "../SidebarPlugin/index.vue";
import logo from "../../assets/img/guIA.png";
import { useRouter } from "vue-router";
// import { NavigatePathsProps } from "../../types/NavigationLinks";
// import { navigatePaths } from "../../routes/linksNavigation";

const router = useRouter();

// const navigation = ref<NavigatePathsProps[]>([]);

const navigateToDashboard = () => {
  router.push({ name: "dashboard" });
};

// onMounted(() => {
//   navigation.value = navigatePaths;
// })
</script>

<template>
  <aside class="px-4 bg-dark-1000 min-h-screen bg-dark-blue w-64 dark:border-r-[1px] dark:border-border-dark fixed">
    <div @click="navigateToDashboard" class="image_container">
      <img :src="logo" alt="Logo guIA" />
    </div>
    <SidebarPlugins :navigate="navigation" />
  </aside>
</template>

<style scoped>
.image_container {
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
  border-bottom: 1px solid #212b36;
}
img {
  width: 120px;
  filter: invert(1);
}
</style>

