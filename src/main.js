import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Signer } from '@waves/signer';

import App from './App.vue';

import './assets/main.css';
import router from './router';

//testnet
const nodeURL = 'https://nodes-testnet.wavesnodes.com';

// mainnet
// const nodeURL = 'https://nodes.wavesnodes.com'
window.nodeURL = nodeURL;

window.signer = new Signer({
    NODE_URL: window.nodeURL,
});

// testnet
window.contractAddress = '3N8VMRDjjw6kAuCviYwFq4yDWyctRuHPN7X';

// mainnet
// window.contractAddress = ""

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
