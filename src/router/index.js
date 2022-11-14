import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '../pages/MainPage.vue';
import SwapPage from '../pages/SwapPage.vue';
import UserPage from '../pages/UserPage.vue';
import LotPage from '../pages/LotPage.vue';
import ManagePage from '../pages/ManagePage.vue';

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage,
    },
    {
        path: '/swap',
        name: 'swap',
        component: SwapPage,
    },
    {
        path: '/profile',
        name: 'profile',
        component: UserPage,
    },
    {
        path: '/profile/manage-asset',
        name: 'manage-asset',
        component: ManagePage,
    },
    {
        path: '/add-lot',
        name: 'add-lot',
        component: LotPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
