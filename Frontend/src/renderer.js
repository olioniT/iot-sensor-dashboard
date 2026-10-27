import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { useToast } from '@/composables/useToast.js';

import App from './App.vue';
import router from './router/index.js';

import './index.css';

const app = createApp(App)
const pinia = createPinia()

app.config.errorHandler = (err, instance, info) => {
    console.error(err)

    console.log(err.message)

    const toast = useToast()
    toast.show(err.message ?? "An unexpected error occurred.", "error", 5000)
}

app.use(pinia)
app.use(router)
app.mount('#app');