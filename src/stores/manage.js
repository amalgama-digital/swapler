import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useManageStore = defineStore('manage', () => {
    const manageItem = ref(undefined);

    return {
        manageItem
    }
});
