<script setup>
const props = defineProps(['img', 'collection', 'name']);
</script>

<template>
    <div class="flex-column image-container">
        <img :src="props.img" alt="" />
        <div class="flex-row info-container">
            <span class="item-name">{{ props.name }}</span>
            <span class="item-collection">{{ props.collection }}</span>
        </div>
    </div>
</template>

<style scoped>
.info-container {
    position: absolute;
    bottom: 0.7rem;
    left: 0.7rem;
    align-items: center;
    gap: 0.6rem;
    background-color: rgba(30, 30, 30, 0.5);
    padding: 0.2rem;
    height: 1.5rem;
    width: fit-content;
    max-width: 80%;
    border-radius: 4px;
}
</style>
