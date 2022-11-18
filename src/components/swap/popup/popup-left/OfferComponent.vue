<script setup>
import { useSwapStore } from '../../../../stores/swap';
import TokenButtons from './TokenButtons.vue';

const emit = defineEmits(['setComponent']);
const swapStore = useSwapStore();

function setComponent(name) {
    emit('setComponent', name);
}
function removeTokens() {
    swapStore.tokensToSwap = null;
}
function removeNft(n) {
    swapStore.nftsToSwap.splice(n, 1);
}
</script>

<template>
    <div class="flex-column flex-center flex-space-between h-100 w-90">
        <!-- NFTs -->
        <div
            class="flex-column w-100 gap-05"
            v-if="swapStore.nftsToSwap.length"
        >
            <span class="gray-sm">NFT`s</span>
            <div class="flex-column w-100 nfts-to-swap">
                <div
                    class="flex-row w-100 flex-space-between"
                    v-for="(nft, n) in swapStore.nftsToSwap"
                    :key="n"
                >
                    <div class="flex-row gap-07">
                        <div class="image-container">
                            <img
                                class="img-sm"
                                :src="nft.metadata.url"
                                alt=""
                            />
                        </div>
                        <div class="flex-column flex-space-between">
                            <div class="flex-column gap-05">
                                <span class="item-name">{{ nft.name }}</span>
                                <span class="item-collection">
                                    {{ nft.collection }}
                                </span>
                            </div>
                            <div class="flex-row cost-container">
                                <span class="cost-text">last cost: </span>
                                <span class="cost-price">
                                    {{ nft.price }}
                                    <img src="/img/svg/rectangle.svg" alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <img
                        @click="removeNft(n)"
                        class="remove"
                        src="/img/svg/delete.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>
        <!-- Tokens -->
        <div v-if="swapStore.tokensToSwap" class="flex-column w-100 gap-05">
            <span class="gray-sm">Tokens</span>
            <div class="flex-row w-100 flex-space-between">
                <div class="flex-row gap-07">
                    <span>{{ swapStore.tokensToSwap }}</span>
                    <span>waves</span>
                </div>
                <img
                    class="remove"
                    @click="removeTokens"
                    src="/img/svg/delete.svg"
                    alt=""
                />
            </div>
        </div>
        <!-- Comission -->
        <div class="flex-column w-100 gap-05">
            <span class="gray-sm">Network commission</span>
            <div class="flex-row gap-07">
                <span>0.509</span>
                <span>WAVES</span>
            </div>
        </div>
        <token-buttons
            class="w-100 flex-start"
            @set-component="setComponent"
        ></token-buttons>
    </div>
</template>

<style scoped>
.nfts-to-swap {
    max-height: 11rem;
    overflow-y: auto;
    gap: 0.7rem;
    padding: 0.5rem;
    scrollbar-width: thin;
}
.nfts-to-swap::-webkit-scrollbar {
    background-color: var(--color-dark-gray);
    border-radius: 10px;
    width: 0.5rem;
}
.nfts-to-swap::-webkit-scrollbar-thumb {
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
    width: 80px;
    height: 80px;
}
.item-name {
    font-size: 14px;
}
.item-collection {
    font-size: 10px;
}
.cost-container {
    gap: 0.3rem;
    letter-spacing: -0.02rem;
    align-items: center;
}
.cost-text {
    font-size: 10px;
    color: var(--color-gray);
}
.cost-price {
    font-size: 14px;
    color: var(--color-text);
}
.gray-sm {
    color: var(--color-gray);
    font-size: 14px;
}
.remove {
    cursor: pointer;
    height: 19px;
}
</style>
