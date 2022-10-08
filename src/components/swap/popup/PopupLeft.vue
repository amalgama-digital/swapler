<script setup>
import { ref, watch } from 'vue';

import { useMainStore } from '../../../stores/main';
import { useSwapStore } from '../../../stores/swap';

import ConnectButton from '../../ConnectButton.vue';
import TokenButtons from './popup-left/TokenButtons.vue';
import UserNft from './popup-left/UserNft.vue';
import UserTokens from './popup-left/UserTokens.vue';
import OfferComponent from './popup-left/OfferComponent.vue';

const mainStore = useMainStore();
const swapStore = useSwapStore();

const tabs = {
    'main': TokenButtons,
    'nft': UserNft,
    'tok': UserTokens,
    'offer': OfferComponent
};
const selectedComponent = ref('main');

watch(
    () => swapStore.showPopup,
    () => {
        selectedComponent.value = 'main';
    }
);

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
                v-if="!mainStore.walletConn"
            >Connect your wallet first</connect-button>
            <div
                class="flex-column flex-center w-100 h-100"
                v-else
            >
                <component @set-component="setComponent" :is="tabs[selectedComponent]"></component>
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
    height: 80%;
}
</style>
