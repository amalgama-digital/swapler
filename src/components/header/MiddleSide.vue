<script setup></script>

<template>
    <div class="app-header__child">
        <router-link class="router-link" :to="{ name: 'swap' }"
            >Swap</router-link
        >
        <!-- TODO: router link -->
        <a class="router-link" href="#">Borrow</a>
        <a class="router-link" href="#">Raffle</a>
    </div>
</template>

<style scoped>
.app-header__child {
    justify-content: space-evenly;
}
.app-header__child > a:hover {
    color: var(--color-green);
    text-decoration: underline;
}
</style>
