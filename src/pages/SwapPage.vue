<script setup>
import { useSwapStore } from '../stores/swap.js';

import { reactive } from 'vue';

import NftCard from '../components/swap/NftCard.vue';
import PopupComponent from '../components/PopupComponent.vue';
import PopupLeft from '../components/swap/popup/PopupLeft.vue';
import PopupRight from '../components/swap/popup/PopupRight.vue';

const swapStore = useSwapStore();

const items = reactive([
    {
        n: 1,
        cost: 1,
        offers: 1,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        cost: 2,
        offers: 3,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        n: 3,
        cost: 4,
        offers: 5,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        n: 4,
        cost: 1,
        offers: 7,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        n: 5,
        cost: 3,
        offers: 3,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        n: 6,
        cost: 2,
        offers: 1,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        n: 7,
        cost: 1,
        offers: 2,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
]);

function closePopup() {
    swapStore.$patch({
        showPopup: false,
        selectedItem: {}
    })
}
</script>

<template>
    <div class="flex-column swap-container">
        <!-- ManipulationElements -->
        <!-- NftCards -->
        <div class="flex-row flex-center cards">
            <NftCard
                v-for="item in items"
                :key="item.n"
                :item="item"
            ></NftCard>
        </div>
        <popup-component :popup-show="swapStore.showPopup">
            <img @click="closePopup" class="close-popup" src="/img/svg/close.svg" alt="">
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
    margin-top: .7rem;
}
.cards {
    flex-wrap: wrap;
    gap: 1.5rem;
}
.close-popup {
    position: absolute;
    top: .7rem;
    right: .7rem;
    cursor: pointer;
}
.sides {
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
}
.divider {
    height: 85vh;
    width: .1rem;

    background-color: var(--color-text);
}

</style>
