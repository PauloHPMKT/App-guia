<script setup lang="ts">
import { reactive } from 'vue';
import InputField from '../InputField/index.vue';
import MainButton from '../MainButton/index.vue';

const emit = defineEmits(['submitLogin']);

const loginData = reactive({
  email: '',
  password: '',
})

function submitLogin() {
  emit('submitLogin', loginData)
}

</script>

<template>
  <form 
    @submit.prevent="submitLogin"
    class="flex flex-col gap-5"
  >
    <InputField 
      placeholder="E-mail de Usuário" 
      v-model="loginData.email" 
    />
    <InputField 
      placeholder="Sua Senha" 
      :isPassword="true" 
      v-model="loginData.password" 
    />
    <MainButton type="submit" class="w-full h-14 text-white">
      <template v-slot:label>
        <span>
          Entrar
        </span>
      </template>
    </MainButton>
  </form>
</template>