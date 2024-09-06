<script setup lang="ts">
import { ref, computed } from "vue";
import ReveallerPassword from "../ReveallerPassword/index.vue";
import { InputFieldProps } from "../../types/InputField";

defineProps<InputFieldProps>();
const inputValue = defineModel()

const inputType = ref("password");
const isFocused = ref(false);

const isPasswordVisible = computed(() => inputType.value === "text");
const showPasswordVisual = computed(() => (
  inputType.value === "text" 
    ? `<span class="dark:text-text-dark">Ocultar</span>` 
    : `<span class="dark:text-text-dark">Mostrar</span>`
))

const togglePassword = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
</script>

<template>
  <div class="w-full">
    <div class="relative w-full h-14 flex">
      <input
        v-bind="$attrs"
        v-model="inputValue"
        @focus="isFocused = true"
        class="border border-gray-300 text-[#121212] rounded-md px-4 py-2 w-full h-full"
        :type="isPassword ? inputType : 'text'"
        placeholder=" "
      />
      <label
        class="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none transition-all duration-300"
        :class="[ placeholder ? 'bg-white' : 'bg-transparent']"
      >
        {{ placeholder }}
      </label>
    </div>
    <div
      v-if="isPassword"
      @click="togglePassword"
      class="text-black flex items-center justify-end cursor-pointer"
    >
      <ReveallerPassword
        @toggleRevealer.stop
        :is_password="isPasswordVisible"
        class="mr-3"
      />
      <div v-html="showPasswordVisual"></div>
    </div>
  </div>
</template>

<style scoped>
input:focus + label,
input:not(:placeholder-shown) + label {
  top: 0;
  padding: 4px;
  font-size: 0.75rem;
  color: #01000c;
}
</style>
