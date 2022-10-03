import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '../pages/MainPage.vue';
import SwapPage from '../pages/SwapPage.vue';

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage
    },
    {
        path: '/swap',
        name: 'swap',
        component: SwapPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
