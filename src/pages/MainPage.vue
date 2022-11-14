<script setup>
import { onBeforeMount } from 'vue';

import { useMainStore } from '../stores/main';
import { getLogin } from '../helpers/wallet';

import InfoComponent from '../components/main/InfoComponent.vue';
import LinksComponent from '../components/main/LinksComponent.vue';

const mainStore = useMainStore();

onBeforeMount(() => {
    if (mainStore.walletConn) {
        return;
    }
    const login = getLogin();
    if (login) {
        mainStore.walletAddr = login.address;
        mainStore.walletPubKey = login.publicKey;
        mainStore.walletConn = true;
    }
});
</script>

<template>
    <div class="flex-column flex-center main-container">
        <!-- info component -->
        <InfoComponent />
        <!-- links -->
        <LinksComponent />
    </div>
</template>

<style scoped>
.main-container {
    justify-content: start;
}
</style>
