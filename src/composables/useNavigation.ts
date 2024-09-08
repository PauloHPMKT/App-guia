import { ref } from "vue";
import { Navigate } from "../types/Navigate";
import { useRoute } from "vue-router";

export const useNavigation = () => {
  const route = useRoute();

  const navigatePaths = ref<Navigate[]>([
    {
      id: 1,
      icon: "clapperboard-text-linear",
      description: "Meus Apps",
      router: "/dashboard",
    },
    {
      id: 2,
      icon: "magic-stick-3-broken",
      description: "guIA Revisor",
      router: "/content-revisor",
    },
    {
      id: 3,
      icon: "user",
      description: "Usuários",
      router: "/users",
    },
    {
      id: 4,
      icon: "settings",
      description: "Configurações",
      router: "/settings",
    }
  ])

  function matchedRouter(path: string): boolean {
    return route.matched.some((record) => record.path === path);
  }

  return {
    navigatePaths,
    matchedRouter
  };
}