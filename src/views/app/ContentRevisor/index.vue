<script setup lang="ts">
import { ref, reactive, watchEffect, computed, onMounted, onUpdated } from 'vue';
import { Icon } from '@iconify/vue';
import { useHelper } from '../../../composables/useHelper';
import BreadcrumbButtons from '../../../components/BreadcrumbButton/index.vue';
import RenameReviewedContent from './components/RenameReviewedContent/index.vue';
import ContentReviewedList from './components/ContentReviewedList/index.vue';
import MainButton from '../../../components/MainButton/index.vue';
import Typography from '../../../components/Typography/index.vue';
import { Breadcrumb } from '../../../types/Breadcrumb.types';
import loadingBot from "../../../assets/lottie/loadingBot.json";
import failed from "../../../assets/lottie/failed.json";

const { copyToClipboard, pasteFromClipboard, pastedText } = useHelper();

const content = ref('');
const words = ref(0);
const scrollDown = ref<HTMLElement | null>(null);
const isUSerActionsVisible = ref(true);
const showErrorMessage = ref(false);
const showReviewdContentsList = ref(false);
const showPopupSaveReviewdContent = ref(false);
const enableBreadcrumbActions = ref(false);
const renamedReviewdContent = ref<typeof RenameReviewedContent | null>(null)
const hideAnimation = ref(null);
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

function cleanContent() {
  content.value = '';
  words.value = 0;
  showErrorMessage.value = false;
  contentReviewed.value = '';
  setAnimation.loopAnimation = false;
  setAnimation.speedAnimation = 1;
  feedbackMessage.value = '';
}

async function pasteTextFromClipboard() {
  await pasteFromClipboard();
  content.value = pastedText.value;
}

function startReview() {
  if (words.value < 50) {
    showErrorMessage.value = true;
    return;
  }
  showErrorMessage.value = false;
  fetchingData();
};

async function fetchingData() {
  try {
   // Aqui vai ficar o prompt gerado

    const newAnimation = {
      loopAnimation: true,
      speedAnimation: 3,
    }
    
    Object.assign(setAnimation, newAnimation);
    animationKey.value++
  
    feedbackMessage.value = 'Deixe-me gerar o melhor prompt para você!';
    new Promise((resolve) => {
      setTimeout(() => {
        feedbackMessage.value = 'Só mais um poquinho, estamos quase lá...';
        contentReviewed.value = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nesciunt iste nisi fugit dolores vero. Corporis numquam odit commodi omnis, beatae, deserunt, consequuntur eos nobis excepturi quis sapiente vitae blanditiis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nesciunt iste nisi fugit dolores vero. Corporis numquam odit commodi omnis, beatae, deserunt, consequuntur eos nobis excepturi quis sapiente vitae blanditiis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nesciunt iste nisi fugit dolores vero. Corporis numquam odit commodi omnis, beatae, deserunt, consequuntur eos nobis excepturi quis sapiente vitae blanditiis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nesciunt iste nisi fugit dolores vero. Corporis numquam odit commodi omnis, beatae, deserunt, consequuntur eos nobis excepturi quis sapiente vitae blanditiis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nesciunt iste nisi fugit dolores vero. Corporis numquam odit commodi omnis, beatae, deserunt, consequuntur eos nobis excepturi quis sapiente vitae blanditiis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nesciunt iste nisi fugit dolores vero. Corporis numquam odit commodi omnis, beatae, deserunt, consequuntur eos nobis excepturi quis sapiente vitae blanditiis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nesciunt iste nisi fugit dolores vero. Corporis numquam odit commodi omnis, beatae, deserunt, consequuntur eos nobis excepturi quis sapiente vitae blanditiis?';
        resolve(typeWriter(contentReviewed.value, 0, () => {
          enableBreadcrumbActions.value = true;
        }));
      }, 5000)
    });
  } catch (error) {
    // if (error || error.status !== 400) {
    //   message.value = "Erro ao gerar prompt!";
    //   showToast("error", message.value);
    //   Object.assign(setAnimation, { loopAnimation: false, speedAnimation: 1 });
    //   animationKey.value++
    //   hideAnimation.value = true;
    //   failedRequest.value = true;
    //   feedbackMessage.value = "Ops! Algo deu errado, tente novamente mais tarde!";
    // }
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

async function saveReviewdContent() {
  console.log('Salvando conteúdo revisado...');
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(showPopupSaveReviewdContent.value = true)
    }, 2000)
  });
};

const scrollToBottom = () => {
  if (scrollDown.value) {
    scrollDown.value.scrollTop = scrollDown.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom()
});

onUpdated(() => {
  scrollToBottom();
});
</script>

<template>
  <!-- desabilitar ações durante o carregamento do conteudo revisado -->
  <!-- apontar barra de scroll sempre na posição que permita usuário ver que o conteudo ainda esta sendo carregado -->
  <RenameReviewedContent 
    ref="renamedReviewdContent"
    @action="saveReviewdContent"
  />

  <div class=" mx-14 rounded-xl h-[90%] py-6 px-8">
    <div class="flex justify-between">
      <Typography tag="h2" variant="h2">
        Revisor de conteúdo
      </Typography>

      <MainButton @click="showReviewdContentsList = true">
        <template v-slot:icon>
          <Icon icon="solar:move-to-folder-linear" />
        </template>
        <template v-slot:label>
          <span>Minhas revisões</span>
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
          <div class="flex flex-row-reverse items-center justify-between text-gray-500">
            <p>Palavras digitadas: {{ words }}</p>
            
            <MainButton @click="startReview">
              <template v-slot:icon>
                <Icon icon="solar:magic-stick-3-linear" />
              </template>
              <template v-slot:label>
                <span>Iniciar revisão</span>
              </template>
            </MainButton>
          </div>
          <p 
            v-if="showErrorMessage" 
            class="text-red-600 text-sm font-semibold"
          >
            Seu texto deve conter pelo menos 50 palavras
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