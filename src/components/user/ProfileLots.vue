<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getData } from '../../helpers/market';

import { useManageStore } from '../../stores/manage';
import { useMainStore } from '../../stores/main';

import NftCard from '../swap/NftCard.vue';
import BasicButton from '../BasicButton.vue';

const router = useRouter();
const mainStore = useMainStore();
const manageStore = useManageStore();

const items = ref([]);
const show = reactive({
    'swap': false,
    'borrow': false,
    'raffle': false
}); 

onMounted(async () => {
    const data = await getData();
    const userLots = data.filter(e => e.owner === mainStore.walletAddr);
    items.value = userLots;
});

function goToAddLot() {
    router.push({name: 'add-lot'});
}

function changeShowState(el) {
    show[el] = !show[el];
}
function manage(item) {
    manageStore.manageItem = item;
    router.push({name: 'manage-asset'});
}
</script>

<template>
    <div class="flex-column w-80 lots-container">
        <div class="flex-row flex-space-between">
            <span class="text">My lots:</span>
            <span @click="goToAddLot" class="add-lot"><img src="/img/svg/add_circle.svg" /> Add new lot</span>
        </div>
        <div class="flex-column">
            <div class="flex-column">
                <div @click="changeShowState('swap')" class="flex-row flex-space-between type-text">
                    <span>Swap <span class="count">({{ items.length }})</span></span>
                    <img :class="show.swap ? 'rotate': 'rotate-back'" src="/img/svg/expand_more.svg" alt=">">
                </div>
                <!-- nfts for swap -->
                <div v-if="show.swap">
                    <div class="flex-row flex-start cards">
                        <nft-card v-for="item in items" :key="item.n" :item="item">
                            <basic-button
                                @click="manage(item)"
                            >
                                Manage
                            </basic-button>
                        </nft-card>
                    </div>
                </div>
            </div>
            <!-- TODO: borrow and raffle -->
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
    color:#BBFD00;
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
