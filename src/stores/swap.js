import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useSwapStore = defineStore("swap", () => {
    const showPopup = ref(false);
    const selectedItem = reactive({});
    const nftToSwap = reactive([]);
    const tokensToSwap = ref(null);

    return {
        showPopup,
        selectedItem,
        nftToSwap,
        tokensToSwap
    };
});
