<script setup lang="ts">
import { 
  ref, 
  reactive, 
  watchEffect, 
  computed, 
  onMounted, 
  onUpdated, 
  inject 
} from 'vue';
import { Icon } from '@iconify/vue';
import { useHelper } from '../../../composables/useHelper';
import BreadcrumbButtons from '../../../components/BreadcrumbButton/index.vue';
import RenameReviewedContent from './components/RenameReviewedContent/index.vue';
import ContentReviewedList from './components/ContentReviewedList/index.vue';
import MainButton from '../../../components/MainButton/index.vue';
import Typography from '../../../components/Typography/index.vue';
import { Breadcrumb } from '../../../types/Breadcrumb.types';
import { OpenaiService } from '../../../services/openai/OpenaiService';
import loadingBot from "../../../assets/lottie/loadingBot.json";
import failed from "../../../assets/lottie/failed.json";

const { copyToClipboard, pasteFromClipboard, pastedText } = useHelper();

const openaiService = inject<OpenaiService>('openaiService'); 

const reviewdContentToSave = reactive({
  title: '',
  content: '',
})

const content = ref('');
const selectedAction = ref('');
const words = ref(0);
const scrollDown = ref<HTMLElement | null>(null);
const isUSerActionsVisible = ref(true);
const showErrorMessage = ref(false);
const errorMessage = ref('');
const showReviewdContentsList = ref(false);
const showPopupSaveReviewdContent = ref(false);
const enableBreadcrumbActions = ref(false);
const renamedReviewdContent = ref<typeof RenameReviewedContent | null>(null);
const hideAnimation = ref<boolean | null>(null);
const contentReviewed = ref('');
const failedRequest = ref(true);
const feedbackMessage = ref('');
const typewriterText = ref('');
const animationKey = ref(0);
const setAnimation = reactive({
  loopAnimation: false,
  speedAnimation: 1,
})
const breadcrumbButtons = ref([
  {
    icon: "solar:like-line-duotone",
    action: "like",
  },
  {
    icon: "solar:dislike-line-duotone",
    action: "dislike",
  },
  {
    icon: "solar:restart-bold",
    action: "generate",
  },
  {
    icon: "solar:copy-line-duotone",
    action: "clipboard",
  }
] as Breadcrumb.Buttons[]);

watchEffect(() => {
  if (content.value.length >= 2) {
    isUSerActionsVisible.value = false;
    countWords.value(content.value);
  } else {
    isUSerActionsVisible.value = true;
  }
});

const countWords = computed(() => (
  (text: string) => {
    const textContent = text.trim();
    const count = textContent ? textContent.split(/\s+/).length : 0;
    
    if (content.value.length === 2) {
      words.value = 0;
      return words.value;
    }
    words.value = count;
    return words.value;
  }
));

const getIconImage = computed(() => {
  return showReviewdContentsList.value 
    ? 'solar:map-arrow-left-linear'
    : 'solar:move-to-folder-linear' 
})

function cleanContent() {
  content.value = '';
  words.value = 0;
  showErrorMessage.value = false;
  contentReviewed.value = '';
  setAnimation.loopAnimation = false;
  setAnimation.speedAnimation = 1;
  feedbackMessage.value = '';
  typewriterText.value = '';
  enableBreadcrumbActions.value = false;
  selectedAction.value = '';
  errorMessage.value = '';
}

async function pasteTextFromClipboard() {
  await pasteFromClipboard();
  content.value = pastedText.value;
}

function startReview() {
  if (!selectedAction.value) {
    showErrorMessage.value = true;
    errorMessage.value = "Selecione uma intenção para o texto!";
    return;
  }

  if (words.value < 50) {
    showErrorMessage.value = true;
    errorMessage.value = "O texto deve conter no mínimo 50 palavras!";
    return;
  }

  showErrorMessage.value = false;
  fetchingData(content.value, selectedAction.value);
};

async function loadFeedbackMessage(message: string) {
  feedbackMessage.value = message;
  await new Promise(resolve => setTimeout(resolve, 5000));
};

