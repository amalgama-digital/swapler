<script setup>
import { reactive } from 'vue';
import NftCard from '../components/swap/NftCard.vue';

const items = reactive([
    {
        n: 1,
        cost: 1,
        offers: 1,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        cost: 2,
        offers: 3,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        n: 3,
        cost: 4,
        offers: 5,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        n: 4,
        cost: 1,
        offers: 7,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        n: 5,
        cost: 3,
        offers: 3,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        n: 6,
        cost: 2,
        offers: 1,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
    {
        n: 7,
        cost: 1,
        offers: 2,
        img: "http://2.bp.blogspot.com/-HgUDip2qz-U/TglshlCwk2I/AAAAAAAADGo/G6suP1DUGyM/s1600/abstract+background+%25281%2529.jpg",
        name: "Abstract",
        collection: "Abstract world"
    },
]);
</script>

<template>
    <div class="flex-column swap-container">
        <!-- ManipulationElements -->
        <!-- NftCards -->
        <div class="flex-row flex-center cards">
            <NftCard
                v-for="item in items"
                :key="item.n"
                :item="item"
            ></NftCard>
        </div>
    </div>
</template>

<style scoped>
.swap-container {
    margin-top: .7rem;
}
.cards {
    flex-wrap: wrap;
    gap: 1.5rem;
}
</style>
