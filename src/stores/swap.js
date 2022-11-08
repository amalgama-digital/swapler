import { reactive, readonly, ref } from 'vue';
import { defineStore } from 'pinia';

export const useSwapStore = defineStore('swap', () => {
    const contractAddress = readonly('');
    const showPopup = ref(false);
    const selectedItem = reactive({}); // asset selected for swap
    const nftsToSwap = reactive([]);
    const tokensToSwap = ref(null);

    return {
        contractAddress,
        showPopup,
        selectedItem,
        nftsToSwap,
        tokensToSwap,
    };
});
