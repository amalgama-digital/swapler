<script setup>
import { onMounted, ref } from 'vue';
import { useSwapStore } from '../../../../stores/swap';
import BasicButton from '../../../BasicButton.vue';

const emit = defineEmits(['setComponent']);
const swapStore = useSwapStore();
const balance = ref(0);
const swapAmount = ref(null);
const insufficientFunds = ref(false);

function goToOffer() {
    swapStore.tokensToSwap = swapAmount.value;
    emit('setComponent', 'offer');
}

onMounted(async () => {
    const balanceResponse = await window.signer?.getBalance();
    const bal =
        balanceResponse[0]?.amount / Math.pow(10, balanceResponse[0]?.decimals);
    balance.value = bal;
    // TODO: don't hardcode commission
    if (bal < 0.5) {
        insufficientFunds.value = true;
    }
});
</script>

<template>
    <div class="flex-column flex-center user-token-container h-100 w-100">
        <div class="flex-column tokens-container w-80">
            <span class="user-heading">My tokens:</span>
            <div class="flex-row flex-space-between balance">
                <span>waves</span>
                <span>{{ balance }}</span>
            </div>
            <div class="flex-row input-container">
                <span>waves</span>
                <span class="divider"></span>
                <input
                    v-model="swapAmount"
                    :disabled="insufficientFunds"
                    type="text"
                    placeholder="Enter the amount"
                />
            </div>
            <div
                v-if="insufficientFunds"
                class="error-container"
            >
                <div 
                    class="animate__animated animate__slideInRight flex-row flex-start flex-center gap-05"
                >
                    <img src="/img/svg/alert.svg" width="30" alt="">
                    <span class="error">
                        Insufficient funds
                    </span>
                </div>
            </div>
        </div>
        <div class="flex-row btn-container">
            <button
                class="cancel-btn"
                @click="emit('setComponent', 'main')"
            >
                Cancel
            </button>
            <basic-button
                :disabled="(swapAmount <= 0 || insufficientFunds)"
                @click="goToOffer"
            >
                Add to offer
            </basic-button>
        </div>
    </div>
</template>

<style scoped>
.animate__slideInRight {
    --animate-duration: 0.3s;
}
.user-heading {
    font-size: 18px;
    font-weight: 400;
}
.balance {
    border: 2px solid var(--color-green);
    border-radius: 10px;
    padding: 5px;
    max-width: 30rem;

}
input {
    background: none;
    outline: none;
    border: none;
    color: var(--color-text);
    width: 80%;
}
input::placeholder {
    color: var(--color-gray);
}
.user-token-container {
    justify-content: space-between;
}
.tokens-container {
    gap: 1rem;
}
.input-container {
    border: 1px solid var(--color-text);
    border-radius: 10px;
    padding: 5px;
    max-width: 30rem;
    gap: 0.7rem;
}
.btn-container {
    width: 95%;
    justify-content: end;
    gap: 1rem;
}
.cancel-btn {
    background-color: inherit;
    border: none;
    color: var(--color-green);
}
.divider {
    display: inline-block;
    width: 1px;
    height: 1.2rem;
    background-color: var(--color-text);
}
</style>
