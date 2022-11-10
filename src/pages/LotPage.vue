<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMainStore } from '../stores/main';

import { getMetadata, urlByIssuer } from '../helpers/metadata';

import SelectLots from '../components/user/lots/SelectLots.vue';
import AddLot from '../components/user/lots/AddLot.vue';

const components = {
    'select': SelectLots,
    'add': AddLot
};

const router = useRouter();
const mainStore = useMainStore();

const userNFTs = reactive([]);

const selectedComponent = ref('select');
const selectedToken = ref(undefined);

onBeforeMount(() => {
    if(mainStore.walletConn !== true) {
        router.push({ name: 'main' })
    }
});

onMounted(async () => {
    const addr = mainStore.walletAddr;
    await getNFTs(addr);
});

function selectToken(nft) {
    selectedToken.value = nft;
    selectedComponent.value = 'add';
}
function unsetToken() {
    selectedToken.value = undefined;
    selectedComponent.value = 'select';
}
function mockAddLot(lot) {
    console.debug({lot});
}
async function getNFTs(address) {
    const url = `${window.nodeURL}/assets/nft/${address}/limit/1000`;
    try {
        const resp = await fetch(url);
        const respData = await resp.json();
        for (const elem of respData) {
            const data = {};
            data.name = elem.name;
            data.assetId = elem.assetId;
            data.issuer = elem.issuer;

            const metadata = await getMetadata(elem.description);
            data.metadata = metadata;

            data.metadata.url = data.metadata.url
                                ?? await urlByIssuer(
                                    data.issuer,
                                    data.assetId
                                );
            data.metadata.id = Number(data.name
                .replace('#', '')
                .split(' ')[1]);

            data.price = 0;

            userNFTs.push(data);
        }
    } catch(error) {
        console.error(error);
    }
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
            @addlot="mockAddLot"
        ></component>
    </div>
</template>

<style scoped>
.lots-container {
    margin-top: 2rem;
}
</style>
