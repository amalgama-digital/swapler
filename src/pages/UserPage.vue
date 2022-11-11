<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

import { useMainStore } from '../stores/main';

import { getLogin } from '../helpers/wallet'

import ProfileInfo from '../components/user/ProfileInfo.vue';
import ProfileLots from '../components/user/ProfileLots.vue';

const router = useRouter();
const mainStore = useMainStore();

onBeforeMount(() => {
    if (mainStore.walletConn) {
        return;
    }

    const login = getLogin();
    if(login) {
        mainStore.walletAddr = login.address;
        mainStore.walletPubKey = login.publicKey;
        mainStore.walletConn = true;
    } else {
        router.push({ name: 'main' });
    }
});
</script>

<template>
    <div class="flex-column flex-center w-100 user-page">
        <profile-info
            :address="mainStore.walletAddr"
        ></profile-info>
        <profile-lots></profile-lots>
    </div>
</template>

<style scoped>
.user-page {
    margin-top: 2rem;
    gap: 2rem;
}
</style>
