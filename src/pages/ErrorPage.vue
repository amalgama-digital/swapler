<script setup>
import { useMainStore } from '../stores/main';

const mainStore = useMainStore();
</script>

<template>
    <div class="flex-column flex-center w-100">
        <div class="flex-column flex-center w-80 error-container">
            <h1 class="flex-row flex-center w-100 heading">Oh no <img height="64" src="/img/svg/alert.svg" alt="!"></h1>
            <span class="error-text" v-if="mainStore.error.message">{{ mainStore.error.message }}</span>
            <span class="error-text" v-else>
                Something went wrong! Please, be sure that You connected to the main network and You have enough funds on your wallet.
            </span>
        </div>
    </div>
</template>

<style scoped>
.heading {
    font-weight: bold;
    font-size: 4rem;
    gap: 0.7rem;
    margin-top: 0.3rem;
}
.error-container {
    margin-top: 10%;
    border: 0.3rem solid var(--color-red);
    border-radius: 3rem;
    padding: 3rem;
    max-width: 60%;
    width: fit-content;
}
.error-text {
    font-family: 'Comfortaa';
    font-size: 2.5rem;
    text-align: center;
}
</style>
