<script setup>
import { onMounted } from 'vue';

import BasicButton from '../../../BasicButton.vue'

const emit = defineEmits(['additem']);
</script>

<template>
    <div class="w-100">
        <span class="user-heading">My tokens:</span>
        <table class="w-80">
            <tr>
                <td>waves</td>
                <td>999</td>
            </tr>
        </table>
    </div>
    <div class="w-80">
        <input class="w-100" type="text" placeholder="Enter the amount">
    </div>
    <button @click="emit('additem', 'main')">Cancel</button>
    <basic-button>Add to offer</basic-button>
</template>

<style scoped>
.user-heading {
    font-size: 18px;
    font-weight: 400;
}
table {
    border-spacing: 0;
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
}
input::placeholder {
    color: var(--color-gray);
}
</style>
