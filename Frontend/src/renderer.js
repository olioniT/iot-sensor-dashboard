import { createApp } from 'vue';
// import { createPinia } from 'pinia';

import "tailwindcss"

import App from './App.vue';
import router from './router/index.js';

import './index.css';

const app = createApp(App)

app.use(router)
app.mount('#app');