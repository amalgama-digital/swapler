<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useSwapStore } from '../../../../stores/swap';
import { useMainStore } from '../../../../stores/main';

import { getNFTs } from '../../../../helpers/wallet'

import BasicButton from '../../../BasicButton.vue';

const emit = defineEmits(['setComponent']);
const swapStore = useSwapStore();
const mainStore = useMainStore();
const selectedToken = ref(undefined);

const userNFTs = reactive([]);

onMounted(async () => {
    const addr = mainStore.walletAddr;
    await getNFTs(addr, userNFTs);
});

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
                        v-for="nft in userNFTs"
                        :key="nft.n"
                        @click="selectToken(nft)"
                    >
                        <img class="img-sm" :src="nft.metadata.url" alt="" />
                    </div>
                </div>
            </div>
            <div v-if="selectedToken" class="flex-row gap-07">
                <div class="image-container">
                    <img :src="selectedToken.metadata.url" alt="" />
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
                            >{{ selectedToken.price }}
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
