<script setup lang="ts">
import { reactive } from 'vue';
import InputField from '../InputField/index.vue';
import MainButton from '../MainButton/index.vue';

const emit = defineEmits(['registerUser']);

const registerData = reactive({
  name: '',
  email: '',
  password: '',
})

function registerUser() {
  emit('registerUser', registerData)
}

</script>

<template>
  <form 
    @submit.prevent="registerUser"
    class="flex flex-col gap-5"
  >
    <InputField 
      placeholder="Nome do Usuário" 
      v-model="registerData.name" 
    />
    <InputField 
      placeholder="E-mail de Usuário" 
      v-model="registerData.email" 
    />
    <InputField 
      placeholder="Sua Senha" 
      :isPassword="true" 
      v-model="registerData.password" 
    />
    <MainButton type="submit" class="w-full h-14 text-white">
      <template v-slot:label>
        <span>
          Criar Workspace
        </span>
      </template>
    </MainButton>
  </form>
</template>