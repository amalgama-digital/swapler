<script setup>
import InfoComponent from '../components/main/InfoComponent.vue';
import LinksComponent from '../components/main/LinksComponent.vue';
</script>

<template>
    <div class="flex-column flex-center main-container">
        <!-- info component -->
        <InfoComponent />
        <!-- links -->
        <LinksComponent />
    </div>
</template>

<style scoped>
.main-container {
    justify-content: start;
}
</style>
