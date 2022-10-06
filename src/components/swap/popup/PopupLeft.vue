<script setup>
import { ref } from 'vue';

import ConnectButton from '../../ConnectButton.vue';
import TokenButtons from './popup-left/TokenButtons.vue';
import UserTokens from './popup-left/UserTokens.vue'

const walletConnectedMock = ref(false);

const tabs = {
    'main': TokenButtons,
    'nft': UserTokens,
    'tok': UserTokens
};
const selectedComponent = ref('main');

function mockConnect() {
    walletConnectedMock.value = true;
    // setTimeout(() => {walletConnectedMock.value = false}, 60000);
}

function setComponent(v) {
    selectedComponent.value = v ?? 'main';
}
</script>

<template>
    <div class="popup-left">
        <header class="swap-header">I want to swap this</header>
        <div class="flex-column flex-center left-container">
            <connect-button
                class="w-50"
                @click="mockConnect"
                v-if="!walletConnectedMock"
            >Connect your wallet first</connect-button>
            <div
                class="flex-column flex-center w-100 h-100"
                v-else
            >
                <component @additem="setComponent" :is="tabs[selectedComponent]"></component>
            </div>
        </div>
    </div>
</template>

<style scoped>
.popup-left {
    width: 49%;
    height: 100%;
    margin-right: .6rem;
}
.popup-left > .swap-header {
    text-align: end;
}
.left-container {
    justify-content: space-evenly;
    height: 85%;
}
</style>
