import { createApp } from 'vue'
import { router } from './router'
import Vue3Lottie from 'vue3-lottie'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import './assets/css/styles.css'

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(Vue3Lottie, { name: "Vue3Lottie" })
app.use(Vue3Toastify, { autoClose: 3000 } as ToastContainerOptions)

app.mount('#app')
