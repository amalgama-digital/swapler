<script setup>
import CardFooter from './nft-card/CardFooter.vue';
import CardImage from './nft-card/CardImage.vue';

const props = defineProps(['item']);

</script>

<template>
    <div class="flex-column nft-card">
        <card-image
            :img="item.img"
            :name="item.name"
            :collection="item.collection"
        ></card-image>
        <card-footer
            :cost="props.item.cost"
            :offers="props.item.offers"
            @show-popup="showPopupWithItem(item)"
        >
            <slot></slot>
        </card-footer>
    </div>
</template>

<style scoped>
.nft-card {
    background-color: var(--color-dark-gray);
    min-width: 260px;
    min-height: 300px;
    justify-content: space-around;
    align-items: center;
    border-radius: 20px;
}
</style>
