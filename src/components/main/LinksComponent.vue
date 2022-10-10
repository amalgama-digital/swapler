<script setup>
import { reactive, readonly } from "vue";
import { useRouter } from "vue-router";
import LinkButton from "./LinkButton.vue";

const router = useRouter();
const buttons = readonly(
  reactive([
    {
      img: "/img/svg/swap_horiz.svg",
      label: "Swap",
      description: "swap your NFT like you want",
    },
    {
      img: "/img/svg/monetization_on.svg",
      label: "Borrow",
      description: "get tokens in exchange for NFT",
    },
    {
      img: "/img/svg/local_activity.svg",
      label: "Raffle",
      description: "buy tickets and win the NFT`s",
    },
  ])
);

function goTo(lnk) {
  try {
    router.push({ name: lnk });
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="flex-row links-container w-80">
    <link-button
      v-for="(btn, n) in buttons"
      :key="n"
      @click="goTo(btn.label.toLowerCase())"
    >
      <template v-slot:image>
        <img :src="btn.img" alt="" />
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
