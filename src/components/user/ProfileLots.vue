<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useManageStore } from '../../stores/manage'

import NftCard from '../swap/NftCard.vue';
import BasicButton from '../BasicButton.vue';

const router = useRouter();
const manageStore = useManageStore();

const items = reactive([
    {
        n: 1,
        cost: 1,
        offers: 1,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #1',
        collection: 'Abstraction world',
    },
    {
        cost: 2,
        offers: 3,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #3',
        collection: 'Abstraction world',
    },
    {
        n: 3,
        cost: 4,
        offers: 5,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #4',
        collection: 'Abstraction world',
    },
    {
        n: 4,
        cost: 1,
        offers: 7,
        img: 'http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg',
        name: 'Abstract #14',
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
        collection: 'Abstraction world'
    }
]);
const show = reactive({
    'swap': false,
    'borrow': false,
    'raffle': false
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
                    <span>Swap</span>
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
