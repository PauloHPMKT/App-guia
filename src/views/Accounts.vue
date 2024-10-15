<script setup lang="ts">
import { ref } from 'vue';
import FormLogin from '../components/FormLogin/index.vue';
import FormRegister from '../components/FormRegister/index.vue';
import logo from '../assets/img/guIA.png';

const enableLogin = ref(true);

function login(data: any) {
  console.log(data);
}

function register(data: any) {
  console.log(data);
}

function toggleForm() {
  enableLogin.value = !enableLogin.value;
}
</script>

<template>
  <Transition name="fade">
    <div class="w-full flex justify-center h-screen items-center">
      <div class="w-[400px]">
        <figure class="w-full flex flex-col justify-center items-center">
          <div class="w-[190px] my-0 m-auto">
            <img :src="logo" alt="Logo guIA" class="w-full" />
          </div>
          <figcaption class="mt-6 mb-8 text-center">
            <h3 class=" text-[20px] font-semibold">Área de login</h3>
            <p class="text-gray-500">
              {{ enableLogin ? 'Ainda não possui conta?' : 'Já possui uma conta?' }}
              <span 
                @click="toggleForm"
                class="text-blue-400 cursor-pointer hover:underline"
              >
                {{ enableLogin ? 'Criar workspace' : 'Faça seu login' }}
              </span>
            </p>
          </figcaption>
        </figure>
        <FormLogin 
          @submitLogin="login"
          v-if="enableLogin" 
        />
        <FormRegister 
          @registerUser="register"
          v-else 
        />
      </div>
    </div>
  </Transition>
  <!-- <div>
    <transition name="fade">

    Posso substituir por um suspense do Vue
    <PageTransition v-if="isLoading" :username="authStore.currentUser.username!" ref="loader" />
    <div class="h-screen relative flex flex-col justify-center items-center">
    </div>
  </transition>
  </div> -->
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>