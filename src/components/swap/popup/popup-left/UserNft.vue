<script setup>
import { reactive, ref } from 'vue';
import { useSwapStore } from '../../../../stores/swap';

import BasicButton from '../../../BasicButton.vue';

const emit = defineEmits(['setComponent']);
const swapStore = useSwapStore();
const selectedToken = ref(undefined);

const mockNFTs = reactive([
    {
        n: 1,
        cost: 12,
        offers: 128,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #007',
        collection: 'Abstraction world',
    },
    {
        n: 2,
        cost: 3,
        offers: 3,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #21',
        collection: 'Abstraction world',
    },
    {
        n: 3,
        cost: 3,
        offers: 3,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #21',
        collection: 'Abstraction world',
    },
    {
        n: 4,
        cost: 3,
        offers: 3,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #21',
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
    {
        n: 8,
        cost: 3,
        offers: 3,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #21',
        collection: 'Abstraction world',
    },
    {
        n: 9,
        cost: 2,
        offers: 1,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #15',
        collection: 'Abstraction world',
    },
    {
        n: 10,
        cost: 1,
        offers: 2,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #7',
        collection: 'Abstraction world',
    },
    {
        n: 11,
        cost: 3,
        offers: 3,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #21',
        collection: 'Abstraction world',
    },
    {
        n: 12,
        cost: 2,
        offers: 1,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #15',
        collection: 'Abstraction world',
    },
    {
        n: 13,
        cost: 1,
        offers: 2,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #7',
        collection: 'Abstraction world',
    },
]);

function selectToken(nft) {
    selectedToken.value = nft;
}
function addToOffer() {
    swapStore.nftsToSwap.push(selectedToken.value);
    emit('setComponent', 'offer');
}
</script>

<template>
    <div class="flex-column flex-center user-token-container h-100 w-100">
        <div class="flex-column tokens-container w-90">
            <div class="flex-column w-100 h-100 nfts-top">
                <span class="user-heading">My NFT`s:</span>
                <div class="flex-row w-100 nfts-container">
                    <div
                        class="image-container"
                        v-for="nft in mockNFTs"
                        :key="nft.n"
                        @click="selectToken(nft)"
                    >
                        <img class="img-sm" :src="nft.img" alt="" />
                    </div>
                </div>
            </div>
            <div v-if="selectedToken" class="flex-row gap-07">
                <div class="image-container">
                    <img :src="selectedToken.img" alt="" />
                </div>
                <div class="flex-column flex-space-between">
                    <div class="flex-column gap-05">
                        <span class="item-name">{{ selectedToken.name }}</span>
                        <span class="item-collection">
                            {{ selectedToken.collection }}
                        </span>
                    </div>
                    <div class="flex-row cost-container">
                        <span class="cost-text">last cost: </span>
                        <span class="cost-price"
                            >{{ selectedToken.cost }}
                            <img src="/img/svg/rectangle.svg" alt=""
                        /></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-row btn-container">
            <button class="cancel-btn" @click="emit('setComponent', 'main')">
                Cancel
            </button>
            <basic-button
                :disabled="selectedToken ? false : true"
                @click="addToOffer"
            >
                Add to offer
            </basic-button>
        </div>
    </div>
</template>

<style scoped>
.user-token-container {
    justify-content: space-between;
}
.tokens-container {
    gap: 2rem;
}
.nfts-top {
    gap: 1.5rem;
}
.nfts-container {
    width: 90%;
    overflow: auto;

    flex-wrap: wrap;
    gap: 0.5rem;
    max-height: 9rem;
}
.nfts-container::-webkit-scrollbar {
    background-color: var(--color-dark-gray);
    border-radius: 10px;
    width: 0.5rem;
}
.nfts-container::-webkit-scrollbar-thumb {
    background-color: var(--color-green);
    border-radius: 10px;
}
.image-container {
    width: fit-content;
}
.image-container > img {
    width: 120px;
    height: 120px;
}
.image-container > img.img-sm {
    width: 60px;
    height: 60px;
}
.selected-info {
    gap: 0.7rem;
}
.item-name {
    font-size: 30px;
}
.item-collection {
    font-size: 18px;
}
.cost-container {
    gap: 0.3rem;
    letter-spacing: -0.02rem;
}
.cost-text {
    font-size: 18px;
    color: var(--color-gray);
}
.cost-price {
    font-size: 18px;
    color: var(--color-text);
}
.cancel-btn {
    background-color: inherit;
    border: none;
    color: var(--color-green);
}
.btn-container {
    width: 95%;
    justify-content: end;
    gap: 1rem;
}
</style>
