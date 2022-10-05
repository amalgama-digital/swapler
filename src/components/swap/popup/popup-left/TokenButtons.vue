<script setup>
import BasicButton from '../../../BasicButton.vue';

const emit = defineEmits(['additem']);
</script>

<template>
    <div class="flex-row flex-center buttons-container">
        <basic-button disabled @click="emit('additem', 'nft')">Add NFT</basic-button>
        <basic-button @click="emit('additem', 'tok')">Add tokens</basic-button>
    </div>
</template>

<style scoped>
.buttons-container {
    gap: 1rem;
}
</style>
