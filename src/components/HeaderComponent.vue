<script setup>
import LeftSide from './header/LeftSide.vue';
import MiddleSide from './header/MiddleSide.vue';
import RightSide from './header/RightSide.vue';
</script>

<template>
    <header class="flex-row w-80 app-header">
        <LeftSide />
        <MiddleSide />
        <RightSide />
    </header>
</template>

<style scoped>
.app-header {
    position: sticky;
    top: 0;
    z-index: 1;
}
</style>