async function fetchingData(content: string, intention: string) {
  try {
   // Aqui vai ficar o prompt gerado
    const request = { content, intention };

    const newAnimation = {
      loopAnimation: true,
      speedAnimation: 3,
    }
    
    Object.assign(setAnimation, newAnimation);
    animationKey.value++

    await loadFeedbackMessage('Deixe-me revisar seu conteúdo! Por favor aguarde um momento...');

    const { data, status } = await openaiService?.generateContentReview(request);
    if (status === 201) {
      contentReviewed.value = data
      typeWriter(contentReviewed.value, 0, () => {
        enableBreadcrumbActions.value = true;
      });
    }
  } catch (error: Error) {
    if (error || error.status !== 400) {
      // message.value = "Erro ao gerar prompt!";
      // showToast("error", message.value);
      Object.assign(setAnimation, { loopAnimation: false, speedAnimation: 1 });
      animationKey.value++
      hideAnimation.value = true;
      failedRequest.value = true;
      feedbackMessage.value = "Ops! Algo deu errado, tente novamente mais tarde!";
    }
  }
}

async function triggerActions(action: string) {
  switch (action) {
    case Breadcrumb.Actions.LIKE:
      showToastSaveReviewdContent();
      break;
    case 'dislike':
      console.log('dislike');
      break;
    case 'generate':
      console.log('generate');
      break;
    case Breadcrumb.Actions.CLIPBOARD:
      await copyToClipboard(contentReviewed.value);
      break;
    default:
      break;
  }
}

function typeWriter(text: string, index: number, onComplete?: () => void) {
  if (index < text.length) {
    typewriterText.value += text.charAt(index);
    setTimeout(() => {
      typeWriter(text, index + 1, onComplete);
    }, 20);
  } else if (onComplete) onComplete();
};

function showToastSaveReviewdContent() {
  renamedReviewdContent.value?.open();
};

async function saveReviewdContent(title: string) {
  console.log('Salvando conteúdo revisado...', title);
  const objectToSave = {
    title: reviewdContentToSave.title = title,
    content: contentReviewed.value
  }

  console.log(objectToSave);
};

const scrollToBottom = () => {
  if (scrollDown.value) {
    scrollDown.value.scrollTop = scrollDown.value.scrollHeight;
  }
};

async function conectarComOService() {
  try {
    const response = await openaiService?.getUserData()
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  scrollToBottom()
  await conectarComOService()
});

onUpdated(async () => {
  scrollToBottom();
});

</script>

