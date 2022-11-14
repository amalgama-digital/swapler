<script setup>
const props = defineProps(['cost', 'offers']);
</script>

<template>
    <div class="flex-row footer w-90">
        <div>
            <div class="flex-row flex-center cost-container">
                <span class="cost cost-text">last cost: </span>
                <span class="cost cost-price"
                    >{{ props.cost }} <img src="/img/svg/rectangle.svg" alt=""
                /></span>
            </div>
            <span class="offers-count">{{ props.offers }} offers</span>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>
.footer {
    justify-content: space-between;
}
.cost-container {
    gap: 0.3rem;
    letter-spacing: -0.02rem;
}
.cost-text {
    font-size: 10px;
    color: var(--color-gray);
}
.cost-price {
    font-size: 16px;
    color: var(--color-text);
}
.offers-count {
    font-size: 16px;
    color: var(--color-text);
    font-weight: 300;
}
.offer-btn {
    font-size: 16px;
    color: var(--color-green);
    border: 2px solid var(--color-green);
    border-radius: 14px;
    background-color: inherit;
    min-width: 8rem;
    cursor: pointer;
}
</style>
