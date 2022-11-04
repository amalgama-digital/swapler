<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMainStore } from '../stores/main';

import SelectLots from '../components/user/lots/SelectLots.vue';
import AddLot from '../components/user/lots/AddLot.vue';

const components = {
    'select': SelectLots,
    'add': AddLot
};

const router = useRouter();
const mainStore = useMainStore();

const userNFTs = reactive([
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

const selectedComponent = ref('select');
const selectedToken = ref(undefined);

onBeforeMount(() => {
    if(mainStore.walletConn !== true) {
        router.push({ name: 'main' })
    }
});

function selectToken(nft) {
    selectedToken.value = nft;
    selectedComponent.value = 'add';
}
function unsetToken() {
    selectedToken.value = undefined;
    selectedComponent.value = 'select';
}
function mockAddLot(lot) {
    console.debug({lot});
}
</script>

<template>
    <div class="flex-column flex-center w-100 lots-container">
        <component
            :is="components[selectedComponent]"
            :user-nfts="userNFTs"
            :selected-token="selectedToken"
            @proceed="selectToken"
            @cancel="unsetToken"
            @addlot="mockAddLot"
        ></component>
    </div>
</template>

<style scoped>
.lots-container {
    margin-top: 2rem;
}
</style>
