<script setup>
import { onMounted, reactive, ref } from 'vue';

import { useManageStore } from '../stores/manage';

import BasicButton from '../components/BasicButton.vue';
import * as wallet from '../helpers/wallet';

const manageStore = useManageStore();

const offers = ref(undefined);
const selectedOffer = ref(undefined);

onMounted(() => {
    offers.value = manageStore.manageItem.offers;
});

async function selectOffer(offer) {
    const name = await getAssetName(offer.offerId);
    selectedOffer.value = offer;
    selectedOffer.value.assetName = name;
}
function acceptOffer() {
    // wallet.swapDone()
}
async function getAssetName(assetId) {
    const resp =  await fetch(`${window.nodeURL}/assets/details/${assetId}`);
    const data = await resp.json(); 
    return data.name;
}
async function cancelSelling() {
    const resp = await wallet.cancelSelling(manageStore.manageItem.offerId);
    console.debug({resp});
}
function removeOffer() {
    selectedOffer.value = undefined;
}
</script>

<template>
    <div class="flex-column flex-center w-100 mt-1r">
        <div class="flex-column flex-start w-80 gap-1r">
            <div class="flex-row info-container">
                <div class="image-container">
                    <img :src="manageStore.manageItem.metadata.url" alt="" />
                </div>
                <div class="flex-column item-info">
                    <div class="flex-column item-info__name">
                        <span class="item-name">{{ manageStore.manageItem.name }}</span>
                        <span class="item-collection">
                            {{ manageStore.manageItem.collection }}
                        </span>
                    </div>
                    <div class="flex-row cost-container">
                        <span class="cost cost-text">last cost: </span>
                        <span class="flex-row flex-center cost-price">
                            {{ manageStore.manageItem.price / Math.pow(10, 8) }}
                            <img src="/img/svg/rectangle.svg" alt="" />
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <BasicButton @click="cancelSelling">Cancel selling</BasicButton>
            </div>
            <div class="flex-column flex-start gap-1r">
                <span class="offers-text">Offers from:</span>
                <div>
                    <div
                        v-for="(offer, n) in offers"
                        :key="n"
                        class="flex-row flex-space-between offer"
                        @click="selectOffer(offer)"
                    >
                        <span>{{ offer.owner }} </span>
                        <!-- TODO: offer components -->
                    </div>
                </div>
            </div>
            <div
                v-if="selectedOffer"
                class="flex-column flex-start selected-offer gap-1r"
            >
                <div class="flex-column flex-start">
                    <span>Accept an offer from</span>
                    <span class="green-text">{{ selectedOffer.owner }}</span>
                </div>
                <div class="flex-column flex-start">
                    <span>for</span>
                    <span>
                        <span class="green-text">{{ selectedOffer.price[1] / Math.pow(10, 8) }} WAVES</span>
                         + 
                        <span class="green-text" v-if="selectedOffer.price[0]">
                            {{ selectedOffer.assetName }}
                        </span>
                    </span>
                </div>
                <div class="flex-row flex-center gap-1r">
                    <button class="btn">Yes</button>
                    <basic-button @click="removeOffer">No</basic-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.info-container {
    gap: 1rem;
}
.item-info {
    gap: 2rem;
}
.item-name {
    font-size: 30px;
}
.item-collection {
    font-size: 18px;
    color: var(--color-gray);
}
.cost-container {
    gap: 0.4rem;
    letter-spacing: -0.02rem;
    align-items: center;
}
.cost-text {
    font-size: 18px;
    color: var(--color-gray);
}
.cost-price {
    font-size: 30px;
    color: var(--color-text);
    gap: 0.4rem;
}
.offer {
    width: 35rem;
}
.offer:hover {
    color: var(--color-green);
    cursor: pointer;
}
.offers-text {
    color: var(--color-gray);
}
.gap-1r {
    gap: 1rem;
}
.btn {
    background-color: inherit;
    color: var(--color-green);
    border: none;
}
.selected-offer {
    border: 0.2rem solid var(--color-green);
    border-radius: 0.5rem;
    padding: 0.7rem;
    width: 40%;
    font-size: 1.3rem;
}
.green-text {
    color: var(--color-green);
}
.mt-1r {
    margin-top: 1rem;
}
</style>