<template>
  <!-- desabilitar ações durante o carregamento do conteudo revisado -->
  <!-- apontar barra de scroll sempre na posição que permita usuário ver que o conteudo ainda esta sendo carregado -->
  <!-- Ao carregar a descrição deve-se neutralizar as ações, evitando clique indesejado -->
  <!-- lembrar de fazer as requisições com o tanStack query -->
  <RenameReviewedContent 
    ref="renamedReviewdContent"
    @action="saveReviewdContent"
  />

  <div class=" mx-14 rounded-xl h-[90%] py-6 px-8">
    <div class="flex justify-between">
      <Typography tag="h2" variant="h2">
        Revisor de conteúdo
      </Typography>

      <MainButton @click="showReviewdContentsList = !showReviewdContentsList">
        <template v-slot:icon>
          <Icon :icon="getIconImage" />
        </template>
        <template v-slot:label>
          <span>
            {{ showReviewdContentsList 
              ? 'Voltar para o revisor' 
              : 'Minhas revisões' 
            }}
          </span>
        </template>
      </MainButton>
    </div>

    <div class="border my-4"></div>

    <div 
      v-if="showPopupSaveReviewdContent"
      class="flex items-center justify-between px-4 rounded-md bg-green-300 border-[1.6px] border-green-500"
    >
      <div class="flex items-center  w-full py-2">
        <Icon icon="solar:check-circle-linear" class="text-[20px] text-green-800"/>
        <p class="ml-2 text-green-800">
          Seu conteúdo revisado foi salvo na lista de revisões, para acessá-lo clique botão a cima.
        </p>
      </div>
      <Icon
        @click="showPopupSaveReviewdContent = false"
        icon="lets-icons:close-round" 
        class="text-[14px] cursor-pointer text-green-800" 
      />
    </div>

    <div v-if="!showReviewdContentsList" class="flex gap-3 h-full py-4">
      <div class="w-1/2 relative rounded-2xl shadow-md bg-white overflow-hidden">
        <Icon 
          v-if="content.length"
          @click="cleanContent"
          icon="lets-icons:close-round" 
          class="absolute right-4 top-4 text-[20px] cursor-pointer" 
        />
        <textarea 
          v-model="content"
          class="w-full h-[75%] resize-none outline-none mt-4 pl-4 pr-9 text-gray-500"
          placeholder="Insira aqui o conteúdo a ser revisado"  
        ></textarea>
        <div 
          v-if="isUSerActionsVisible"
          class="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2"
        >
          <div class="hover:bg-gray-300 hover:text-gray-800 text-gray-500 transition-all duration-300 bg-gray-100 w-32 h-20 rounded-md cursor-pointer flex justify-center items-center">
            <div class="flex flex-col items-center">
              <Icon icon="solar:add-folder-linear" class="w-6 h-6 mb-2" />
              <span class="text-[14px]">Adicionar arquivo</span>
            </div>
          </div>
          <div class="hover:bg-gray-300 hover:text-gray-800 text-gray-500 transition-all duration-300 bg-gray-100 w-32 h-20 rounded-md cursor-pointer flex justify-center items-center">
            <div 
              @click="pasteTextFromClipboard"
              class="flex flex-col items-center"
            >
              <Icon icon="solar:copy-line-duotone" class="w-6 h-6 mb-2" />
              <span class="text-[14px]">Cole um texto</span>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 px-4 w-full h-20">
          <div class="flex flex-row-reverse items-center justify-between text-gray-500 mb-2">
            <p>Palavras digitadas: {{ words }}</p>

            <select 
              title="Ao selecionar uma intenção você estará informando ao sistema o que deseja fazer com o texto digitado"
              id="actions" 
              v-model="selectedAction"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-950 block w-[120px] p-2.5 "
            >
              <option disabled value="">Intenção</option>
              <option value="resumo">Resumir</option>
              <option value="revisao">Revisar</option>
              <option value="correcao">Correção</option>
            </select>
            
            <MainButton @click="startReview">
              <template v-slot:icon>
                <Icon icon="solar:magic-stick-3-linear" />
              </template>
              <template v-slot:label>
                <span>Iniciar processo</span>
              </template>
            </MainButton>
          </div>
          <p 
            v-if="showErrorMessage" 
            class="text-red-600 text-sm font-semibold"
          >
            {{ errorMessage }}
          </p>
        </div>
      </div>
      <div class="w-1/2 rounded-2xl bg-white overflow-hidden shadow-md">
        <div v-if="!contentReviewed" class="mb-4 flex justify-center items-center flex-col h-full">
          <div v-if="hideAnimation && failedRequest">
            <Vue3Lottie              
              :animationData="failed"
              :height="120"
              :width="120"
              :loop="false"
              :speed="2"
            />
            <span>{{ feedbackMessage }}</span>
          </div>
          <div v-else>
            <Vue3Lottie
              :key="animationKey"
              :animationData="loadingBot"
              :height="120"
              :width="120"
              :loop="setAnimation.loopAnimation"
              :speed="setAnimation.speedAnimation"
            />
            <span>{{ feedbackMessage }}</span>
          </div>
        </div>
        <div v-else class="h-full">
          <div ref="scrollDown" class="px-4 mt-4 h-[85%] overflow-auto">
            <p class="text-gray-500">{{ typewriterText || contentReviewed }}</p>
          </div>
          <div class="h-[15%] pb-6 flex gap-3 justify-center items-center">
            <BreadcrumbButtons
              :buttons="breadcrumbButtons"
              @actions="triggerActions"
              v-if="enableBreadcrumbActions"
            />
          </div>
        </div>
      </div>
    </div>
    <ContentReviewedList v-else />
  </div>
</template>