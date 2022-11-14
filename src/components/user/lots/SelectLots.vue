<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import BasicButton from '@/components/BasicButton.vue';

const emit = defineEmits(['proceed']);
const props = defineProps(['userNfts']);

const router = useRouter();

const choosingToken = ref(undefined);

function chooseToken(nft) {
    choosingToken.value = nft;
}

function proceed() {
    emit('proceed', choosingToken.value);
}

function goBack() {
    router.go(-1);
}
</script>

<template>
    <div class="flex-column flex-center user-token-container h-100 w-80">
        <div class="flex-column tokens-container w-100">
            <div class="flex-column w-100 h-100 nfts-top">
                <span class="user-heading">My NFT`s:</span>
                <div class="flex-row w-100 nfts-container">
                    <div
                        class="image-container"
                        v-for="(nft, n) in userNfts"
                        :key="n"
                        @click="chooseToken(nft)"
                    >
                        <img class="img-sm" :src="nft.metadata.url" alt="" />
                    </div>
                </div>
            </div>
            <div v-if="choosingToken" class="flex-row gap-07">
                <div class="image-container">
                    <img :src="choosingToken.metadata.url" alt="" />
                </div>
                <div class="flex-column flex-space-between">
                    <div class="flex-column gap-05">
                        <span class="item-name">{{ choosingToken.name }}</span>
                        <span class="item-collection">
                            {{ choosingToken.collection }}
                        </span>
                    </div>
                    <div class="flex-row cost-container">
                        <span class="cost-text">last cost: </span>
                        <span class="cost-price"
                            >{{ choosingToken.price }}
                            <img src="/img/svg/rectangle.svg" alt=""
                        /></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-row w-100 btn-container">
            <button class="cancel-btn" @click="goBack">Cancel</button>
            <basic-button
                :disabled="choosingToken ? false : true"
                @click="proceed"
            >
                Confirm selection
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
    cursor: pointer;
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
    font-size: 1.3rem;
    color: var(--color-gray);
}
.cost-price {
    font-size: 1.3rem;
    color: var(--color-text);
}
.cancel-btn {
    background-color: inherit;
    border: none;
    color: var(--color-green);
    font-weight: 300;
}
.btn-container {
    margin-top: 1rem;
    justify-content: start;
    gap: 1rem;
}
</style>
