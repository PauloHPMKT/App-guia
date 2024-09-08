<script lang="ts" setup>
//import { inject, ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import PageLayout from '../../../Layout/PageLayout.vue';
import MainTitle from '../../../components/MainTitle/index.vue';
import ToolServices from '../../../components/ToolServices/index.vue';
//import { OpenaiService } from '../../../services/openai/OpenaiService';
import { useNavigation } from '../../../composables/useNavigation';

const { navigationServices } = useNavigation();

// const openaiService = inject<OpenaiService>('openaiService');
// const data = ref<typeof OpenaiService | null>(null)

// const previousRouteName = ref('')

function redirectTo() {
  console.log('Redirecionando...');
}
</script>

<template>
  <PageLayout>
    <MainTitle>Meus guIA Apps</MainTitle>

    <div class="border my-4"></div>
    <div>
      <div class="flex">
        <div class="flex items-center">
          <Icon icon="iconamoon:arrow-bottom-left-6-circle-bold" class="mr-2" />
          <Typography 
            tag="p" 
            variant="body" 
            class="text-gray-900 font-semibold text-md"
          >
            Acessada recentemente:
          </Typography>
        </div>
        <div class="ml-5 cursor-pointer flex items-center bg-white p-2 rounded-[18px] border-2 border-transparent hover:border-slate-300 shadow-sm">
          <div class="bg-black p-2 flex items-center justify-center rounded-full mr-2">
            <Icon icon="tdesign:share" class="text-white"/>
          </div>
          <span class="font-semibold" @click="redirectTo">
            {{ 'previousRouteName' }}
          </span>
        </div>
      </div>
    </div>
    <div class="border my-4"></div>

    <div class="mt-4">
      <Typography tag="p" variant="body" class="text-gray-500">
        IA Workflows recomendados para o seu usuário
      </Typography>
      <div class="flex items-center gap-3 flex-wrap mb-8 mt-5">
        <ToolServices
          v-for="service in navigationServices"
          :key="service.id"
          v-bind="service"
        />
      </div>
    </div>
  </PageLayout>
</template>