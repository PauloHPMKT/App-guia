<script setup lang="ts">
import { ref } from 'vue';
import Content from './Content.vue';
// import { Icon } from '@iconify/vue';
// import CardUser from '../../components/CardUser/index.vue';
import Sidebar from '../components/Sidebar/index.vue';
// import { useAuthStore } from '../../store/authStore';
// import { useHelper } from '../../composables/useHelper';
// import { useOnMounted } from '../../composables/useOnMounted';

// const authStore = useAuthStore();
// const { truncate, greetings } = useHelper();
// const { dateTimeFormated } = useOnMounted();

// const cardUser = ref<InstanceType<typeof CardUser> | null>(null)

const themeModeCard = ref(false);

// const getUsername = computed(() => {
//   const currentUsername = authStore.$state.currentUser.username;
//   return truncate(currentUsername!);
// });

// const greetingsMessage = computed(() => {
//   return `${greetings()}, ${getUsername.value}👋`;
// });

// function showProfileCard() {
//   cardUser.value?.open()
// }

function showThemeProvider() {
  themeModeCard.value = !themeModeCard.value;
}

// onMounted(() => {
//   addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') {
//       cardUser.value?.close();
//       themeModeCard.value = false;
//     }
//   })

//   addEventListener('click', (e) => {
//     if (!(e.target as HTMLElement).closest('#cardUser')) {
//       cardUser.value?.close();
//     }
//   })
// });
</script>

<template>
  <div class="flex w-full h-screen">
    <Sidebar />
    <div class="w-full pl-[256px]">
      <header class="main-header">
        <div class="flex flex-col">
          <!-- <p class="font-semibold text-text-light dark:text-text-dark">
            {{ greetingsMessage }}
          </p>
          <span class="text-[#a3a3a3]">{{ dateTimeFormated() }}</span> -->
          <p class="font-semibold text-text-light dark:text-text-dark">
            Olá, Haliane Pessoa👋
          </p>
          <span class="text-[#a3a3a3]">{{ new Date().toLocaleDateString() }}</span>
        </div>
        <div
          class="flex items-center gap-3 text-[2rem] text-[#aeaeae] rounded-full bg-header-light dark:bg-header-dark mr-5 cursor-pointer transition duration-300 ease-in-out"
        >
          <!-- <Icon
            @click="showProfileCard"
            icon="teenyicons:user-circle-solid" id="cardUser" 
          /> -->
        </div>
        <CardUser 
          ref="cardUser" 
          @open-theme-config="showThemeProvider"
        />
      </header>
      <main class="bg-[#f9f8f9] h-full-minus-diff dark:bg-background-dark text-text-light dark:text-text-dark">
        <Content />
      </main>
     </div>
  </div>
</template>

<style scoped>
.main-header {
  @apply 
    flex 
    justify-between 
    items-center 
    flex-none 
    h-[68px] 
    border-b-[1px] 
    sticky top-0 left-0 
    bg-background-light 
    dark:bg-background-dark 
    dark:border-b-[1px] 
    dark:border-b-border-dark 
    z-50 
    py-3 px-5
}

</style>