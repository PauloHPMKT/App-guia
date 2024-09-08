<script setup lang="ts">
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import { useNavigation } from "../../composables/useNavigation";

const router = useRoute();
const { matchedRouter, navigatePaths } = useNavigation();

const isRouteActive = (route: string) => {
  return router.path === `/app${route}` || matchedRouter(route);
};
</script>

<template>
  <nav>
    <ul class="py-3">
      <li
        v-for="link in navigatePaths"
        :key="link.id"
        class="text-white my-1"
        :class="{ active: isRouteActive(link.router) }"
      >
        <router-link :to="{ path: `/app${link.router}`, exact: true }">
          <Icon :icon="`solar:${link.icon}`" />
          <span class="text-[15px]">{{ link.description }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
li {
  transition: 0.3s ease-in-out;
  border-radius: 8px;
  font-size: 1rem;

  a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 16px;

    svg {
      margin-right: 10px;
    }
  }

  &.active {
    background-color: #e7e6e8;
    color: #121212;
    font-weight: 600;
  }

  &:hover:not(.active) {
    background-color: #2d2d2da3;
    color: #fff;
    cursor: pointer;
  }
}
</style>

