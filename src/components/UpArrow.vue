<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';


const offset = ref(0);

onMounted(() => window.addEventListener('scroll', setOffset));

onUnmounted(() => window.removeEventListener('scroll', setOffset));

const show = computed(() => {
    return Number(offset.value) >= Number(document.body.clientHeight / 2.5);
});

function setOffset() {
    offset.value = window.pageYOffset;
}

function scrollUp() {
    window.scrollTo({top: 0, behavior: 'smooth'})
}
</script>

<template>
    <Transition name="fade">
        <div v-if="show" class="up">
            <img @click="scrollUp" src="/img/svg/up_arrow.svg" alt="">
        </div>
    </Transition>
</template>

<style scoped>
.up {
    display: block;
    position: fixed;
    bottom: 3%;
    right: 10%;
    z-index: 999;
}

.up img {
    max-width: 60px;
    max-height: 60px;
    width: 100%;
    height: auto;
    cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>
