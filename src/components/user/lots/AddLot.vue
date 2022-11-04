<script setup>
import BasicButton from '../../BasicButton.vue';

const emit = defineEmits(['addlot', 'cancel']);
const props = defineProps(['selectedToken']);

</script>

<template>
    <div class="flex-column flex-center w-80 lot-container">
        <div class="flex-row flex-space-between w-100">
            <div class="flex-row info-container">
                <div class="image-container">
                    <img :src="props.selectedToken.img" alt="" />
                </div>
                <div class="flex-column item-info">
                    <div class="flex-column item-info__name">
                        <span class="item-name">{{ props.selectedToken.name }}</span>
                        <span class="item-collection">
                            {{ props.selectedToken.collection }}
                        </span>
                    </div>
                    <div class="flex-row cost-container">
                        <span class="cost cost-text">last cost: </span>
                        <span class="flex-row flex-center cost-price">
                            {{ props.selectedToken.cost }}
                            <img src="/img/svg/rectangle.svg" alt="" />
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex-column flex-space-between add-info-container w-50">
                <div class="flex-column add-info__type">
                    <span class="text">Description:</span>
                    <basic-button class="w-fit">Add description</basic-button>
                </div>
                <div class="flex-row flex-space-between">
                    <div class="flex-column add-info__type">
                        <span class="text">Exchange request:</span>
                        <basic-button>Add exchange price</basic-button>
                    </div>
                    <div class="flex-column add-info__type">
                        <span class="text">Instant exchange:</span>
                        <basic-button>Add instant exchange price</basic-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-row w-100 button-container">
            <span
                class="cancel-btn"
                @click="emit('cancel')"
            >
                Cancel
            </span>
            <basic-button @click="addLot">Add lot</basic-button>
        </div>
    </div>
</template>

<style scoped>
.lot-container {
    gap: 1rem;
}
.info-container {
    gap: 1rem;
}
.item-info {
    gap: 2rem;
}
.item-name {
    font-size: 30px;
}
.item-collection {
    font-size: 18px;
    color: var(--color-gray);
}
.cost-container {
    gap: 0.4rem;
    letter-spacing: -0.02rem;
    align-items: center;
}
.cost-text {
    font-size: 18px;
    color: var(--color-gray);
}
.cost-price {
    font-size: 30px;
    color: var(--color-text);
    gap: 0.4rem;
}
.add-info-container {
    gap: 1.5rem;
}
.add-info__type {
    gap: 0.5rem;
}
.text {
    color: #878787;
    font-size: 18px;

}
.button-container {
    gap: 1rem;
    align-items: center;
}
.cancel-btn {
    background-color: inherit;
    border: none;
    color: var(--color-green);
    cursor: pointer;
}
.w-50 {
    width: 50%;
}
.w-fit {
    width: fit-content;
}
</style>
