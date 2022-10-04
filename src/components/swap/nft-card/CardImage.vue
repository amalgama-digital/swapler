<script setup>
const props = defineProps(['img', 'collection', 'name']);
</script>

<template>
    <div class="flex-column image-container">
        <img :src="props.img" alt="">
        <div class="flex-row info-container">
            <span class="item-name">{{ props.name }}</span>
            <span class="item-collection">{{ props.collection }}</span>
        </div>
    </div>
</template>

<style scoped>
.image-container {
    max-width: 250px;
    max-height: 250px;
    position: relative;
}
.image-container > img {
    border: 2px solid #FFF;
    border-radius: 14px;

    max-width: 250px;
    max-height: 250px;
    width: auto;
    height: auto;
}
.info-container {
    position: absolute;
    bottom: .7rem;
    left: .7rem;
    align-items: center;
    gap: .6rem;
    backdrop-filter: blur(5px);
    height: 1.5rem;
    width: 60%;
    border-radius: 4px;
}
.item-name {
    font-size: 14px;
}
.item-collection {
    font-size: 10px;
    color: var(--color-gray);
}
</style>
