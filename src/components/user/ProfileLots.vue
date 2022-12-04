<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
    getData,
    getAssets,
    getAssetName,
    getUserOffers,
} from '../../helpers/market';
import { swapCancel } from '../../helpers/wallet';

import { useManageStore } from '../../stores/manage';
import { useMainStore } from '../../stores/main';

import NftCard from '../swap/NftCard.vue';
import BasicButton from '../BasicButton.vue';

const router = useRouter();
const mainStore = useMainStore();
const manageStore = useManageStore();

const items = ref([]);
const offers = ref([]);
const show = reactive({
    swap: false,
    borrow: false,
    raffle: false,
});

onMounted(async () => {
    const rawData = await getData();
    const data = await getAssets(rawData);
    const userLots = data.filter((e) => e.owner === mainStore.walletAddr);
    items.value = userLots;
    const o = getUserOffers(rawData, mainStore.walletAddr);
    for (const offer of o) {
        offer.offerName = await getAssetName(offer.offerId);
        offer.wantAssetName = await getAssetName(offer.wantAssetId);
        offers.value.push(offer);
    }
});

function goToAddLot() {
    router.push({ name: 'add-lot' });
}

function changeShowState(el) {
    show[el] = !show[el];
}
function manage(item) {
    manageStore.manageItem = item;
    router.push({ name: 'manage-asset' });
}
async function revokeOffer(off) {
    const id = `Swap_${off.offerId}_WAVES`;
    const result = await swapCancel(id);
    if (result.error) {
        console.error(result.error);
    } else {
        setTimeout(() => {
            router.push({ name: 'swap' });
        }, 3000);
    }
}
</script>

<template>
    <div class="flex-column w-80 lots-container">
        <div class="flex-row flex-space-between">
            <span class="text">My lots:</span>
            <span @click="goToAddLot" class="flex-row flex-center gap-05 add-lot"
                ><img src="/img/svg/add_circle.svg" /> Add new lot</span
            >
        </div>
        <div class="flex-column">
            <div class="flex-column">
                <div
                    @click="changeShowState('swap')"
                    class="flex-row flex-space-between type-text"
                >
                    <span
                        >Swap
                        <span class="count">({{ items.length }})</span></span
                    >
                    <img
                        :class="show.swap ? 'rotate' : 'rotate-back'"
                        src="/img/svg/expand_more.svg"
                        alt=">"
                    />
                </div>
                <!-- nfts for swap -->
                <div v-if="show.swap">
                    <div class="flex-row flex-start cards">
                        <nft-card
                            v-for="item in items"
                            :key="item.n"
                            :item="item"
                        >
                            <basic-button @click="manage(item)">
                                Manage
                            </basic-button>
                        </nft-card>
                    </div>
                </div>
            </div>
            <!-- TODO: borrow and raffle -->
        </div>
        <span class="text">My offers:</span>
        <div class="flex-column flex-start gap-1r">
            <div
                class="flex-row flex-space-between w-80 offer-info"
                v-for="(offer, n) in offers"
                :key="n"
            >
                <!-- {{ offer }} -->
                <span>
                    Swap {{ offer.offerName }} +
                    {{ offer.price[1] / Math.pow(10, 8) }} WAVES for
                    {{ offer.wantAssetName }}
                </span>
                <basic-button @click="revokeOffer(offer)"
                    >Revoke offer</basic-button
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
.lots-container {
    gap: 1rem;
}
.text {
    font-size: 30px;
    font-weight: 400;
}
.type-text {
    cursor: pointer;
    color: var(--color-green);
    font-size: 44px;
    width: 100%;
    border-bottom: 2px solid var(--color-green);
}
.add-lot {
    color: #bbfd00;
    cursor: pointer;
}
.count {
    color: var(--color-gray);
    font-size: 1.3rem;
}
.cards {
    flex-wrap: wrap;
    gap: 1.5rem;
}
.offer-info {
    align-items: center;
}
.gap-1r {
    gap: 1rem;
}
/* animation */
.rotate {
    animation-name: rotate-forward;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
}
.rotate-back {
    animation-name: rotate-backward;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
}
@keyframes rotate-forward {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(-180deg);
    }
}
@keyframes rotate-backward {
    0% {
        transform: rotate(-180deg);
    }
    100% {
        transform: rotate(0);
    }
}
</style>
