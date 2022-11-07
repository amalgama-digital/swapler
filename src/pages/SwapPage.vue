<script setup>
import { reactive } from 'vue';

import { useSwapStore } from '../stores/swap.js';

import NftCard from '../components/swap/NftCard.vue';
import PopupComponent from '../components/PopupComponent.vue';
import PopupLeft from '../components/swap/popup/PopupLeft.vue';
import PopupRight from '../components/swap/popup/PopupRight.vue';
import CustomSelectComponent from '../components/CustomSelectComponent.vue';

const swapStore = useSwapStore();

// TODO: change
const sortBy = reactive([
    'Name ascending',
    'Name descending',
    'Price: Low to high',
    'Price: High to low'
]);

const items = reactive([
    {
        n: 1,
        cost: 1,
        offers: 1,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #1',
        collection: 'Abstraction world',
    },
    {
        cost: 2,
        offers: 3,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #3',
        collection: 'Abstraction world',
    },
    {
        n: 3,
        cost: 4,
        offers: 5,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #4',
        collection: 'Abstraction world',
    },
    {
        n: 4,
        cost: 1,
        offers: 7,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #14',
        collection: 'Abstraction world',
    },
    {
        n: 5,
        cost: 3,
        offers: 3,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #21',
        collection: 'Abstraction world',
    },
    {
        n: 6,
        cost: 2,
        offers: 1,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #15',
        collection: 'Abstraction world',
    },
    {
        n: 7,
        cost: 1,
        offers: 2,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #7',
        collection: 'Abstraction world',
    },
]);

function closePopup() {
    swapStore.showPopup = false;
    swapStore.selectedItem = {};
    swapStore.nftsToSwap = [];
    swapStore.tokensToSwap = 0;
}

// TODO: improve
function sort(k) {
    console.debug(k);
}
function showPopupWithItem(item) {
    swapStore.showPopup = true;
    swapStore.selectedItem = item;
}
</script>

<template>
    <div class="flex-column flex-center swap-container">
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
        <div class="flex-row flex-center cards">
            <NftCard v-for="item in items" :key="item.n" :item="item">
                <button
                    @click="showPopupWithItem(item)" 
                    class="offer-btn"
                >
                    Quick Offer
                </button>
            </NftCard>
        </div>
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
.swap-container {
    margin-top: 0.7rem;
}
.sort-container {
    font-size: 14px;
    font-family: 'Roboto';
    gap: 0.5rem;
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
    color: var(--color-green);
    border: 2px solid var(--color-green);
    border-radius: 14px;
    background-color: inherit;
    min-width: 8rem;
    cursor: pointer;
}
</style>
