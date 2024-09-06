<script setup lang="ts">
import { ref } from 'vue';
import MainButton from '../../../../../components/MainButton/index.vue';
import Typography from '../../../../../components/Typography/index.vue';
import InputField from '../../../../../components/InputField/index.vue';
import SpinningLoader from '../../../../../components/SpinningLoader/index.vue';
import Overlay from '../../../../../Layout/Overlay.vue';

const emit = defineEmits(['action']);

const inputValue = ref('');
const isModalVisible = ref(false);
const isLoading = ref(false);

async function saveReviewedContent() {
  isLoading.value = true;
  try {
    await emit('action', inputValue.value);
    close();
  } catch (error) {
    console.error('Erro ao salvar o conteúdo:', error);
  } finally {
    isLoading.value = false;
  }
}

function open() {
  isModalVisible.value = true;
}

function close() {
  isModalVisible.value = false;
}

defineExpose({
  open,
});
</script>

<template>
  <Overlay v-if="isModalVisible">
    <div class="flex flex-col h-auto py-4 px-6 bg-white shadow-lg rounded-2xl">
      <Typography tag="h3" variant="h3">
        Adicione um título para o conteúdo revisado
      </Typography>

      <div class="border my-4"></div>

      <Typography tag="p" variant="body" class="mb-4 text-gray-500">
        Insira um título para salvar o conteudo revisado
      </Typography>

      <div>
        <InputField v-model="inputValue" placeholder="Título do conteúdo" />
        <!-- 
          Aqui será criado um componente de tags para o usuário selecionar as tags
        -->
        <div class="flex gap-3 mt-4 justify-end">
          <MainButton 
            @click="close"
            class="bg-gray-400 text-white flex items-center gap-3 py-2 px-4 rounded-md"
          >
            <template v-slot:label>
              Cancelar
            </template>
          </MainButton>
          <MainButton @click="saveReviewedContent">
            <template v-slot:label>
              Guardar
            </template>
            <template v-slot:icon>
              <SpinningLoader v-if="isLoading" />  
            </template>
          </MainButton>
        </div>
      </div>
    </div>
  </Overlay>
</template>