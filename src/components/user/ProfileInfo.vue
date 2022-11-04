<script setup>
const props = defineProps(['address']);
</script>

<template>
    <div class="flex-column w-80">
        <span class="text">My profile</span>
        <div class="flex-row">
            <span class="address-text">{{ address }}</span>
        </div>
    </div>
</template>

<style scoped>
.text {
    font-size: 30px;
    font-weight: 400;
}
.address-text {
    font-size: 18px;
    color: #BBFD00;
}
</style>
