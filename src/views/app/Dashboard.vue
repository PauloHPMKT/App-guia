<script lang="ts" setup>
import { inject, ref, onMounted } from 'vue';
import { OpenaiService } from '../../services/openai/OpenaiService';

const openaiService = inject<OpenaiService>('openaiService');
const data = ref<typeof OpenaiService | null>(null)

async function instanceConnection() {
  if (openaiService) {
    try {
      const res = await openaiService.getUserData();
      data.value = res;
    } catch (error) {
      console.error('Erro ao buscar dados do OpenAI', error);
    }
  } else {
    console.error('openaiService não foi injetado corretamente');
  }
}

onMounted(async () => {
  await instanceConnection()
})
</script>

<template>
  <div>
    <h2>Componente Filho</h2>
    <p>{{ data }}</p>
  </div>
</template>