<script setup>
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMainStore } from '../stores/main';
import { useSwapStore } from '../stores/swap.js';
import * as sorting from '../helpers/sort.js';
import { getData, getAssets } from '../helpers/market';
import { getLogin } from '../helpers/wallet';

import NftCard from '../components/swap/NftCard.vue';
import PopupComponent from '../components/PopupComponent.vue';
import PopupLeft from '../components/swap/popup/PopupLeft.vue';
import PopupRight from '../components/swap/popup/PopupRight.vue';
import CustomSelectComponent from '../components/CustomSelectComponent.vue';
import UpArrow from '../components/UpArrow.vue';

const router = useRouter();
const mainStore = useMainStore();
const swapStore = useSwapStore();

// TODO: change
const sortBy = reactive([
    // 'Name ascending',
    // 'Name descending',
    'Price: Low to high',
    'Price: High to low',
]);

const items = ref(undefined);

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

onMounted(async () => {
    const rawData = await getData();
    const data = await getAssets(rawData);
    const sorted = sorting.sortLowestPrice(data);
    items.value = sorted;
});

onUnmounted(() => {
    closePopup();
});

function closePopup() {
    swapStore.showPopup = false;
    swapStore.selectedItem = {};
    swapStore.nftsToSwap = [];
    swapStore.tokensToSwap = 0;
}

function sort(k) {
    switch (k) {
        case sortBy[0]:
            items.value = sorting.sortLowestPrice(items.value);
            break;
        case sortBy[1]:
            items.value = sorting.sortHighestPrice(items.value);
            break;
        default:
            break;
    }
}
function showPopupWithItem(item) {
    swapStore.showPopup = true;
    swapStore.selectedItem = item;
}
</script>

<template>
    <div class="flex-column flex-center swap-container">
        <UpArrow />
        <!-- ManipulationElements -->
        <div class="flex-row flex-space-between w-80">
            <div class="flex-row flex-center sort-container">
                <span>Sort by:</span>
                <custom-select-component
                    :options="sortBy"
                    :default="sortBy[0]"
                    @input="sort"
                ></custom-select-component>
            </div>
        </div>
        <!-- NftCards -->
        <!-- <div class="flex-row flex-start w-80 cards"> -->
            <transition-group class="flex-row flex-start w-80 cards" name="ncard" tag="div">
                <NftCard v-for="item in items" :key="item.offerId" :item="item">
                    <button @click="showPopupWithItem(item)" class="button offer-btn">
                        Quick Offer
                    </button>
                </NftCard>
            </transition-group>
        <!-- </div> -->
        <popup-component :popup-show="swapStore.showPopup">
            <img
                @click="closePopup"
                class="close-popup"
                src="/img/svg/close.svg"
                alt=""
            />
            <div class="flex-row sides">
                <PopupLeft />
                <div class="divider"></div>
                <popup-right :item="swapStore.selectedItem"></popup-right>
            </div>
        </popup-component>
    </div>
</template>

<style scoped>
.ncard-move,
.ncard-enter-active,
.ncard-leave-active {
    transition: all 0.5s ease;
}
.ncard-enter-from,
.ncard-leave-to {
    opacity: 0;
    transform: translateY(10rem);
}
.ncard-leave-active {
    position: absolute;
}
.swap-container {
    margin-top: 0.7rem;
}
.sort-container {
    font-size: 1.2rem;
    font-family: 'Roboto';
    gap: 0.5rem;
    margin: 1rem 0 1rem 0;
}
.cards {
    flex-wrap: wrap;
    gap: 1.5rem;
}
.close-popup {
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    cursor: pointer;
}
.sides {
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
}
.divider {
    min-height: 10rem;
    height: 95%;
    width: 0.1rem;

    background-color: var(--color-text);
}
.offer-btn {
    font-size: 16px;
    border-radius: 0.8rem;
    min-width: 8rem;
    cursor: pointer;
}
</style>
