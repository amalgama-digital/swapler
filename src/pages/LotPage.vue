<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMainStore } from '../stores/main';

import { getNFTs } from '../helpers/wallet';

import SelectLots from '../components/user/lots/SelectLots.vue';
import AddLot from '../components/user/lots/AddLot.vue';

const components = {
    select: SelectLots,
    add: AddLot,
};

const router = useRouter();
const mainStore = useMainStore();

const userNFTs = reactive([]);

const selectedComponent = ref('select');
const selectedToken = ref(undefined);

onBeforeMount(() => {
    if (mainStore.walletConn !== true) {
        router.push({ name: 'main' });
    }
});

onMounted(async () => {
    const addr = mainStore.walletAddr;
    await getNFTs(addr, userNFTs);
});

function selectToken(nft) {
    selectedToken.value = nft;
    selectedComponent.value = 'add';
}
function unsetToken() {
    selectedToken.value = undefined;
    selectedComponent.value = 'select';
}
</script>

<template>
    <div class="flex-column flex-center w-100 lots-container">
        <component
            :is="components[selectedComponent]"
            :user-nfts="userNFTs"
            :selected-token="selectedToken"
            @proceed="selectToken"
            @cancel="unsetToken"
        ></component>
    </div>
</template>

<style scoped>
.lots-container {
    margin-top: 2rem;
}
</style>
