<script setup>
import { useRouter } from 'vue-router';
import { useMainStore } from '../../stores/main';
import * as wallet from '../../helpers/wallet';
import BasicButton from '../BasicButton.vue';

const props = defineProps(['address']);
const router = useRouter();
const mainStore = useMainStore();

async function logout() {
    await wallet.logout();
    mainStore.walletAddr = undefined;
    mainStore.walletConn = false;
    mainStore.walletPubKey = undefined;
    router.push({ name: 'main' });
}
</script>

<template>
    <div class="flex-column w-80">
        <span class="text">My profile</span>
        <div class="flex-row flex-space-between">
            <span class="address-text">{{ address }}</span>
            <BasicButton @click="logout">Logout</BasicButton>
        </div>
    </div>
</template>

<style scoped>
.text {
    font-size: 30px;
    font-weight: 400;
}
.address-text {
    font-size: 18px;
    color: #bbfd00;
}
</style>
