import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Signer } from '@waves/signer';

import App from './App.vue';

import './assets/main.css';
import router from './router';

window.signer = new Signer({
    NODE_URL: 'https://nodes.wavesnodes.com',
});

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
