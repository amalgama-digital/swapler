<script setup>
import { computed, reactive, ref } from 'vue';

import BasicButton from '../../BasicButton.vue';
import PopupComponent from '../../PopupComponent.vue';

const emit = defineEmits(['addlot', 'cancel']);
const props = defineProps(['selectedToken']);

const showPopup = ref(false);
const selectedMetadata = reactive({
    typ: '',
    text: ''
});
const metadata = reactive({
    'desc': undefined,
    'exch': undefined,
    'inst': undefined
});
const description = ref("");
const exchangePrice = ref(undefined);
const instantPrice = ref(undefined);

const addLotDisabled = computed(() => {
    return !(metadata.exch || metadata.inst);
});

function displayPopup(typ) {
    showPopup.value = true;
    selectedMetadata.typ = typ;

    switch (typ) {
        case 'desc':
            selectedMetadata.text = 'Enter the description.';
            break;
        case 'exch':
            selectedMetadata.text = 'Enter the exchange price you want.';
            break;
        case 'inst':
            selectedMetadata.text = 'Enter the instant exchange price you want.';
            break;
        default:
            break;
    }
}
function confirm(typ) {
    switch (typ) {
        case 'desc':
            metadata.desc = description.value;
            break;
        case 'exch':
            metadata.exch = Number(exchangePrice.value);
            break;
        case 'inst':
            metadata.inst = Number(instantPrice.value);
            break;
        default:
            break;
    }
    closePopup();
}
function closePopup() {
    showPopup.value = false;
}
async function addLotTODO() {
    try {

        const resp = await window.signer?.invoke({
            dApp: window.contractAddress,
            fee: 900000,
            payment: [
                {
                    assetId: '', // TODO: asset address
                    amount: 1,
                },
            ],
            call: {
                function: '', // TODO: set function name
                args: [
                    {
                        type: 'string',
                        value: metadata.desc
                    },
                    {
                        type: 'integer',
                        value: metadata.exch * 100000000
                    },
                    {
                        type: 'integer',
                        value: metadata.inst * 100000000
                    }
                ]
            },
        })
        .broadcast();
    } catch(error) {
        console.error(error);
    }
}
</script>

<template>
    <div class="flex-column flex-center w-80 lot-container">
        <!-- image + info -->
        <div class="flex-row flex-space-between w-100">
            <div class="flex-row info-container">
                <div class="image-container">
                    <img :src="props.selectedToken.img" alt="" />
                </div>
                <div class="flex-column item-info">
                    <div class="flex-column item-info__name">
                        <span class="item-name">{{ props.selectedToken.name }}</span>
                        <span class="item-collection">
                            {{ props.selectedToken.collection }}
                        </span>
                    </div>
                    <div class="flex-row cost-container">
                        <span class="cost cost-text">last cost: </span>
                        <span class="flex-row flex-center cost-price">
                            {{ props.selectedToken.cost }}
                            <img src="/img/svg/rectangle.svg" alt="" />
                        </span>
                    </div>
                </div>
            </div>
            <!-- input popup triggers -->
            <div class="flex-column flex-space-between add-info-container w-50">
                <div class="flex-column add-info__type">
                    <span class="text">Description:</span>
                    <basic-button
                        @click="displayPopup('desc')" class="w-fit"
                        v-if="!metadata.desc"
                    >
                        Add description
                    </basic-button>
                    <div v-else>
                        {{ metadata.desc }}
                    </div>
                </div>
                <div class="flex-row flex-space-between">
                    <div class="flex-column add-info__type">
                        <span class="text">Exchange request:</span>
                        <basic-button
                            @click="displayPopup('exch')"
                            v-if="!metadata.exch"
                        >
                            Add exchange price
                        </basic-button>
                        <div v-else>
                            <span>{{ metadata.exch }}</span>
                            <img src="/img/svg/rectangle.svg" alt="" />
                        </div>
                    </div>
                    <div class="flex-column add-info__type">
                        <span class="text">Instant exchange:</span>
                        <basic-button
                            @click="displayPopup('inst')"
                            v-if="!metadata.inst"
                        >
                            Add instant exchange price
                        </basic-button>
                        <div v-else>
                            <span>{{ metadata.inst }}</span>
                            <img src="/img/svg/rectangle.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-row w-100 button-container">
            <span
                class="cancel-btn"
                @click="emit('cancel')"
            >
                Cancel
            </span>
            <basic-button :disabled="addLotDisabled" @click="addLot">Add lot</basic-button>
        </div>
        <!-- Lot metadata inputs -->
        <popup-component :popup-show="showPopup">
            <div class="flex-column flex-center w-100 h-100 popup-content">
                <h2>{{ selectedMetadata.text }}</h2>
                <div>
                    <textarea
                        class="description"
                        v-if="selectedMetadata.typ == 'desc'"
                        v-model="description"
                        cols="30"
                        rows="10">
                    </textarea>
                    <div v-else-if="selectedMetadata.typ == 'exch'">
                        <input class="price" v-model="exchangePrice" placeholder="0" type="text">
                        <img src="/img/svg/rectangle.svg" alt="" />
                    </div>
                    <div v-else-if="selectedMetadata.typ == 'inst'">
                        <input class="price" v-model="instantPrice" placeholder="0" type="text">
                        <img src="/img/svg/rectangle.svg" alt="" />
                    </div>
                    <span v-else>Hmmm.</span>
                </div>
                <div class="flex-row button-container">
                    <button class="cancel-btn" @click="closePopup">Cancel</button>
                    <basic-button @click="confirm(selectedMetadata.typ)">Confirm</basic-button>
                </div>
            </div>
        </popup-component>
    </div>
</template>

<style scoped>
.lot-container {
    gap: 1rem;
}
.info-container {
    gap: 1rem;
}
.item-info {
    gap: 2rem;
}
.item-name {
    font-size: 30px;
}
.item-collection {
    font-size: 18px;
    color: var(--color-gray);
}
.cost-container {
    gap: 0.4rem;
    letter-spacing: -0.02rem;
    align-items: center;
}
.cost-text {
    font-size: 18px;
    color: var(--color-gray);
}
.cost-price {
    font-size: 30px;
    color: var(--color-text);
    gap: 0.4rem;
}
.add-info-container {
    gap: 1.5rem;
}
.add-info__type {
    gap: 0.5rem;
}
.text {
    color: #878787;
    font-size: 18px;

}
.button-container {
    gap: 1rem;
    align-items: center;
}
.cancel-btn {
    background-color: inherit;
    border: none;
    color: var(--color-green);
    cursor: pointer;
}
.w-50 {
    width: 50%;
}
.w-fit {
    width: fit-content;
}
.popup-content {
    position: relative;
    gap: 0.7rem;
}
textarea.description {
    background-color: var(--color-dark-gray);
    color: var(--color-text);
    border: none;
    outline: none;
    max-width: 30rem;
    min-width: 20rem;
    max-height: 20rem;
    min-height: 10rem;
    font-size: 20px;
    border-radius: 0.5rem;
}
input.price {
    background-color: var(--color-dark-gray);
    color: var(--color-text);
    border: none;
    border-radius: 0.5rem;
    max-width: 8rem;
    font-size: 20px;
    line-height: 24px;
    height: 2rem;
    text-align: end;
}
input.price:focus {
    outline: none;
}
</style>