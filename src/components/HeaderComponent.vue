<script setup>
import LeftSide from './header/LeftSide.vue';
import MiddleSide from './header/MiddleSide.vue';
import RightSide from './header/RightSide.vue';
</script>

<template>
    <div class="flex-column flex-center header-container">
        <div class="flex-row w-80 app-header">
            <LeftSide />
            <MiddleSide />
            <RightSide />
        </div>
    </div>
</template>

<style scoped>
.header-container {
    background-color: #242424;
}
.app-header {
    position: sticky;
    top: 0;
    z-index: 1;
}
</style>
