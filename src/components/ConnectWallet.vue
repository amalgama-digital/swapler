<template>
    <div class="modal">
        <div>
            <button class="close" @click="close"></button>
            <div class="connect" @click="connectKeeper">
                <p>Waves Keeper</p>
                <p></p>
            </div>
            <div class="connect" @click="connectEmail">
                <p>Waves Exchange Email</p>
                <p></p>
            </div>
            <p class="error" v-if="error">{{ error_text }}</p>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

import { ProviderKeeper } from '@waves/provider-keeper';
    

const error = reactive({
    present: false,
    text: ''
});

onMounted();

async function connectKeeper() {
    error.present = false;
    if (window.signer) {
        const authData = { data: 'https://wavesmarketplace.com/' };

        await window.signer
            .setProvider(new ProviderKeeper(authData))
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
                error.present = true;
                this.text = error;
            });

        await window.signer
            .login()
            .then((res) => {
                console.log(res);

                const data = {};
                data.choice = 'keeper';
                data.address = res.address;
                data.publicKey = res.publicKey;

                window.localStorage.setItem(
                    'loginChoice',
                    JSON.stringify(data)
                );

                close();
                success(data.address);
            })
            .catch((err) => {
                console.error(err);
                error.present = true;
                this.text = error;
            });
    }
}

function success(address) {
    this.$emit('success', address);
}

function close() {
    this.$emit('close', false);
}
</script>

<style scoped>
@import '../assets/styles/button.css';
@import '../assets/styles/modal.css';

.modal > div {
    flex-direction: column;
}

.connect {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    padding: 0px 20px;
    border: 1px solid rgb(241, 242, 254);
    border-radius: 20px;
    cursor: pointer;
}

.modal > div > div.connect:nth-child(2) > p:last-child::before {
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    background-image: url('../assets/images/connect/keeper.png');
    background-size: 40px 40px;
}

.modal > div > div.connect:last-child > p:last-child::before {
    content: '';
    display: inline-block;
    width: 40px;
    height: 40px;
    background-image: url('../assets/images/connect/exchange.svg');
    background-size: 40px 40px;
}

.error {
    position: absolute;
    bottom: 10px;
    font-size: 14px;
    font-weight: 300;
    color: red;
}
</style>
