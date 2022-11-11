<script setup>
import { connectKeeper } from '../helpers/wallet';
import { useMainStore } from '../stores/main';

const mainStore = useMainStore();

async function connectWallet() {
    const conn = await connectKeeper();
    if (!conn.error) {
        mainStore.walletAddr = conn.address;
        mainStore.walletPubKey = conn.publicKey;
        window.localStorage.setItem('login', JSON.stringify(conn));
        mainStore.walletConn = true;
    } else {
        console.error(conn.error);
    }
}
</script>

<template>
    <button @click="connectWallet" class="button connection-btn">
        <slot></slot>
    </button>
</template>

<style>
.connection-btn {
    border-radius: 4px;
    padding: 8px 12px;
}
</style>
