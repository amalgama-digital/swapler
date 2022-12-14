import { reactive, ref } from 'vue';

import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', () => {
    const walletConn = ref(false);
    const walletAddr = ref(undefined);
    const walletPubKey = ref(undefined);

    const error = reactive({
        cause: undefined,
        message: undefined
    });

    return {
        walletConn,
        walletAddr,
        walletPubKey,
        error,
    };
});
