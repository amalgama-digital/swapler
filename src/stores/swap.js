import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useSwapStore = defineStore("swap", () => {
    const showPopup = ref(false);
    const selectedItem = reactive({});

    return {
        showPopup,
        selectedItem
    };
});
