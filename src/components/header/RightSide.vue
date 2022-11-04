<script setup>
import ConnectButton from '@/components/ConnectButton.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useMainStore } from '../../stores/main';

const mainStore = useMainStore();
const router = useRouter();
const addr = ref('');
const firstLetter = ref('');

watch(
    () => mainStore.walletAddr,
    () => {
        const beg = mainStore.walletAddr?.slice(0, 3);
        const len = mainStore.walletAddr?.length;
        const end = mainStore.walletAddr?.slice(len - 3, len);

        addr.value = `${beg}...${end}`;

        firstLetter.value = beg.slice(0, 1);
    }
);

function userPage() {
    router.push({ name: 'profile' });
}

</script>

<template>
    <div v-if="!mainStore.walletConn" class="app-header__child">
        <connect-button>Connect your wallet</connect-button>
    </div>
    <div
        v-else
        @click="userPage"
        class="flex-row app-header__child address-container"
    >
        <span class="addr">{{ addr }}</span>
        <div class="flex-row flex-center first-letter">
            <span>{{ firstLetter }}</span>
        </div>
    </div>
</template>

<style scoped>
.addr {
    color: var(--color-green);
    font-size: 18px;
}
.first-letter {
    background-color: var(--color-green);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: var(--color-dark-gray-2);
    font-weight: bold;
    font-size: 35px;
}
.address-container {
    cursor: pointer;
}
</style>
