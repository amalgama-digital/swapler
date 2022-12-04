<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['popupShow']);

const popupClasses = {
    show: 'popup-show',
    hide: 'popup-hide',
};
const popupClass = ref('popup-hide');

watch(
    () => props.popupShow,
    () => {
        popupClass.value = props.popupShow
            ? popupClasses.show
            : popupClasses.hide;
    }
);
</script>

<template>
    <Transition name="popup">
        <div v-if="popupShow" class="popup">
            <div class="popup__content">
                <slot></slot>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
@media only screen and (max-width: 810px) {
    .popup__content {
        height: 100vh !important;
        width: 100vw !important;
    }
}
.popup-enter-active,
.popup-leave-active {
    transition: opacity 0.3s ease-in;
}
.popup-enter-from,
.popup-leave-to {
    opacity: 0;
}
.popup {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(250, 250, 250, 0.11);
    backdrop-filter: blur(5px);

    position: fixed;
    width: 100vw;
    height: 100vh;

    z-index: 999;
    top: 0;
}

.popup__content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    height: 90vh;
    width: 90vw;

    background-color: #242424;
    border-radius: 20px;
}
</style>
