import { createApp } from 'vue'
import { router } from './router'
import Vue3Lottie from 'vue3-lottie'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import { OpenaiService } from './services/openai/OpenaiService'
import './assets/css/styles.css'

import App from './App.vue'

const app = createApp(App)

const openaiService = new OpenaiService();  
// const OpenaiPlugin = {
//   install: (app: VueApp) => {
//     const openaiService = new OpenaiService();
//     app.provide('openaiService', openaiService);
//   }
// };

app.use(router)
app.use(Vue3Lottie, { name: "Vue3Lottie" })
app.use(Vue3Toastify, { autoClose: 3000 } as ToastContainerOptions)
//app.use(OpenaiPlugin)
app.provide('openaiService', openaiService);
app.mount('#app')
