<script setup>
import BasicButton from "../../../BasicButton.vue";

const emit = defineEmits(["setComponent"]);
</script>

<template>
  <div class="flex-row flex-center buttons-container">
    <basic-button @click="emit('setComponent', 'nft')">Add NFT</basic-button>
    <basic-button @click="emit('setComponent', 'tok')">Add tokens</basic-button>
  </div>
</template>

<style scoped>
.buttons-container {
  gap: 1rem;
}
</style>
