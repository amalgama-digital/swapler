<script setup>
import { computed } from 'vue';
import { useSwapStore } from '../../../stores/swap';
import * as wallet from '../../../helpers/wallet';

import BasicButton from '../../BasicButton.vue';

const props = defineProps(['item']);

const swapStore = useSwapStore();

const offering = computed(() => {
    return swapStore.tokensToSwap || swapStore.nftsToSwap.length;
});

// TODO: implement it right
async function sendOffer() {
    let payment = [];
    if (swapStore.nftsToSwap.length) {
        payment.push({
            assetId: swapStore.nftsToSwap[0].assetId,
            amount: 1
        });
    }
    if(swapStore.tokensToSwap > 0) {
        payment.push({
            assetId: 'WAVES', // TODO: selectable
            amount: swapStore.tokensToSwap * Math.pow(10, 8)
        })
    }
    console.debug(swapStore.selectedItem.offerId)
    const result = await wallet.offerForSwap(
        swapStore.selectedItem.offerId, // or id
        payment
    );
    console.log({result})
}
</script>

<template>
    <div class="popup-right">
        <header class="swap-header">for that</header>
        <div class="flex-column right-container">
            <div class="flex-row info-container">
                <div class="image-container">
                    <img :src="props.item?.metadata?.url ?? ''" alt="" />
                </div>
                <div class="flex-column item-info">
                    <div class="flex-column item-info__name">
                        <span class="item-name">{{ props.item.name }}</span>
                        <span class="item-collection">
                            {{ props.item.collection }}
                        </span>
                    </div>
                    <div class="flex-row social-media">
                        <a href="#">
                            <img src="/img/social/web_icon.svg" alt="" />
                        </a>
                        <a href="#">
                            <img src="/img/social/twitter_icon.svg" alt="" />
                        </a>
                        <a href="#">
                            <img src="/img/social/telegram_icon.svg" alt="" />
                        </a>
                        <a href="#">
                            <img src="/img/social/reddit_icon.svg" alt="" />
                        </a>
                    </div>
                    <div class="flex-row cost-container">
                        <span class="cost cost-text">last cost: </span>
                        <span class="flex-row flex-center cost-price">
                            {{ Math.round(props.item.price / Math.pow(10, 8)) }}
                            <img src="/img/svg/rectangle.svg" alt="" />
                        </span>
                    </div>
                    <span class="offers-count">
                        {{ props.item.offers }} offers
                    </span>
                </div>
            </div>
            <div class="flex-column instant-exchange">
                <span class="instant-exchange__text">instant exchange</span>
                <ul>
                    <li>{{ props.item.price / Math.pow(10, 8) }} <img src="/img/svg/rectangle.svg" alt="" /></li>
                </ul>
            </div>
            <div class="flex-row offer-btn-container">
                <basic-button @click="sendOffer" :disabled="!offering"
                    >Send an offer</basic-button
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
ul {
    list-style: none;
    padding: 0;
}
ul li::before {
    font-family: 'Courier New', Courier, monospace;
    content: '\2022';
    font-weight: bold;
    color: var(--color-green);
    display: inline-block;
    width: 1rem;
}
ul li {
    color: var(--color-green);
}
.popup-right {
    width: 49%;
    height: 100%;
    margin-left: 1rem;
    justify-content: space-evenly;
}
.right-container {
    justify-content: space-between;
    height: 80%;
}
.info-container {
    gap: 1rem;
}
.item-info {
    justify-content: space-between;
}
.item-name {
    font-size: 30px;
}
.item-collection {
    font-size: 18px;
    color: var(--color-gray);
}
.social-media {
    gap: 0.5rem;
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
.offers-count {
    font-size: 18px;
    color: var(--color-text);
    font-weight: 300;
}
.instant-exchange__text {
    color: var(--color-gray);
    font-size: 18px;
    font-weight: 400;
}
.offer-btn-container {
    width: 95%;
    justify-content: end;
}
.offer-btn-container > button {
    width: fit-content;
}
</style>
