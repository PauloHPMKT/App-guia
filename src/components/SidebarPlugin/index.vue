<script setup lang="ts">
import { Icon } from "@iconify/vue";
//import { navigatePaths } from "../../routers/navigate-paths";
//import { useRoute } from "vue-router";
//import { useRouterOptions } from "../../composables/useOptions";

//const router = useRoute();
//const { matchedRouter } = useRouterOptions();

// const isRouteActive = (route: string) => {
//   return router.path === route || matchedRouter(route);
// };
const navigatePaths = [
  {
    id: 1,
    icon: "home",
    description: "Dashboard",
    router: "/dashboard",
  },
  {
    id: 2,
    icon: "user",
    description: "Usuários",
    router: "/users",
  },
  {
    id: 3,
    icon: "document",
    description: "Documentos",
    router: "/documents",
  },
  {
    id: 4,
    icon: "settings",
    description: "Configurações",
    router: "/settings",
  },
];
</script>

<template>
  <nav>
    <ul class="py-3">
      <li
        v-for="link in navigatePaths"
        :key="link.id"
        :class="{ active: '/dashboard' }"
      >
        <router-link :to="{ path: `/app${link.router}`, exact: true }">
          <Icon :icon="`carbon:${link.icon}`" />
          <span class="text-[15px]">{{ link.description }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
li {
  margin: 3px 0;
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
  }

  &:hover:not(.active) {
    background-color: #2d2d2da3;
    color: #fff;
    cursor: pointer;
  }
}
</style>

