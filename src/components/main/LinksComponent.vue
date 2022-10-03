<script setup>
import { reactive, readonly } from 'vue';
import LinkButton from './LinkButton.vue';

const buttons = readonly(reactive([
    {
        n: 1,
        img: "/img/svg/swap_horiz.svg",
        label: "Swap",
        description: "swap your NFT like you want"
    },
    {
        n: 2,
        img: "/img/svg/monetization_on.svg",
        label: "Borrow",
        description: "get tokens in exchange for NFT"
    },
    {
        n: 3,
        img: "/img/svg/local_activity.svg",
        label: "Raffle",
        description: "buy tickets and win the NFT`s"
    }
]));

</script>

<template>
    <div class="flex-row links-container w-80">
        <link-button
            v-for="btn in buttons"
            :key="btn.n"
        >
            <template v-slot:image>
                <img :src="btn.img" alt="">
            </template>
            <template v-slot:label>{{ btn.label }}</template>
            <template v-slot:description>{{ btn.description }}</template>
        </link-button>
    </div>
</template>

<style scoped>
img {
    width: 100px;
}
.links-container {
    justify-content: space-between;
    align-content: center;
}
</style>
