<script setup>
import { ref } from 'vue';
import TokenButtons from './TokenButtons.vue';

const emit = defineEmits(['setComponent']);
const selectedToken = ref({
    n: 2,
    cost: 3,
    offers: 3,
    img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
    name: "Abstract #21",
    collection: "Abstraction world"
});

function setComponent(name) {
    emit('setComponent', name);
}
</script>

<template>
    <div class="flex-column flex-center flex-space-between h-100 w-90">
        <!-- NFTs -->
        <div class="flex-column w-100 gap-05">
            <span class="gray-sm">NFT`s</span>
            <div class="flex-row w-100 flex-space-between">
                <div v-if="selectedToken" class="flex-row gap-07">
                    <div class="image-container">
                        <img class="img-sm" :src="selectedToken.img" alt="">
                    </div>
                    <div class="flex-column flex-space-between">
                        <div class="flex-column gap-05">
                            <span class="item-name">{{ selectedToken.name }}</span>
                            <span class="item-collection">{{ selectedToken.collection }}</span>
                        </div>
                        <div class="flex-row cost-container">
                            <span class="cost-text">last cost: </span>
                            <span class="cost-price">{{ selectedToken.cost }} <img src="/img/svg/rectangle.svg" alt=""></span>
                        </div>
                    </div>
                </div>
                <img src="/img/svg/delete.svg" alt="">
            </div>
        </div>
        <!-- Tokens -->
        <div class="flex-column w-100 gap-05">
            <span class="gray-sm">Tokens</span>
            <div class="flex-row w-100 flex-space-between">
                <div class="flex-row gap-07">
                    <span>12</span>
                    <span>waves</span>
                </div>
                <img src="/img/svg/delete.svg" alt="">
            </div>
        </div>
        <!-- Comission -->
        <div class="flex-column w-100 gap-05">
            <span class="gray-sm">Network commission</span>
            <div class="flex-row gap-07">
                <span>0.001</span>
                <span>waves</span>
            </div>
        </div>
        <token-buttons
            class="w-100 flex-start"
            @set-component="setComponent"
        ></token-buttons>
    </div>
</template>

<style scoped>
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
    gap: .3rem;
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
</style>
