<script setup>
import { onMounted } from 'vue';

import BasicButton from '../../../BasicButton.vue'

const emit = defineEmits(['additem']);
</script>

<template>
    <div class="flex-column flex-center user-token-container h-100 w-100">
        <div class=" flex-column tokens-container w-80">
            <span class="user-heading">My tokens:</span>
            <table class="w-100">
                <tr>
                    <td>waves</td>
                    <td>999</td>
                </tr>
            </table>
            <div class="flex-row input-container">
                <span>waves</span>
                <span class="divider"></span>
                <input type="text" placeholder="Enter the amount">
            </div>
        </div>
        <div class="flex-row btn-container">
            <button class="cancel-btn" @click="emit('additem', 'main')">Cancel</button>
            <basic-button>Add to offer</basic-button>
        </div>
    </div>
</template>

<style scoped>
.user-heading {
    font-size: 18px;
    font-weight: 400;
}
table {
    border-spacing: 0;
    max-width: 30rem;
}
tr td {
    padding: 5px;
    border: 2px solid var(--color-green);
}
tr td:first-child {
    border-radius: 10px 0 0 10px;
    border-right: none;
}
tr td:last-child {
    border-radius: 0 10px 10px 0;
    border-left: none;
    text-align: end;
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
    gap: .7rem;
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
